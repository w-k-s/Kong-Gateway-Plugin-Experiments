build:
	docker compose build --no-cache
start:
	docker compose up -d
stop:
	docker compose down
logs:
	docker logs -f kong-gateway