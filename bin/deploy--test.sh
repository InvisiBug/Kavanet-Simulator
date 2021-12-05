#!/bin/sh

clear && cd helm && \
helm upgrade kavanest-simulator . \
--install \
--namespace kavanest-test \
-f values/test.yaml
# --create-namespace
