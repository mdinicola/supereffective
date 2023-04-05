#!/usr/bin/env bash
set -e

# run this from inside the apps/website/ directory

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
echo "Copying supereffective-assets/data ..."
echo $PWD
rm -rf ./data
rm -rf ./.next
cp -r "${ASSETS_DATA_FOLDER_DIR}" ./
