# US Regional Product - Reusable Workflows

The Quality Engineering Team from US Regional Product creates those workflows to use between all projects related.
![image](https://user-images.githubusercontent.com/1340046/185407235-2644679a-0b45-4b0b-80cf-06a01d694891.png)

## WARN

**You should not use the `main` branch on production workflows. This branch is reserved to test new code and it can change from time to time without notice. Please, use a released tag instead.**

### This is ok
```yaml
jobs:
  quality-engineering:
    name: QE
    uses: vtex-apps/usqa/.github/workflows/quality-engineering.yml@v2
```

### This is not ok
```yaml
jobs:
  quality-engineering:
    name: QE
    uses: vtex-apps/usqa/.github/workflows/quality-engineering.yml@main
```

## Using it on PUSH events
Suggested file name: `.github/workflows/qe-push.yml`

```yaml
name: '[PSH] Quality Engineering'

on:
  push:
    branches: 
      - master
      - main

jobs:
  quality-engineering:
    name: QE
    uses: vtex-apps/usqa/.github/workflows/quality-engineering.yml@v2
    with:
      # As you pass your Sonar Project Key and Organization,
      # you don't need sonar-project.properties file on root
      nodeSonar: true
      nodeSonarProjectKey: your-org_your-repo
      nodeSonarOrganization: your-org
      # You can disable it setting to false or just
      # by deleting the line (false is the default)
      nodeLint: true
      nodeTest: true
    secrets:
      githubToken: ${{ secrets.GITHUB_TOKEN }}
      sonarToken: ${{ secrets.SONAR_TOKEN }}
```

## Using it on PULL REQUEST events
We know that Cypress can take time to run, so why run it every time even when only documentation or translation other than English was added or changed? Thinking on that this reusable workflow identifies the change and if we don't have substantial ones to justify trigger Cypress tests, Cypress will skip them and ge approved in **less than five seconds**.

Suggested file name: `.github/workflows/qe-pull-request.yml`

```yaml
name: '[PRN] Quality Engineering'

on:
  pull_request:
    branches: 
      - main
      - master

jobs:
  quality-engineering:
    name: QE
    uses: vtex-apps/usqa/.github/workflows/quality-engineering.yml@v2
    with:
      danger: true
      dangerRequireChangelog: false
      nodeLint: true
      nodeTest: true
      nodeSonar: true
      nodeSonarProjectKey: your-org_your-repo
      nodeSonarOrganization: your-org      
      cypress: true
      cyRunnerTimeOut: 15  # In minutes
    secrets:
      githubToken: ${{ secrets.GITHUB_TOKEN }}
      sonarToken: ${{ secrets.SONAR_TOKEN }}
      cypressJson: ${{ secrets.VTEX_QE }}
```

## Using it on PULL REQUEST TARGET events
Because we can't trust everyone in the digital wolrd, receive pull requests from forks can be dangerous if you trigger workflows without taking a look on the code. Thinking on that, this reusable workflow has a check on the security step that allows run workflow from forks only if someone inside add a label `safe to test`. Until someone does this, the test will fail on the security check phase.

Suggested file name: `.github/workflows/qe-pull-request-target.yml`

```yaml
name: '[PRT] Quality Engineering'

on:
  pull_request_target:
    branches: 
      - main
      - master
    types:
      - labeled

jobs:
  quality-engineering:
    name: QE
    uses: vtex-apps/usqa/.github/workflows/quality-engineering.yml@v2
    with:
      danger: true
      dangerRequireChangelog: false
      nodeLint: true
      nodeTest: true
      nodeSonar: true
      nodeSonarProjectKey: your-org_your-repo
      nodeSonarOrganization: your-org      
      cypress: true
    secrets:
      githubToken: ${{ secrets.GITHUB_TOKEN }}
      sonarToken: ${{ secrets.SONAR_TOKEN }}
      cypressJson: ${{ secrets.VTEX_QE }}
```

## Using it on SCHEDULE events
The schedule events has the ability to skip all other dependent tasks and run only Cypress.

Suggested file name: `.github/workflows/qe-schedule.yml`

```yaml
name: '[SCH] Quality Engineering'

on:
  schedule:
    - cron: '30 7 * * MON-FRI'

jobs:
  quality-engineering:
    name: QE
    uses: vtex-apps/usqa/.github/workflows/quality-engineering.yml@v2
    with:
      cypress: true
    secrets:
      githubToken: ${{ secrets.GITHUB_TOKEN }}
      cypressJson: ${{ secrets.VTEX_QE }}
```
