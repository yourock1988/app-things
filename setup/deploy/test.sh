if [ "$EUID" -ne 0 ]; then
  echo "Пожалуйста, запустите этот скрипт с правами суперпользователя (sudo)." >&2
  exit 1
fi


set -e


USER=webmaster
GROUP=developers
APP=app-things

systemctl disable $APP.service
systemctl stop $APP.service
systemctl daemon-reload

chgrp -R $GROUP /srv/$APP

source ./setup/database/migrate.sh

sudo -iu $USER npm --prefix /srv/$APP run deploy:test

echo "Развертывание завершено."
echo "Запускаю сервис..."
systemctl start $APP.service
systemctl enable $APP.service
echo "Приложение $APP запущено!"
