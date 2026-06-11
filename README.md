# include-portal-ui

## Pre-requisites

- Node 22 (matches CI/Netlify — see `NODE_VERSION` in the Netlify environment)
- Docker

## Get Started

### Environment variables:

- Create a `.env` with the scheme found here: https://github.com/include-dcc/include-portal-ui/blob/main/.env.schema
- Make sure to fill all the variables

### Running the project locally

#### Starting the Bastion

- Start bastion using: `igor`

#### Starting the project

- Install dependencies: `npm install`
- Start the project: `npm start`

### Running the USERS API locally

- Clone: https://github.com/include-dcc/include-users-api
- Follow the steps here: https://github.com/include-dcc/include-users-api/blob/main/README.md
- Make sure to add the include keycloak config for the users-api in your `.env`

## Deployment

Checkout the dev branch and make sure you are up to date:

```bash
git checkout dev
git pull
```

### Release Note

1. Bump the version with `npm version <new-version> --no-git-tag-version`. This updates **both** `package.json` and `package-lock.json` together. Never hand-edit the version in only one of the two files — it desyncs the lockfile.

2. Verify the lockfile is in sync by running `npm ci --dry-run` locally — it must complete without error. (`--dry-run` runs the same `package.json` ↔ `package-lock.json` sync check Netlify does, but does **not** delete or reinstall `node_modules`.)

   > ⚠️ If it fails with `npm ci can only install packages when your package.json and package-lock.json ... are in sync`, run `npm install` to reconcile the lockfile, then commit the updated `package-lock.json`.

3. Update NEWS.md with release notes (ask the Product Owner)

4. Commit and push directly on dev:

```bash
git add package.json package-lock.json NEWS.md
git commit -m "chore: SJIP-000 Release <new-version>"
git push origin dev
```

> ⚠️ **Keep `package.json` and `package-lock.json` in sync.** The Netlify build runs `npm ci` (see the `build:netlify` script), which **refuses to install** — and fails the deploy — when the two files disagree. Local `npm install` / `npm start` silently auto-heal the lockfile, so drift won't surface until the deploy breaks. Always run `npm ci` locally before pushing any dependency or version change.

### Deploy to PRD

1. Checkout the main branch and make sure both main and dev are up to date:

```bash
git checkout dev && git pull     # make sure dev is current
git checkout main && git pull    # then switch to main, up to date
```

2. Merge dev into main:

```bash
git merge dev
```

3. Push directly on main:

```bash
git push origin main
```

4. Go to [Netlify](https://app.netlify.com/sites/include-prd/overview) and make sure the deployment is successful 

5. In [Github Compare](https://github.com/include-dcc/include-portal-ui/compare) make sure dev and main branch are sync (no change between them)

6. In [Github Releases](https://github.com/include-dcc/include-portal-ui/releases) draft a new release with the version and the content used in NEWS.md, make sure to target main branch

7. Move JIRA tickets in Ready to Deploy to Done

8. Do a quick check on the [Include PRD](https://portal.includedcc.org/login) to make sure everything works
