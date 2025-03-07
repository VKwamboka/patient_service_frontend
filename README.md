# Diseases Prediction - Frontend

This repository serves as the frontend service for the Diseases Prediction Project responsible for user / patient interaction and visualization of content. It includes a pre-configured setup with Angular and essential operational tools and best practices.

## Contacts

- [Name] ([email]): Lead Developer

## Prerequisites

Ensure the following tools are installed in your local environment, as they are essential for development:

- [Docker](https://docker.com) - For running the services in a containerized environment. If devcontainer is used for development (recommended), no other dependencies are needed to be installed locally (more about devcontainers in [Devcontainers](#devcontainers)).

**Local development without devcontainer**\
If devcontainer is not used for development, the following packages have to be installed locally:

- [Angular CLI](https://angular.dev/tools/cli/setup-local) - Required for development, along with npm for package management (recommended v20.10).

**Additional dependencies**\
The following dependencies are optional and not needed for development:

- [Azure CLI](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli) - The Azure Command-Line Interface (CLI) is a cross-platform command-line tool to connect to Azure and execute administrative commands on Azure resources. It allows the execution of commands through a terminal using interactive command-line prompts or a script.

## How to Use

### Installing node dependencies (not needed if devcontainer is used)

First, install the necessary dependencies by running (not needed if devcontainer is used):

```bash
npm install
```

This command will install all dependencies defined in the package.json file under node_modules folder.

### Starting the service

To start the service, use the following command:

```bash
npm run start
```

This initiates the Angular application using environment configuration file (found in `src/environments/environment.*.ts`). If set up correctly, the service will start the application on [http://localhost:8080](http://localhost:8080).

## Available Documentations

- Angular: [What is Angular?](https://angular.dev/overview)

## Development Workflow

### Devcontainers

Devcontainers are pre-configured development environments defined using Docker containers (see `.devcontainer/`). They ensure consistent tooling and dependencies across different development machines, enhancing collaboration and reproducibility. See [Developing inside a Container](https://code.visualstudio.com/docs/devcontainers/containers) for more information about devcontainers.

**To Start Devcontainers in VSCode:**

1. Install the [Remote - Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) for VSCode.
2. Open the project in VSCode.
3. Click on the green bottom-left corner of the VSCode window and select "Reopen in Container". This will build and start the devcontainer defined in `.devcontainer/devcontainer.json`.

**If new global dependencies are used, please track it by updating the Dockerfile (`.devcontainer/Dockerfile`).**

### Issue Tracking and Branch Management

For issue tracking and branch management, please use the following recommendations:

- For creating issues and tracking progress, use the project's Jira [issue board](https://trello.com/b/Px9ETvMh/diseaseprediction-project).
- Direct pushes to the `develop` or `main` branches are restricted. Always use pull requests and assign at least on other reviewer.
- For simplicity and tracking, create branches directly from issues with the 'Create a branch' button.
- Prefix branch names according to their purpose with one of the following labels:
  - feat/[branch-name] for new features and functionalities
  - fix/[branch-name] for bugfixes
  - docs/[branch-name] for documentation
  - ci/[branch-name] for pipeline
  - test/[branch-name] for testing
  - task/[branch-name] for everything else

### CI/CD Pipelines

Three different pipelines are configured, triggered by the following actions:

- **Every Pull Request**: Triggers the pipeline stages: Lint, Test, and Build Docker Image.
- **Merging branch to `develop`**: Merging into the `develop` branch deploys the built image to Azure Container Registry (ACR) in the development environment.
- **Merging `develop` to `main`**: Merging `develop` into the `main` branch deploys the built image to Azure Container Registry (ACR) in the production environment.

**GitHub Actions Secrets**\
In order for the GitHub Actions workflows to work, configure the following secrets in `Settings / Secrets & variables / Actions`:

- **ACR_DEV_NAME**: Azure Container Registry URL (development environment).
- **ACR_PROD_NAME**: Azure Container Registry URL (production environment).
- **AZURE_CREDENTIALS_DEV**: Azure Entra credentials in the development environment (ideally for a technical user).
- **AZURE_CREDENTIALS_PROD**: Azure Entra credentials in the production environment (ideally for a technical user).
- **DOCKER_IMAGE_NAME**: Name of your docker image (e.g., [projectname]-core-service, [projectname]-frontend-service)
- **GHCR_PAT**: GitHub PAT token (used for storing Docker images in GitHub Packages)
- **GHCR_USERNAME**: GitHub username (used for storing Docker images in GitHub Packages)

### Docker Commands

To build and run Docker containers, use the following commands:

```bash
docker build -t diseasespred/service-frontend:latest -f ./docker/Dockerfile .
docker run -it -p 4000:4000 -d --restart=always --name diseases-prediction-service-frontend diseasespred/service-frontend:latest
```

Other useful commands:

```bash
# Logging in a running docker container
docker exec -it [CONTAINER ID] sh

# Checking the logs of a running docker container
docker logs [CONTAINER ID]
```

### Push to Azure Container Registry

It can be useful sometimes to manually push an image to Azure ACR which can be done using the following commands. Make sure your account has the neccesary rights in Azure for pushing to ACR.

```bash
# Login to Azure ACR (needs to be done once)
az acr login --name diseasespredacrscs

# Assuming the docker image has been built previously (see [Docker Commands](#docker-commands))
docker tag diseasespred/service-auth-api:latest diseasespredacrscs.azurecr.io/service-auth-api:latest

# Push docker image to ACR
docker push diseasespredacrscs.azurecr.io/service-auth-api:latest
```

## Best Practices

The following section outlines the best practices and conventions used in the project.

### Testing Locally First

Ensure all tests pass locally and run linting tools before pushing changes:

```bash
npm run format:check  // Checks for eslint and prettier related errors
npm run format:fix  // Fixes eslint and prettier related errors
```

### Naming Conventions

Follow these naming conventions in the project:

- **Packages, folders, and files**: Use kebab-case (e.g., `users-example.controller.ts`)
- **Constants and enums**: Use UPPER_SNAKE_CASE (e.g., `SERIAL_NUMBER_FOR_DEVICE`)
- **Functions, parameters, variables**: Use lowerCamelCase (e.g., `publishDeviceData(dataReceived: string)`)
- **Classes**: Use UpperCamelCase (e.g., `RawClientMqtt`)
- **Booleans**: Prefix with `is` or `has` (e.g., `hasLoggedIn`, `isAdmin`)
