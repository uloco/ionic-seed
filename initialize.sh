#!/usr/bin/env bash

# Install dev dependencies
#npm install

# Install libs
#bower install

# Restore ionic platforms + plugins
gulp copy-files babelEs6

ionic state restore

# Generate icons and splash
mkdir -pv resources
cp icon.png splash.png resources/
#cp splash.png resources/
ionic resources

