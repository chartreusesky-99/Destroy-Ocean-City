#!/bin/bash
set -e

APP_NAME="destroyOceanCity"
DEPLOY_DIR="../angular-deploy"
BRANCH="gh-pages"   # GitHub Pages branch

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
if git worktree list | grep -q "\[$BRANCH\]"; then
    STALE_PATH=$(git worktree list | grep "\[$BRANCH\]" | awk '{print $1}')
    echo "Removing stale worktree at $STALE_PATH..."
    git worktree remove "$STALE_PATH" --force || true
fi

rm -rf "$DEPLOY_DIR"
git worktree add -B "$BRANCH" "$DEPLOY_DIR" "origin/$BRANCH" || \
git worktree add -B "$BRANCH" "$DEPLOY_DIR"

echo "Copying build output to deployment directory..."
sudo chown -R $(whoami) "$DEPLOY_DIR" 2>/dev/null || true
rm -rf "$DEPLOY_DIR"/*
cp -r "dist/$APP_NAME/"* "$DEPLOY_DIR/"

# ---- GitHub Pages SPA fix ----
echo "Adding SPA fallback (index.html → 404.html)..."
cp "$DEPLOY_DIR/index.html" "$DEPLOY_DIR/404.html"

echo "Committing and pushing to $BRANCH branch..."
cd "$DEPLOY_DIR"
git add .
git commit -m "Deploy: $(date '+%Y-%m-%d %H:%M:%S')" || echo "No changes to commit"
git push origin "$BRANCH"

echo "Deployment complete!"
echo "Reminder: SPA fallback is active (index.html also copied to 404.html)."
cd - > /dev/null
