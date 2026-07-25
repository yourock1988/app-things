prod:
	docker compose -p app-things -f docker-compose.prod.yml up --build --detach 

dev:
	docker compose -p app-things up --build --watch

test: 
	docker exec -it app-things-dev-1 npm test

chk-outdated:
	docker exec -it app-things-dev-1 npm outdated --all

upd-deps-soft:
	docker run -v $(CURDIR):/app app-things-dev npm update

upd-deps-hard:
	docker run -v $(CURDIR):/app app-things-dev npx npm-check-updates -u

install:
	docker run -v $(CURDIR):/app app-things-dev npm install $(name)

install-dev:
	docker run -v $(CURDIR):/app app-things-dev npm install -D $(name)

install-fe:
	docker run -v $(CURDIR):/app -w /app/apps/frontend app-things-dev npm install $(name)
	
install-fe-dev:
	docker run -v $(CURDIR):/app -w /app/apps/frontend app-things-dev npm install -D $(name)
	
install-be:
	docker run -v $(CURDIR):/app -w /app/apps/backend app-things-dev npm install $(name)

install-be-dev:
	docker run -v $(CURDIR):/app -w /app/apps/backend app-things-dev npm install -D $(name)
