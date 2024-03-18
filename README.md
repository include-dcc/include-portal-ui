# include-portal-ui

## Pre-requisites

- Node 16+
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

Checkout dev branch and make sure you are up to date

### Release Note

1. Bump version in package.json and package-lock.json

2. Update NEWS.md with release notes (ask the Product Owner)

3. Commit and push directly on dev

### Deploy to PRD

1. Checkout main branch and make sure you are up to date and your dev branch is up to date

2. Run `git merge dev --no-commit`

3. Push directly on main

4. Go to [Netlify](https://app.netlify.com/sites/include-prd/overview) and make sure the deployment is successful 

5. In [Github Compare](https://github.com/include-dcc/include-portal-ui/compare) make sure dev and main branch are sync (no change between them)

6. In [Github Releases](https://github.com/include-dcc/include-portal-ui/releases) draft a new release with the version and the content used in NEWS.md, make sure to target main branch

7. Move JIRA tickets in Ready to Deploy to Done

8. Do a quick check on the [Include PRD](https://portal.includedcc.org/login) to make sure everything works
