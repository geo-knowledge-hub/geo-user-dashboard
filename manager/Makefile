#
# This file is part of User Dashboard.
#
# Copyright (C) 2023 GEO Secretariat.
#
# User Dashboard is free software; you can redistribute it and/or modify it
# under the terms of the MIT License; see LICENSE file for more details.
#

.PHONY: build* compose*

#
# Compose
#
compose-start: ## Start compose stack
	docker-compose up --build -d

compose-stop: ## Stop compose stack
	docker-compose stop

compose-down:  ## Destroy compose stack
	docker-compose down

compose-logs:  ## Compose stack logs
	docker-compose logs -f --tail 20

#
# Development services
#
services-start:  ## Start development services
	docker-compose -f docker-compose.services.yml up -d

services-down:  ## Destroy development services
	docker-compose -f docker-compose.services.yml down

#
# Build
#
build:  ## Build Manager
	docker build -t "geo-manager:$(version)" .


build-prod:  ## Build production version of the Manager
	docker build -t "geo-manager:$(version)" -f Dockerfile.prod --build-arg PUBLIC_URL=$(url) .

#
# Documentation function (thanks for https://marmelab.com/blog/2016/02/29/auto-documented-makefile.html)
#
help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
