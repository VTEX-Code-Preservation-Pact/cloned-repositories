#!/usr/bin/env bash
docker build -t api .
docker run -p 3010:3010 -it api
