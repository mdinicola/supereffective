FROM node:18-bullseye as dev

# env vars
ENV DEBIAN_FRONTEND noninteractive
ENV TERM xterm-256color
ENV REACT_EDITOR code
ENV NEXT_TELEMETRY_DISABLED 1

ENV HOME "/root"
ENV PATH="/usr/src/app/node_modules/.bin:$PATH"
ENV PNPM_VERSION="latest"

# Configure Locale and Timezone
ENV LC_ALL=en_US.UTF-8 \
    LANG=en_US.UTF-8 \
    LANGUAGE=en_US.UTF-8

ENV TZ=Europe/Berlin

RUN apt-get update && \
    apt-get install -y locales && \
    apt-get clean -y && rm -rf /var/lib/apt/lists/* && \
    echo 'en_US.UTF-8 UTF-8\nde_DE ISO-8859-1' > /etc/locale.gen && \
    locale-gen && \
    dpkg-reconfigure locales

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Install essentials
RUN apt-get update && \
    apt-get install -y git zsh && \
    apt-get clean -y && rm -rf /var/lib/apt/lists/*

ENV SHELL /bin/zsh

# Configure git
RUN git config --global pull.rebase true

# Prepare package manager(s) and global dependencies
RUN npm install npm@latest -g && \
    npm i -g vercel

# Install latest pnpm:
RUN corepack enable && \
    corepack prepare "pnpm@${PNPM_VERSION}" --activate

# configure workdir and ports
WORKDIR /usr/src/app

# website port
EXPOSE 3001
