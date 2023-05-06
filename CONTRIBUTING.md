# SuperEffective Contributing Guide

Thanks for your interest to contribute to `SuperEffective`. Please take a moment and read through this guide:

## Repository

supereffective.gg is a monorepo using turbo and pnpm workspaces. We use Node v18. The package manager used to install
and link dependencies must be [pnpm v8](https://pnpm.io/). It can be installed as:

```sh
npm install -g pnpm@8
```

Install the dependencies after forking and cloning the repository

```sh
pnpm install
```

> **NOTE:** this project has a [VS Code Devcontainer](https://code.visualstudio.com/docs/remote/containers)
> configuration which enables development in a Docker container, as well as
> on [GitHub Codespaces](https://code.visualstudio.com/docs/remote/codespaces). This is a great option if you want to
> contribute to the project, but don't necessarily want to install this project's toolset and dependencies globally on
> your computer.

## Developing

The main package can be found in `packages/website`. You can quickly test and debug your
changes by running:

```sh
pnpm build
pnpm dev # or pnpm dev:docker
```

Read the main [README](README.md) for more information about the project structure and the available commands.

## Testing

Since this project is undergoing a rewrite, at the moment we don't have tests for it, but you can run the linter and
build the project to make sure that at least the deployments won't be broken.

```sh
# On the root project dir
pnpm build
pnpm lint
```
