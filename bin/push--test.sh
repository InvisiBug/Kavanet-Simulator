#!/bin/sh

# REGISTRY_IP=192.168.1.61:5000
# Now using docker hub istead of private registry
REGISTRY_IP=invisibug
APP_NAME=kavanest-simulator:test

yarn install && \
yarn build && \
docker build -f ./Dockerfile.kube -t $APP_NAME . && \
docker tag $APP_NAME $REGISTRY_IP/$APP_NAME && \
docker push $REGISTRY_IP/$APP_NAME && \
rm -r dist
