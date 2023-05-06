#!/usr/bin/env bash
set -e

if [[ ! -d "./prisma/migrations" ]]; then
  echo "[scripts/sync-data]  ERROR: This script must be run from the packages/database directory"
  exit 1
fi

echo "  >>>  Importing supereffective-assets..."

ASSETS_REPO_DIR=".cache/supereffective-assets"
ASSETS_DATA_FOLDER_DIR=".cache/supereffective-assets/data"

if [[ -d "${ASSETS_REPO_DIR}" ]]; then
  echo "[scripts/sync-data] Updating supereffective-assets repository..."
  cd "${ASSETS_REPO_DIR}"
  git pull origin main
  cd -
else
  # yarn won't update github package refs for some reason, so better to clone directly and not use yarn
  echo "[scripts/sync-data] Cloning supereffective-assets repository. This may take a while..."
  git clone https://github.com/itsjavi/supereffective-assets.git "${ASSETS_REPO_DIR}"
  cd "${ASSETS_REPO_DIR}"
  git checkout main
  cd -
fi

# remove and copy again the data dir
echo "[scripts/sync-data] Copying supereffective-assets/data to {$PWD} ..."

echo "[scripts/sync-data] PWD = {$PWD}"

rm -rf ./data
cp -r "${ASSETS_DATA_FOLDER_DIR}" .

if [[ ! -d "./data" ]]; then
  echo "[scripts/sync-data]  ERROR: Failed to copy the data folder"
  exit 1
fi
