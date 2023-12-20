# SuperEffective

[![Check Code Quality](https://github.com/supeffective/website/actions/workflows/quality.yml/badge.svg)](https://github.com/supeffective/website/actions/workflows/quality.yml)
[![wakatime](https://wakatime.com/badge/user/f2eacdee-569c-4e49-b11f-81a764fb575e/project/838d78e4-9190-4513-9c76-0e7672feab70.svg)](https://wakatime.com/badge/user/f2eacdee-569c-4e49-b11f-81a764fb575e/project/838d78e4-9190-4513-9c76-0e7672feab70)

Source code for supereffective.gg 's website.

Data can be found in https://github.com/supeffective/dataset

## Quick Start

1. Clone the repository
2. Install dependencies: `pnpm install`
3. Generate necessary data and code locally: `pnpm codegen`
4. Configure your PostgreSQL DB connection strings.
   You can use the `db` service in `docker-compose.yml` to spawn a local DB using Docker,
   or or use a provider like Neon.tech,
   then configure the database env vars in:

## Software Stack

We use the following technologies, services and tools:

- We use Node v18 LTS
- pnpm v8 for package management
- Turborepo (turbo) to accelerate running scripts
- NextJS 13 + React 18 for the website
- CSS Modules for styling without styling libraries (to be integrated with TailwindCSS in v4)
- React Context for state management (to be replaced by Redux Toolkit in v4)
- MDX + [FrontMater CMS](https://frontmatter.codes/) as the local/static CMS
- Next Auth, Prisma and Neon.tech PostgreSQL for authentication and dex data storage
- Vercel (Pro tier) for hosting and deployments
- GitHub for hosting static JSON dataset
- CloudFlare for caching and DNS
- Docker, PostgreSQL and Maildev for local development environment
- Other tools: ESLint, Prettier, Husky, etc.

This repository is a Turbo monorepo, meaning it contains multiple packages and apps.

## Project Structure

The main application is the website, which is located in `./packages/website`.
The MDX files for pages and articles are located under the `./cms` directory.

Website is a NextJS application with the following structure:

**`./packages/website`:**

- `pages`: next routes/pages and APIs
- `public`: static assets (for the UI and also for the CMS pages)
- `src`:
  - `config`: general app config (e.g. from env vars, json files or ts code)
  - `containers`: root-level app components (this is not a NextJS 13 `app` dir structure)
  - `features`: business logic in bounded contexts, following some DDD principles
    - `/**/`: name of the domain / feature
      - `components`: components specific to this domain
      - `hooks`: hooks specific to this domain
      - `state`: domain state: contexts, objects and types
      - `views`: domain views: views composed with many other components
  - `hooks`: reusable hooks
  - `layouts`: reusable page skeletons / themes
  - `primitives`: reusable components without business logic or global state
  - `styles`: global css styles
  - `utils`: reusable generic functions that do not belong to services or to a specific domain

> All code that it's subject to be rewritten and refactored is under `src/**/legacy/` subfolders or has
> "legacy" as part of the filename.

## Monorepo packages

- auth: Authentication abstraction layer
- config: Project confing and env vars wrapper
- database: Database abstraction layer. It also abstracts the Pokemon JSON static dataset.
- mailer: Transactional mailing service abstraction layer
- mdx: MDX abstraction layer (loader and react components).
- patreon: All necessary code to connect to Patreon API and get infos
- ui: Stateless UI components, assets, fonts, SVGs, and tools. Uses TailwindCSS and Lucide Icons.
- utils: Generic utilities for various environments (universal, commonjs, react, nextjs)
- website: v3 site, using Next pages dir

## Prerequisites

You will need Docker (for the local DB and mail server), Node v18 LTS and pnpm v8.

## Quick Start

1. Clone the repository
2. Install dependencies: `pnpm install`
3. Generate necessary data and code locally: `pnpm codegen`
4. Configure your PostgreSQL DB connection strings.
   You can use the `db` service in `docker-compose.yml` to spawn a local DB using Docker,
   or or use a provider like Neon.tech,
   then configure the database env vars in:
   - packages/database/.env
   - packages/website/.env.local
5. Build the dist files of the different monorepo packages: `pnpm build`
6. Run the website in development mode: run any of: `pnpm dev` / `make`.
7. Open http://localhost:3001 or run `pnpm open` to open the website in your browser. Other URLs:
   - Dev Mail server: http://localhost:1080

Or all in one command: `pnpm codegen && pnpm build && pnpm db:migrate && pnpm dev && pnpm open`

## Maintenance scripts

- `pnpm codegen`: generates all necessary (including CSS) to build the website.
- `pnpm build`: builds the website.

For other scripts, please check the `package.json` files.

## Dependencies

- Q: Why packages like "turbo" or "eslint" are under "dependencies" instead of "devDependencies"?
- A: Because on Vercel, the "devDependencies" are not installed, and NextJS apps need many of them during the build
  process (especially ESLint plugins and configs and all their dependencies).

## Contributing

Contributions are welcome! Please read the [contributing guidelines](./CONTRIBUTING.md) before submitting a PR.

- [Dataset repository](https://github.com/supeffective/dataset)
- [Issue Reports and Tracking](https://github.com/supeffective/website/issues)
- [Project Roadmap and Task Board](https://github.com/orgs/supeffective/projects)

For other feedback that is not related to issues, please use our [Discord server](https://discord.gg/3fRXQFtrkN)

## License

This project is licensed under the [MIT License](./LICENSE).
