#!/usr/bin/env bash
set -e

if [[ ! -d "./packages/database/src" ]]; then
  echo "[scripts/sync-data]  ERROR: This script must be run from the project root directory"
  exit 1
fi

echo "  >>>  Importing supereffective-assets..."

ASSETS_REPO_DIR=".cache/supereffective-assets"
ASSETS_DATA_FOLDER_DIR=".cache/supereffective-assets/data"

if [[ -d "${ASSETS_REPO_DIR}" ]]; then
  cd "${ASSETS_REPO_DIR}"
  git pull origin main
  cd -
else
  # yarn won't update github package refs for some reason, so better to clone directly and not use yarn
  git clone https://github.com/itsjavi/supereffective-assets.git "${ASSETS_REPO_DIR}"
  cd "${ASSETS_REPO_DIR}"
  git checkout main
  cd -
fi

# remove and copy again the data dir
echo "[scripts/sync-data] Copying supereffective-assets/data to {$PWD}/packages/database ..."

echo "[scripts/sync-data] PWD = {$PWD}"

rm -rf ./packages/database/data
cp -r "${ASSETS_DATA_FOLDER_DIR}" ./packages/database

if [[ ! -d "./packages/database/data" ]]; then
  echo "[scripts/sync-data]  ERROR: Failed to copy the data folder"
  exit 1
fi
