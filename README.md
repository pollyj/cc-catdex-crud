# Catdex -- A fun REST-ful CRUD API for cat lovers 🐱🥰

This was created during my time as a student at Code Chrysalis.

**Catdex** is an app to keep track of all your favourite cats and what their favourite things are.

## Introduction

1. To get started, clone the repo to a local directory.
   ```bash
   git clone repo link
   ```
2. Install the packages.
   ```bash
   yarn install
   ```
3. Set up the local database.
   ```bash
   echo "CREATE DATABASE cat_api;" | psql
   ```
4. Run the migrations and seed files to create tables and populate the database.
   ```bash
   yarn migrate && yarn seed
   ```
5. Start the database server. The default port is set to localhost:3000.
   ```bash
   yarn server
   ```
6. Play with your cats! 😻
