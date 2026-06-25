# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

### Installation

```
$ yarn
```

### Local Development

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Using SSH:

```
$ USE_SSH=true yarn deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

### Deploy

`yarn deploy` builds the site and publishes it.

### Export (ZIP)

`yarn export` runs `scripts/export-documentation.mjs` and writes `exports/documentation-md-absolute.zip`: a snapshot of the project with Markdown asset links rewritten to full URLs that match your current `build/` output. Run `yarn build` or `yarn deploy` first so `build/` exists.

### Deploy + Export

`yarn deploy:export` runs deploy, then export, so the ZIP lines up with what you just published.
