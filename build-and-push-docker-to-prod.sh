#!/bin/bash
#cd web


declare version=$(cat package.json | grep version  | head -1  | awk -F: '{ print $2 }'  | sed 's/[",]//g'  | tr -d '[[:space:]]')
#PACKAGE_VERSION=$(cat package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[\",]//g' | tr -d '[[:space:]]') && git tag $PACKAGE_VERSION && git push --tags
echo version

docker build -t docker.irenshi.cn/ihr360-payroll-h5-static .
docker tag docker.irenshi.cn/ihr360-payroll-h5-static docker.ihr360.com/ihr360-payroll-h5-static:$version
docker push docker.ihr360.com/ihr360-payroll-h5-static:$version

declare shortRev=$(git rev-parse --short HEAD)
declare timestamp=$(git log -1 --format=%ct)
declare formateddate=$(date +%Y%m%d-%H%M%S -d @$timestamp)

docker tag docker.irenshi.cn/ihr360-payroll-h5-static docker.ihr360.com/ihr360-payroll-h5-static:$version-$formateddate-$shortRev
docker push docker.ihr360.com/ihr360-payroll-h5-static:$version-$formateddate-$shortRev
