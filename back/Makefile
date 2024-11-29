# Docker config
DOCKER_REGISTRY       	= registryName
DOCKER_REPO           	= global-testing
DOCKER_IMAGE_PHP        = api

DOCKER_IMAGE_URL    = $(DOCKER_REGISTRY)/$(DOCKER_REPO)
IMAGE_PHP_URL       = $(DOCKER_IMAGE_URL)/$(DOCKER_IMAGE_PHP)

all: help
.PHONY: all


###############
# DEV section #
###############

messenger_consume: ## Consume the messages locally
	clear && php bin/console messenger:consume async -vv
.PHONY: messenger_consume

messenger_add_message: ## Add a message to the queue 
	php bin/console message:scenario
.PHONY: messenger_add_message

scheduler_consume: ## Consume Scheduler locally
	php bin/console messenger:consume scheduler_crons -vv
.PHONY: scheduler_consume

scheduler_add_message: ## Add a CronsSchedule message to the queue 
	php bin/console message:cron
.PHONY: scheduler_add_message

#################
# Check section #
#################

DOCKER_LINTER = hadolint/hadolint:latest
lint-dockerfile: ## Lint Dockerfile (used by CI)
	docker run --pull always --rm -v "${PWD}:/app" $(DOCKER_LINTER) hadolint /app/Dockerfile && echo "Dockerfile is OK!"
.PHONY: lint-dockerfile

#################
# Lint section #
#################

PHP_BASE = composer:latest

check-init: ## Check code init (used by CI)
	docker run --pull always --rm -v "${PWD}:/app" $(PHP_BASE) composer install --prefer-dist --no-progress --no-interaction --no-scripts --ignore-platform-req=ext-amqp

check-php-cs-fixer: ## Check code with php-cs-fixer (used by CI)
	docker run --rm --volume ${PWD}:/app --env PHP_CS_FIXER_IGNORE_ENV=1 ${PHP_BASE} vendor/bin/php-cs-fixer fix --dry-run --diff --show-progress=bar && echo "${@} is OK!"

check-phpstan: ## Check code with phpstan (used by CI)
	docker run --rm --volume ${PWD}:/app ${PHP_BASE} vendor/bin/phpstan analyse && echo "${@} is OK!"

check-rector: ## Check code with rector (used by CI)
	docker run --rm --volume ${PWD}:/app ${PHP_BASE} vendor/bin/rector process --dry-run && echo "${@} is OK!"

check-all: check-php-cs-fixer check-phpstan check-rector


.PHONY: check-init check-php-cs-fixer check-phpstan check-rector check-all

###############
# Fix section #
###############

LOCAL_DOCKER_NAME = global-testing-api-1
LOCAL_API_PHP = docker exec -it $(LOCAL_DOCKER_NAME)
LOCAL_SYMFONY_CONSOLE = $(LOCAL_API_PHP) bin/console

fix-php-cs-fixer: ## Fix php-cs-fixer
	${LOCAL_API_PHP} vendor/bin/php-cs-fixer fix --show-progress=bar

fix-phpstan: ## Fix phpstan
	${LOCAL_API_PHP} vendor/bin/phpstan

fix-rector: ## Fix rector
	${LOCAL_API_PHP} vendor/bin/rector process

fix-all: fix-php-cs-fixer fix-phpstan fix-rector

.PHONY: fix-php-cs-fixer fix-phpstan fix-rector fix-all

#################
# TEST section #
#################

test: ## ✅ Launch tests (only for local dev)
	$(LOCAL_SYMFONY_CONSOLE) doctrine:database:drop --force --if-exists --env=test
	$(LOCAL_SYMFONY_CONSOLE) doctrine:database:create --env=test
	$(LOCAL_SYMFONY_CONSOLE) doctrine:migrations:migrate --env=test -n --allow-no-migration
	$(LOCAL_API_PHP) vendor/bin/simple-phpunit

test_stop_on_failure: ## ✅ Launch tests (only for local dev)
	$(LOCAL_SYMFONY_CONSOLE) doctrine:database:drop --force --if-exists --env=test
	$(LOCAL_SYMFONY_CONSOLE) doctrine:database:create --env=test
	$(LOCAL_SYMFONY_CONSOLE) doctrine:migrations:migrate --env=test -n --allow-no-migration
	$(LOCAL_API_PHP) vendor/bin/simple-phpunit --stop-on-failure

.PHONY: test test_stop_on_failure


#################
# Build section #
#################

build: build-php ## Launch all builds (used by CI)

build-php: build-check-env
	docker build --build-arg RELEASE_VERSION=$(RELEASE_VERSION) --target frankenphp_prod --tag $(IMAGE_PHP_URL):$(RELEASE_VERSION) .
	docker push $(IMAGE_PHP_URL):$(RELEASE_VERSION)

build-check-env:
ifndef RELEASE_VERSION
	$(error parameter RELEASE_VERSION is undefined, add RELEASE_VERSION=xxx)
endif

.PHONY: build build-php build-check-env


#################
# Help Section  #
#################

generate_openapi: ## generate openapi swagger docs json
	${LOCAL_SYMFONY_CONSOLE} api:openapi:export --output swagger_docs.json
.PHONY: generate_openapi

SHELL := /usr/bin/env bash

help: ## List available commands
	@grep -E '^[0-9a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.DEFAULT_GOAL := help
.PHONY: help
