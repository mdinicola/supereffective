# SuperEffective

Source code for supereffective.gg 's website.

## Software Stack

We use the following technologies, services and tools:

- We use Node v18 LTS
- pnpm v8 for package management
- Turborepo (turbo) to accelerate running scripts
- NextJS 13 + React 18 for the website
- CSS Modules for styling (no styling libraries)
- React Context for state management (to be replaced by Redux Toolkit)
- [ContentLayer](https://www.contentlayer.dev/) + [FrontMater CMS](https://frontmatter.codes/) + MDX files as the local/static CMS
- Firebase for authentication and dex data storage (to be replaced by Auth.js and Prisma + PlanetScale)
- Vercel (Pro tier) for hosting and deployments
- GitHub for hosting [static data and spritesheets](https://github.com/itsjavi/supereffective-assets)
- CloudFlare for CDN and DNS
- Other tools: ESLint, Prettier, Husky, etc.

This repository is a Turbo monorepo, meaning it contains multiple packages and apps.

## Project Structure

The main application is the website, which is located in `apps/website`. It is a NextJS application with
the following structure:

**`./apps/website`:**

- `data`: data imported from `itsjavi/supereffective-assets`. This should never be edited manually.
- `public`: static assets
- `scripts`: build and maintenance scripts
- `src`:
  - `apps`: root-level app components (this is not a NextJS 13 `app` dir structure)
  - `cms`: MDX files for pages and articles/posts
  - `config`: general app config (e.g. from env vars, json files or ts code)
  - `domains`: business logic in bounded contexts
    - `/**/`: name of the domain
      - `hooks`: hooks specific to this domain
      - `state`: domain state: contexts, objects and types
      - `views`: domain views: components and page components
  - `hooks`: reusable hooks
  - `layouts`: reusable page skeletons / themes
  - `pages`: next routes/pages and APIs
  - `primitives`: reusable components without business logic or global state
  - `services`: infrastructure interfaces/types and their implementations
  - `state`: global state context, object and types
  - `styles`: global css styles
  - `utils`: reusable generic functions that do not belong to services or to a specific domain

> All code that it's subject to be rewritten and refactored is under `src/*/legacy/` subfolders or has
> "legacy" as part of the filename.

## Prerequisites

You will need Node v18 LTS and pnpm v8.
As an alternative, you can also run the project using Docker with the provided configuration files.

## Quick Start

1. Clone the repository
2. Install dependencies: `pnpm install`
3. Run the website in development mode: `pnpm dev` (natively) or `pnpm dev:docker` (with Docker)
4. Open http://localhost:3001 or run `pnpm open` to open the website in your browser

## Maintenance scripts

- `pnpm build`: builds the website.
- `pnpm update:latest`: update all dependencies to their latest version (a shortcut for `pnpm update -r --latest`).
- `pnpm update:data`: update the data from `itsjavi/supereffective-assets` repo.

For other scripts, please check the `package.json` files.

### Running scripts in an isolated Docker environment

Start a shell inside the docker container, you can run `pnpm docker`.
It is a shortcut for `docker-compose run --rm dev /bin/zsh`.

Alternatively you can run any script directly inside the container by using `docker-compose run --rm dev`
with any arguments, e.g. `docker-compose run --rm dev pnpm build`.

## Dependencies

- Q: Why packages like "turbo" or "eslint" are under "dependencies" instead of "devDependencies"?
- A: Because on Vercel, the "devDependencies" are not installed, and NextJS apps need many of them during the build
  process (especially ESLint plugins and configs and all their dependencies).

## Contributing

Contributions are welcome! Please read the [contributing guidelines](./CONTRIBUTING.md) before submitting a PR.

## License

At the moment, this project uses a [private software license](./LICENSE.md).

All contributors that have access to this project and/or has contributed to it,
will automatically agree to the terms of this license.
