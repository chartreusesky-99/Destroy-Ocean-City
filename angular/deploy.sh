#!/bin/bash
set -e

# -------------------------
# Configuration
# -------------------------
APP_NAME="destroyOceanCity"
DEPLOY_DIR="../angular-deploy"
# -------------------------

echo "Building Angular app for production..."
ng build --configuration production

# Confirm before overwriting deployment directory
read -p "Are you sure you want to overwrite $DEPLOY_DIR? [y/N] " confirm
if [[ "$confirm" != "y" ]]; then
    echo "Aborting deployment."
    exit 1
fi

# Verify build folder exists
if [ ! -d "dist/$APP_NAME" ]; then
    echo "Error: build output not found at dist/$APP_NAME"
    exit 1
fi

echo "Copying build output to deployment directory..."
rm -rf "$DEPLOY_DIR"/*
cp -r "dist/$APP_NAME/"* "$DEPLOY_DIR/"

echo "Committing and pushing to dist branch..."
cd "$DEPLOY_DIR"

git add .
git commit -m "Deploy: $(date '+%Y-%m-%d %H:%M:%S')" || echo "No changes to commit"
git push origin dist

echo "Deployment complete!"
cd - > /dev/null
