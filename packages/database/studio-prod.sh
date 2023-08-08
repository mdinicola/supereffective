touch .env.prod
source .env.prod

pnpm codegen
pnpm pretty:code

DATABASE_URL=$STUDIO_DATABASE_URL DIRECT_DATABASE_URL=$STUDIO_DATABASE_URL prisma studio --port 5556 --browser none
