prod:
	docker compose -p app-things -f docker-compose.prod.yml up --build --detach 

dev:
	docker compose -p app-things up --build --watch

test: 
	docker exec -it app-things-dev-1 npm test

upd-deps:
	docker run -v $(pwd):/app app-things:dev npx npm-check-updates -u

upd-lock:
	docker run -v $(pwd):/app app-things:dev npm install
