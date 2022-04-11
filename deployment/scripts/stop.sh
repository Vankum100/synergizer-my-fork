#!/usr/bin/env bash
set -e

if [ ! -z `docker ps -a -q -n 1` ]; then
    docker stop `docker ps -a -q`
fi
