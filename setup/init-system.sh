if [ "$EUID" -ne 0 ]; then
  echo "Пожалуйста, запустите этот скрипт с правами суперпользователя (sudo)." >&2
  exit 1
fi


set -e


USER=webmaster
GROUP=developers


echo "SHELL=/bin/bash" >> /etc/default/useradd
useradd -m -s /bin/bash $USER

echo -e '\nexport NVM_DIR="$HOME/.nvm"\n[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"' >> /home/$USER/.profile
echo "SystemMaxUse=50M" >> /etc/systemd/journald.conf
systemctl restart systemd-journald


groupadd $GROUP
usermod -aG $GROUP $USER
chown -R $USER /srv
chgrp -R $GROUP /srv
chmod -R 775 /srv 


apt update
apt upgrade
systemctl daemon-reload
apt install -y git
apt install -y nginx
apt install -y postgresql
apt install -y snapd
apt install -y curl
snap install --classic certbot

sudo -iu $USER bash -c 'curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.2/install.sh | bash'
bash /home/$USER/.nvm/nvm.sh
sudo -iu $USER nvm install 22.14.0
sudo -iu $USER nvm alias default 22.14.0

ln -s -f /snap/bin/certbot /usr/bin/certbot
sudo -iu postgres psql -c "ALTER USER postgres WITH PASSWORD 'postgres1';"

# cd /srv

# git clone https://github.com/yourock1988/app-things.git



# cd /srv/app-things

# bash deploy-app.sh
