#!/usr/bin/env bash

# Install dev dependencies
npm install

# Install libs
bower install

# Restore ionic platforms + plugins
ionic state restore

# Generate icons and splash
mkdir resources
cp -t resources/ phonegap/icon.png phonegap/splash.png
ionic resources

