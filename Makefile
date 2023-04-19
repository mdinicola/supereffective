default: build

dev: # shortcut, because make dev is quicker to type than pnpm dev:docker
	pnpm dev:docker

build:
	pnpm build

install:
	pnpm install

lint:
	pnpm lint

pretty:
	pnpm pretty

code:
	pnpm update:data
	pnpm -r generate:code
	pnpm pretty

postinstall-dev:
	if [[ ! -f "packages/website/.env.local" ]]; then cp .env.dist packages/website/.env.local; fi;
	pnpm update:data

postinstall-prod:
	pnpm update:data

# These are only relevant if you have access to the Vercel team:

vercel-login:
	pnpm i -g vercel
	vercel login # login
	vercel link # link local repo to vercel project
	vercel pull # pull project settings

# build project locally, using vercel's build system (useful to detect deployment errors before pushing)
vercel-build:
	vercel build
