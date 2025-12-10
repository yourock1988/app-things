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
DB_SRC=/srv/$APP/database.sql
DB_DESTINATION=/var/lib/postgresql/database.sql

sudo -iu postgres mkdir -p $PATH_BACKUP
sudo -iu postgres cp $DB_SRC $DB_DESTINATION

echo "Начинаю миграцию базы данных..."

sudo -iu postgres pg_dump $DB --clean --if-exists -f $PATH_BACKUP/$BACKUP || true
echo "backup $DB-$(date +%Y-%m-%d) dumped"

sudo -iu $DB_USER dropdb $DB --if-exists
echo "database $DB dropped"

sudo -iu $DB_USER createdb $DB
echo "database $DB created"

sudo -iu $DB_USER psql -d $DB -f $DB_DESTINATION > /dev/null
echo "database $DB deploy"
