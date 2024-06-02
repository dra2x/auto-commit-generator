### Auto Commit Generator

<img width="1169" alt="" src="https://github.com/love1ace/auto-commit-generator/assets/147500032/63c1fd87-5548-47ec-8138-755881b05916">


## Introduction

**Auto Commit Generator** Uses GitHub Actions to automatically generate commits daily or on specific dates chosen by the user.

## Before / After

**Before**:

<img width="765" alt="" src="https://github.com/love1ace/auto-commit-generator/assets/147500032/4ea979ed-ae8c-42fa-b2c9-95f3917483c2">


**After**:

<img width="765" alt="" src="https://github.com/love1ace/auto-commit-generator/assets/147500032/f2b237c9-5060-47a1-9287-87ed85cb849b">

## Features

### Daily Commit
- **Description**: Automatically generates a specified number of commits every day.
- **Configuration File**: `daily.json`
  - `commitMessage`: Commit message
  - `gitUserName`: Github username
  - `gitUserEmail`: Github user email
  - `minCommitCount`: Minimum number of commits per day
  - `maxCommitCount`: Maximum number of commits per day

### Backdate Commit
- **Description**: Manually generates a specified number of commits on chosen dates.
- **Configuration File**: `backdate.json`
  - `startDate`: Start date (format: YYYY-MM-DD)
  - `endDate`: End date (format: YYYY-MM-DD)
  - `minCommitCount`: Minimum number of commits per day
  - `maxCommitCount`: Maximum number of commits per day

## Installation and Usage

1. **Fork the Project**
   - Fork this repository.
   - You can set up and run the project directly on GitHub without cloning the forked repository.

2. **Create a GitHub Personal Access Token**
   - Generate a new token in [GitHub Settings](https://github.com/settings/tokens).
   - Required permission: `repo`
     
<img width="776" alt="" src="https://github.com/love1ace/auto-commit-generator/assets/147500032/bcd1d125-7ab1-4140-9769-1a6f9a6afdf1">


3. **Set Up GitHub Secrets**
   1. Go to the GitHub page of the forked repository.
   2. Navigate to `Settings > Secrets and variables > Actions`.
   3. Click `New repository secret` and name it `AUTO_COMMIT_TOKEN`.
   4. Enter the generated Personal Access Token in the **Value** field and click `Add secret`.

4. **Modify Configuration Files**
   - Adjust the `daily.json` and `backdate.json` files in the project root as needed.
   - Example `daily.json`:
     ```json
     {
       "commitMessage": "Auto Commit Generator",
       "gitUserName": "github-username",
       "gitUserEmail": "github@email.com",
       "minCommitCount": 1,
       "maxCommitCount": 5
     }
     ```
   - Example `backdate.json`:
     ```json
     {
       "startDate": "2024-05-10",
       "endDate": "2024-05-11",
       "minCommitCount": 1,
       "maxCommitCount": 5
     }
     ```

5. **Run GitHub Actions**
   - Go to the `Actions` tab in the GitHub repository.
   - Manually run the desired workflow (`Daily Commit` or `Backdate Commit`) or set it to run automatically.
   - **Daily Commit** runs automatically every day at 00:30 UTC.

## Contributing

If you would like to contribute to this project, please submit a pull request or open an issue.

## License

This project is licensed under the MIT License.
