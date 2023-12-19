if [ ! -f .env.prod ]; then
  echo "Missing .env.prod file"
  exit 1
fi

source .env.prod

if [ -z "$STUDIO_DATABASE_URL" ]; then
  echo "Missing STUDIO_DATABASE_URL environment variable"
  exit 1
fi

pnpm codegen
pnpm pretty:code

DATABASE_URL=$STUDIO_DATABASE_URL DIRECT_DATABASE_URL=$STUDIO_DATABASE_URL prisma studio --port 5556 --browser none
