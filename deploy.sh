#!/bin/bash
set -e # Exit with nonzero exit code if anything fails

REPO=`git config remote.origin.url`
SSH_REPO=${REPO/https:\/\/github.com\//git@github.com:}
SHA=`git rev-parse --verify HEAD`

# -other stuff would go here, but I am just pushing to the Repo-

git config user.name "Travis CI" >> /dev/null
echo set name
git config user.email "$COMMIT_AUTHOR_EMAIL" >> /dev/null
echo set email

# Commit the "changes", i.e. the new version.
# The delta will show diffs between new and old versions.
git add bitlisten.min.js
echo added file
git commit -m "Deploy to GitHub Pages: ${SHA}" >> /dev/null
echo added commit

# Get the deploy key by using Travis's stored variables to decrypt deploy_key.enc
ENCRYPTED_KEY_VAR="encrypted_${ENCRYPTION_LABEL}_key"
ENCRYPTED_IV_VAR="encrypted_${ENCRYPTION_LABEL}_iv"
ENCRYPTED_KEY=${!ENCRYPTED_KEY_VAR}
ENCRYPTED_IV=${!ENCRYPTED_IV_VAR}
openssl aes-256-cbc -K $ENCRYPTED_KEY -iv $ENCRYPTED_IV -in deploy_key.enc -out deploy_key -d
chmod 600 deploy_key
eval `ssh-agent -s`
ssh-add deploy_key >> /dev/null
echo added ssh key

# Now that we're all set up, we can push.
git push $SSH_REPO gh-pages >> /dev/null
echo pushed
