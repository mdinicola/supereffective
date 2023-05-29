default: dev

dev:
	pnpm open
	pnpm dev

build:
	pnpm build

install:
	pnpm install

lint:
	pnpm lint

pretty:
	pnpm pretty

data:
	pnpm update:data

code:
	pnpm -r build:code
	pnpm format:packages

postinstall:
	echo "Running postinstall..."
	if [[ ! -f ".env" ]]; then cp .env.dist .env; fi;
	pnpm pkg:database build:data
	pnpm pkg:database build:code
	pnpm format:code
	if [ "$$CI" = "1" ]; then exit 0; fi;
	pnpm husky install
	pnpm format:packages

# These are only relevant if you have access to the Vercel team:

vercel-login:
	# npm i -g vercel
	vercel login # login
	vercel link # link local repo to vercel project
	vercel pull # pull project settings

# build project locally, using vercel's build system (useful to detect deployment errors before pushing)
vercel-build:
	vercel build

# DATABASE_URL=$$STUDIO_DATABASE_URL DIRECT_DATABASE_URL=$$STUDIO_DATABASE_URL 
prisma-studio-start:
	pnpm install
	cd packages/database && pnpm prisma generate && pnpm prisma studio --browser none --port $${PORT:-5555}
