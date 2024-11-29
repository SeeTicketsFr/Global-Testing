# Contributing

First of all, thank you for contributing to Meilisearch! The goal of this document is to provide everything you need to know in order to contribute to Meilisearch and its different integrations.

<!-- MarkdownTOC autolink="true" style="ordered" indent="   " -->

- [Assumptions](#assumptions)
- [How to Contribute](#how-to-contribute)
- [Development Workflow](#development-workflow)
- [Git Guidelines](#git-guidelines)
- [Release Process (for internal team only)](#release-process-for-internal-team-only)

<!-- /MarkdownTOC -->

## Assumptions

1. **You're familiar with [GitHub](https://github.com) and the [Pull Request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/about-pull-requests) (PR) workflow.**
2. **You've read the [README](/README.md).**

## How to Contribute

1. Make sure that the contribution you want to make is explained or detailed in a GitHub issue! Find an [existing issue](https://github.com/SeeTicketsFr/Global-Testing/issues/) or [open a new one](https://github.com/SeeTicketsFr/Global-Testing/issues/new).
2. Once done, [fork the meilisearch-symfony repository](https://help.github.com/en/github/getting-started-with-github/fork-a-repo) in your own GitHub account. Ask a maintainer if you want your issue to be checked before making a PR.
3. [Create a new Git branch](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-and-deleting-branches-within-your-repository).
4. Review the [Development Workflow](#development-workflow) section that describes the steps to maintain the repository.
5. Make the changes on your branch.
6. [Submit the branch as a PR](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request-from-a-fork) pointing to the `main` branch of the main Global-Testing repository. A maintainer should comment and/or review your Pull Request within a few days. Although depending on the circumstances, it may take longer.<br>
 We do not enforce a naming convention for the PRs, but **please use something descriptive of your changes**, having in mind that the title of your PR will be automatically added to the next [release changelog](https://github.com/SeeTicketsFr/Global-Testing/releases/).

## Development Workflow

### Using the Docker Environment

#### Setup

To set up and run Global-Testing locally, make sure you have Git and Docker installed on your system. Then run the command for your system:

##### Linux/macOS:

Clone the project
```console
git clone https://github.com/SeeTicketsFr/Global-Testing.git
```

Copy .env.example files
```
cd Global-Testing/ && cp .env.example .env
```
```
cd back/ && cp .env.example .env
```

Run containers - Production
```
docker compose up -d
```
Run containers - Development
```
docker compose -f compose.dev.yml up -d
```

##### Windows Command Prompt:

Clone the project
```console
git clone https://github.com/SeeTicketsFr/Global-Testing.git
```

Copy .env.example files
```
cd Global-Testing && copy .env.example .env
```
```
cd back/ && copy .env.example .env
```

Run containers - Production
```
docker compose up -d
```
Run containers - Development
```
docker compose -f compose.dev.yml up -d
```

#### Tests and Linter

Each Pull Request should pass the tests, and the linter to be accepted.

```sh
# Tests
cd back/ && make test
# lint
cd back/ && make check-all
cd front/ && make lint-code
```


## Git Guidelines

### Git Branches

All changes must be made in a branch and submitted as PR.
We do not enforce any branch naming style, but please use something descriptive of your changes.

### Git Commits

As minimal requirements, your commit message should follow [these rules](https://www.conventionalcommits.org/en/v1.0.0/)
We don't follow any other convention.

### GitHub Pull Requests

Some notes on GitHub PRs:

- [Convert your PR as a draft](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/changing-the-stage-of-a-pull-request) if your changes are a work in progress: no one will review it until you pass your PR as ready for review.<br>
  The draft PR can be very useful if you want to show that you are working on something and make your work visible.
- The branch related to the PR must be **up-to-date with `main`** before merging.
- All PRs must be reviewed and approved by at least one maintainer.
- The PR title should be accurate and descriptive of the changes. The title of the PR will be indeed automatically added to the next [release changelogs](https://github.com/SeeTicketsFr/Global-Testing/releases/).


<hr>

Thank you again for reading this through, we can not wait to begin to work with you if you made your way through this contributing guide ❤️