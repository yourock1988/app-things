if [ "$EUID" -ne 0 ]; then
  echo "Пожалуйста, запустите этот скрипт с правами суперпользователя (sudo)." >&2
  exit 1
fi


set -euo pipefail


GROUP=developers
USER=webmaster
APP=app-things
DOMAIN=$APP.web-app.click
DOMAIN_IO=wss.$DOMAIN
DOMAIN_API=api.$DOMAIN
PORT=8804
PORT_IO=7704

echo "Настройка папки..."
find /srv/$APP -type d -exec chmod 775 {} \;
find /srv/$APP -type f -exec chmod 664 {} \;
chmod +x /srv/$APP/git-hooks/pre-commit
chgrp -R $GROUP /srv/$APP
chown -R $USER /srv/$APP

echo "Настройка nginx..."
cat << EOF > /etc/nginx/sites-available/$DOMAIN
server {
    listen 80;
    server_name $DOMAIN;
    location /assets/ {
        alias /srv/$APP/dist/client/assets/;
        add_header Cache-Control "public, max-age=31536000";
        try_files \$uri \$uri/ =404;
    }
    location /static/ {
        alias /srv/$APP/dist/server/static/;
        add_header Cache-Control "public, max-age=31536000";
        try_files \$uri \$uri/ =404;
    }
    location / {
        proxy_pass http://127.0.0.1:$PORT;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host \$host;
    }
}
server {
    listen 2080;
    server_name $DOMAIN_IO;
    location / {
        proxy_pass http://127.0.0.1:$PORT_IO;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host \$host;
    }
}
EOF
ln -s -f /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-enabled/$DOMAIN
nginx -s reload
echo "Nginx успешно настроен."


echo "Настройка certbot..."
certbot --nginx -d $DOMAIN --non-interactive --redirect --agree-tos --email admin@$DOMAIN
certbot --nginx -d $DOMAIN_IO --non-interactive --redirect --agree-tos --email admin@$DOMAIN_IO
certbot --nginx -d $DOMAIN_API --non-interactive --redirect --agree-tos --email admin@$DOMAIN_IO
nginx -s reload
echo "Certbot успешно настроен."


echo "Настройка сервиса..."
systemctl disable $APP.service || true
systemctl stop $APP.service || true
cat << EOF > /etc/systemd/system/$APP.service 
[Unit]
After=network-online.target
###
Description=app $APP for domain $DOMAIN
[Service]
WorkingDirectory=/srv/$APP
Environment=PATH=/usr/local/bin:/usr/bin:/bin
Group=$USER
User=$USER
###
Restart=always
ExecStart=bash -c '. ~/.nvm/nvm.sh; npm start'
Environment=NODE_ENV=production
[Install]
WantedBy=multi-user.target
EOF
systemctl daemon-reload
echo "Сервис успешно настроен."


source ./setup/deploy/prod.sh
