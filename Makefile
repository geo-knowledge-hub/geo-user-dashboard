#
# This file is part of User Dashboard.
#
# Copyright (C) 2023 GEO Secretariat.
#
# User Dashboard is free software; you can redistribute it and/or modify it
# under the terms of the MIT License; see LICENSE file for more details.
#

.PHONY: dashboard* services* configure*

#
# Configurations
#
configure-files:  ## Configuration: Configure services
	cp dashboard/example.env dashboard/.env
	cp manager/example.env manager/.env

#
# Services
#
services-start: configure-files  ## Services: Start required services to run the User Dashboard
	cd manager && docker-compose -f docker-compose.services.yml up -d

services-stop:  ## Services: Stop services used to run the User Dashboard
	cd manager && docker-compose -f docker-compose.services.yml stop

services-down:  ## Services: Remove services used to run the User Dashboard
	cd manager && docker-compose -f docker-compose.services.yml stop

#
# Dashboard
#
dashboard: services-start  ## Dashboard: Start the User Dashboard
	yarn && yarn develop


#
# Documentation function (thanks for https://marmelab.com/blog/2016/02/29/auto-documented-makefile.html)
#
help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
