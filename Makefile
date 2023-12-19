default: dev

dev:
	pnpm dev-open

pretty:
	pnpm format

data:
	pnpm -r data:update

code:
	pnpm codegen
	pnpm pretty:pkgjsons

postinstall:
	echo "Running postinstall..."
	if [ ! -f ".env" ]; then cp .env.dist .env; fi;
	if [ "$$CI" = "1" ]; then exit 0; fi;
	if [ ! -f ".husky/_/husky.sh" ]; then pnpm husky install; fi;
	pnpm pretty:pkgjsons

# The vercel-* commands are only relevant if you have access to the Vercel team:
vercel-login:
	# npm i -g vercel
	vercel login # login
	vercel link # link local repo to vercel project
	vercel pull # pull project settings

# Build project locally, using vercel's build system (useful to detect deployment errors before pushing)
vercel-build:
	vercel build -d
	pnpm pretty
