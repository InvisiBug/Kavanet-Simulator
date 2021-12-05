#!/bin/sh

yarn build && docker compose up -d --build && rm -r dist
