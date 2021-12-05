#!/bin/sh
 
REGISTRY_IP=192.168.1.61:5000

yarn install && \
yarn build && \
docker build -f ./Dockerfile.kube -t kavanest-simulator . && \
docker tag kavanest-simulator $REGISTRY_IP/kavanest-simulator && \
docker push $REGISTRY_IP/kavanest-simulator && \
rm -r dist
