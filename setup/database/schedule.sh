if [ "$EUID" -ne 0 ]; then
  echo "Пожалуйста, запустите этот скрипт с правами суперпользователя (sudo)." >&2
  exit 1
fi


set -euo pipefail


# создать бекап базы данных раз в сутки
DB=app_things_v0
DB_USER=postgres
PATH_BACKUP=/var/lib/postgresql/backup
BACKUP=$DB-$(date +%Y-%m-%d).sql

sudo -iu $DB_USER pg_dump $DB > $PATH_BACKUP/$BACKUP
