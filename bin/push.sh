#!/bin/sh
 
# yarn install && \
# yarn build && \
# docker build -f ./Dockerfile.kube -t grafana-interconnector . && \
# docker tag grafana-interconnector 192.168.1.42:5000/grafana-interconnector && \
# docker push 192.168.1.42:5000/grafana-interconnector

REGISTRY_IP=192.168.1.61:5000
yarn install && yarn build && docker build -f ./Dockerfile.kube -t kavanest-simulator . && docker tag kavanest-simulator $REGISTRY_IP/kavanest-simulator && docker push $REGISTRY_IP/kavanest-simulator && rm -r dist
