# Docker config
DOCKER_REGISTRY       	= registryName
DOCKER_REPO           	= global-testing
DOCKER_IMAGE			= ui

DOCKER_IMAGE_URL    = $(DOCKER_REGISTRY)/$(DOCKER_REPO)
IMAGE_URL			= $(DOCKER_IMAGE_URL)/$(DOCKER_IMAGE)

all: help
.PHONY: all

################
# BASE section #
################

DOCKER_LINTER = hadolint/hadolint:latest
lint-dockerfile: ## Lint Dockerfile (used by CI)
	docker run --pull always --rm -v "${PWD}:/app" $(DOCKER_LINTER) hadolint /app/Dockerfile && echo "Dockerfile is OK!"
	docker run --pull always --rm -v "${PWD}:/app" $(DOCKER_LINTER) hadolint /app/Dockerfile.dev && echo "Dockerfile.dev is OK!"
.PHONY: lint-dockerfile

CODE_LINTER = node:20-alpine
lint-code:
	docker run --pull always --rm -v "${PWD}:/app" -w /app ${CODE_LINTER} sh -c "npm ci && npm run lint"
.PHONY: lint-code

################
# OPENAPI section #
################
generate_openapi:
	sudo openapi-generator-cli generate -i ./swagger_docs.json -o services -g typescript-fetch --skip-validate-spec
.PHONY: generate_openapi

#################
# BUILD section #
#################

build: build-check-env
	docker buildx create --use
	docker buildx build \
	--platform linux/amd64 \
    --build-arg NEXT_PUBLIC_APP_VERSION=$(RELEASE_VERSION) \
    --build-arg NEXT_PUBLIC_APP_ENV=$(RELEASE_ENV) \
	--build-arg NEXT_PUBLIC_API_PUBLIC_URL=$(API_PUBLIC_URL) \
	--target runner \
    --tag $(IMAGE_URL):${RELEASE_ENV}_$(RELEASE_VERSION) \
    --push .

build-check-env:
ifndef RELEASE_VERSION
	$(error parameter RELEASE_VERSION is undefined, add RELEASE_VERSION=xxx)
endif
ifndef API_PUBLIC_URL
	$(error parameter API_PUBLIC_URL is undefined, add API_PUBLIC_URL=xxx)
endif
ifndef RELEASE_ENV
	$(error parameter RELEASE_ENV is undefined, add RELEASE_ENV=xxx)
endif


#################
# Help Section  #
#################

SHELL := /usr/bin/env bash

help: ## List available commands
	@grep -E '^[0-9a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.DEFAULT_GOAL := help
.PHONY: help
