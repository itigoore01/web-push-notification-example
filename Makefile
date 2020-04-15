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
	@make setup-backend
	@make setup-frontend
setup-backend:
	cd docker && \
		docker-compose exec workspace composer install && \
		docker-compose exec workspace cp .env.example .env && \
		docker-compose exec workspace php artisan key:generate --ansi && \
		docker-compose exec workspace php artisan webpush:vapid
	@make fresh

setup-frontend:
	cd frontend && \
		npm ci
	@make ng-build

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
serve:
	cd frontend && \
		npm run start
ng-build:
	cd frontend && \
		npm run build -- --prod
