#!/bin/sh

clear && cd helm && \
helm upgrade kavanest-simulator . \
--install \
--namespace kavanest \
-f values/live.yaml
# --create-namespace
