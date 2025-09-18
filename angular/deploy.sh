#!/bin/bash
set -e

APP_NAME="destroyOceanCity"
DEPLOY_DIR="../angular-deploy"
BRANCH="gh-pages"   # <-- was "dist"

echo "Building Angular app for production..."
ng build --configuration production

read -p "Are you sure you want to overwrite $DEPLOY_DIR? [y/N] " confirm
if [[ "$confirm" != "y" ]]; then
    echo "Aborting deployment."
    exit 1
fi

if [ ! -d "dist/$APP_NAME" ]; then
    echo "Error: build output not found at dist/$APP_NAME"
    exit 1
fi

echo "Ensuring deployment worktree exists..."
git worktree prune || true

# Remove conflicting worktree if exists
if git worktree list | grep -q " $BRANCH$"; then
    STALE_PATH=$(git worktree list | grep " $BRANCH$" | awk '{print $1}')
    echo "Removing stale worktree at $STALE_PATH..."
    git worktree remove "$STALE_PATH" --force || true
fi

rm -rf "$DEPLOY_DIR"
git worktree add -B "$BRANCH" "$DEPLOY_DIR" "origin/$BRANCH" || \
git worktree add -B "$BRANCH" "$DEPLOY_DIR"

echo "Copying build output to deployment directory..."
rm -rf "$DEPLOY_DIR"/*
cp -r "dist/$APP_NAME/"* "$DEPLOY_DIR/"

echo "Committing and pushing to $BRANCH branch..."
cd "$DEPLOY_DIR"
git add .
git commit -m "Deploy: $(date '+%Y-%m-%d %H:%M:%S')" || echo "No changes to commit"
git push origin "$BRANCH"

echo "Deployment complete!"
cd - > /dev/null
