#!/usr/bin/env bash
set -e

# create fresh build
rm -rf dist
yarn build

DATE=$(date -u +%Y-%m-%dT%H:%M)

cd dist

# create CNAME file for custom domain
echo "app.trashtutor.com" > CNAME

git init
git add .
git commit -m "new export at $DATE"
git remote add origin git@github.com:Aphanite/trash-tutor-pages.git
git push -u origin main --force
