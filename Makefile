prod:
	docker compose down -v --remove-orphans
	docker compose -p app-things -f docker-compose.prod.yml up --build --detach

tech:
	docker compose down -v --remove-orphans
	docker compose -p app-things -f docker-compose.tech.yml up --build

dev:
	docker compose down -v --remove-orphans
	docker compose -p app-things up --build

test:
	docker exec -it app-things-dev-1 npm test

chk-outdated:
	echo "тупорылый скрипт. проверяет версии транзитивных зависимостей. удалить"
	docker exec app-things-dev-1 npm outdated --all

upd-browserlist:
	docker exec app-things-dev-1 npx update-browserslist-db@latest

chk-deps-hard:
	docker exec app-things-dev-1 npx npm-check-updates -w --cooldown 7 -x zod

upd-deps-soft:
	docker exec app-things-tech-1 npm update

upd-deps-hard:
	docker exec app-things-dev-1 npx npm-check-updates -w -u --cooldown 7 -x zod

install:
	docker exec app-things-tech-1 npm i $(name)

install-fe:
	docker exec -w /app/apps/frontend app-things-tech-1 npm i $(name)

install-be:
	docker exec -w /app/apps/backend app-things-tech-1 npm i $(name)

install-pack:
	docker exec -w /app/packages/webpack-config app-things-tech-1 npm i $(name)

rm-vscode-devcontainer:
	docker exec -it app-things-dev-1 pkill -f vscode-server
	docker exec -it app-things-dev-1 rm -rf /home/node/.vscode-server
