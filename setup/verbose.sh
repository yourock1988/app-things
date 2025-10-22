if [ "$EUID" -ne 0 ]; then
  echo "Пожалуйста, запустите этот скрипт с правами суперпользователя (sudo)." >&2
  exit 1
fi


set -e


nginx -t

certbot --version
certbot renew --dry-run

systemctl is-active postgresql
systemctl is-enabled postgresql
systemctl status postgresql
pg_isready

sudo -iu webmaster nvm ls
sudo -iu webmaster npm config list -g
sudo -iu webmaster npm config get prefix
sudo -iu webmaster node -v
sudo -iu webmaster npm -v
