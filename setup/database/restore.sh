if [ "$EUID" -ne 0 ]; then
  echo "Пожалуйста, запустите этот скрипт с правами суперпользователя (sudo)." >&2
  exit 1
fi


set -e


DB=pc_shop_v0
DB_USER=postgres
APP=app-things
PATH_BACKUP=/var/lib/postgresql/backup
BACKUP=$DB-$(date +%Y-%m-%d).sql

systemctl stop $APP.service
echo "service $APP stopped"

sudo -iu $DB_USER dropdb $DB
echo "database $DB dropped"

sudo -iu $DB_USER createdb $DB
echo "database $DB created"

sudo -iu $DB_USER psql -d $DB -f $PATH_BACKUP/$BACKUP > /dev/null
echo "database $DB restored"

systemctl start $APP.service
echo "service $APP started"
