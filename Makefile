up:
	cd docker && \
		docker-compose up -d
build:
	cd docker && \
		docker-compose build
setup:
	cd docker && \
		cp env-example .env
	@make up
stop:
	cd docker && \
		docker-compose stop
restart:
	cd docker && \
		docker-compose restart
down:
	cd docker && \
		docker-compose down
destroy:
	cd docker && \
		docker-compose down --rmi all --volumes
workspace:
	cd docker && \
		docker-compose exec workspace bash
fresh:
	cd docker && \
		docker-compose exec workspace php artisan migrate:fresh
