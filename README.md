# Laggit

Send lolcommits to Slack.

Simple CLI tool for sending your pretty little face to your team on
[Slack](https://slack.com/), via
[Lolcommits](https://github.com/mroth/lolcommits).

## How it works

This tool takes your last git commit SHA sum and looks for the corresponding
lolcommit inside `~/.lolcommits` directory.

Then it uploads your picture to Amazon S3 bucket of your choice, and pastes the
link to Slack channel.

### Inspiration, similar projects

It's easy to bind this to use as a part of post-commit hook in your Git repo.
Use this if you want do something similar without S3:

- [https://coderwall.com/p/j11fnw](https://coderwall.com/p/j11fnw)

### Why S3?

Because I wanted to store those dumbass pictures of my team in one place,
possibly serving it later on in some web interface / dashboard.

## Install

1. Install Lolcommits (https://github.com/mroth/lolcommits)
2. Install laggit

    ```
    npm install laggit -g
    ```

3. Then put this into your `.bashrc` / `.zshrc` file. Or if you're on Windows, do
whatever your folks do to set env variables.

    ```
    export LAGGIT_S3_KEY="your_s3_key"
    export LAGGIT_S3_SECRET="your_s3_secret"
    export LAGGIT_S3_BUCKET="your_s3_bucket_to_utilize"
    export LAGGIT_SLACK_TEAM="your_slack_team_name"
    export LAGGIT_SLACK_TOKEN="your_slack_webhook_token"
    export LAGGIT_SLACK_CHANNEL="your_slack_default_channel"
    ```

4. [OPTIONAL] You can add `laggit` command into post-commit hook in your github
repo, but be careful, it's not tested. (HINT: don't use lolcommits --FORK flag).

##  Usage

1. Make some changes
2. Commit
3. Wait until lolcommits finishes creating .gif or .jpg file
4. `laggit` send last commit image / gif to your default channel on Slack
5. Profit!

You can also specify channel on the go, like:

`laggit --channel=#mychannel`


## Happy Lolcommiting!

If you have any suggestions, hit me up ,)


