all: help

.PHONY: all

################
# BASE section #
################

SCAN_SECRETS = infisical/infisical:latest
scan-secrets: ## Scan secrets (Token, Password, ...) (used by CI)
	docker run --pull always --rm -v "${PWD}:/app" ${SCAN_SECRETS} infisical scan --verbose --no-git || exit 1
.PHONY: scan-secrets

##################
# Database tasks #
##################
LOCAL_DOCKER_NAME = global-testing-api-1
LOCAL_API_PHP = docker exec -it $(LOCAL_DOCKER_NAME)
LOCAL_SYMFONY_CONSOLE = $(LOCAL_API_PHP) bin/console

database@hard_reset: ## 🔄 recreate database and migrate
	$(LOCAL_SYMFONY_CONSOLE) doctrine:database:drop --force --if-exists
	$(LOCAL_SYMFONY_CONSOLE) doctrine:database:create
	$(LOCAL_SYMFONY_CONSOLE) doctrine:migrations:migrate -n --allow-no-migration -vv

database@hard_reset_fixtures: database@hard_reset ## 🔄 recreate database, migrate and load fixtures
	$(LOCAL_SYMFONY_CONSOLE) hautelook:fixtures:load -vvv

project@setup: database@reset ## ⚙ setup dev env

database@test_setup: ## ⚙ setup test env
	$(LOCAL_SYMFONY_CONSOLE) doctrine:database:drop --force --if-exists --env=test
	$(LOCAL_SYMFONY_CONSOLE) doctrine:database:create --env=test
	$(LOCAL_SYMFONY_CONSOLE) doctrine:migrations:migrate -n --allow-no-migration --env=test -vv
	$(LOCAL_SYMFONY_CONSOLE) doctrine:schema:update -f --complete --env=test

#################
# Help Section  #
#################

SHELL := /usr/bin/env bash

help: ## List available commands
	@grep -E '^[0-9a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.DEFAULT_GOAL := help
.PHONY: help
