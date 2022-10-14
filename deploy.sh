#!/usr/bin/env sh

set -e

npm run build

cd dist

git init
git add -A
git commit -m 'deploy'
git branch -M main
git push -f https://github.com/egorpariah/nevatrip-test.git main:gh-pages

cd -