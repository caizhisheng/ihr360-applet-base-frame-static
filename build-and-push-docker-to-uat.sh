#!/bin/bash
#cd web


declare version=$(cat package.json | grep version  | head -1  | awk -F: '{ print $2 }'  | sed 's/[",]//g'  | tr -d '[[:space:]]')
#PACKAGE_VERSION=$(cat package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[\",]//g' | tr -d '[[:space:]]') && git tag $PACKAGE_VERSION && git push --tags
echo version

docker build -t docker.irenshi.cn/ihr360-payroll-h5-static:$version .
docker push docker.irenshi.cn/ihr360-payroll-h5-static:$version
