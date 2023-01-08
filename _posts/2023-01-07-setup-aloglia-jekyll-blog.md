---
title: Setup Algolia Search for Jekyll Github pages blog on Github
date: 2023-01-06 16:00:00 -0600
categories: [github]
tags: [jekyll, github, jekyll blog, algolia search setup jekyll, jekyll github pages, minimal mistakes algolia]
toc: true
seo:
  date_modified: 2023-01-07 16:00:00 -0600
---

## Setup Algolia search on GitHub for a Jekyll blog

### Setup Algolia account

1. Create an Algolia account. I created an account using my GitHub account.
2. Create your first application on the Algolia dashboard.
3. Free tier should be enough for personal blog purpose.
4. Make note of the application ID, index name and API keys. We will need them later.

### Setup Jekyll blog on GitHub

1. Setting up a Jekyll blog is very easy using GitHub pages.
2. Create a repo with name in format: <github_username>.github.io
3. Anything in this repo will be published to the internet at <github_username>.github.io address.
4. To setup a basic blog follow the instructions here at [docs](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/creating-a-github-pages-site-with-jekyll).
5. I personally use the minimal mistakes Jekyll theme for this blog as it has Algolia search well integrated by default and doesn't require any extra setup. More at [Minimal Mistakes](https://mmistakes.github.io/minimal-mistakes/)

#### Setup Algolia search config for the blog

1. In the _config.yml of your blog add following code. Replace the placeholders with appropriate values.

```yaml
search_provider: algolia
algolia:
  application_id: APP_ID>
  index_name: search_index
  search_only_api_key: KEY # YOUR_SEARCH_ONLY_API_KEY
  files_to_exclude:
    - _pages/cookies.md
    - _pages/privacy.md
```

> Make sure you use the search only API key and not the ADMIN API key.

#### Setup GitHub actions to build and push the Index

1. Create *.github* directory in root of your blog. 
2. Create another *workflows* directory inside the newly created *.github* directory.
3. In this directory we will create the GitHub actions which will be triggered on every commit. 
4. Create a yaml file for the actions and add the following code to it. I named mine 'jekyll-gh-pages.yml'.

```yaml
on:
  push:
    branches:
      - main
      - master

name: algolia-search
jobs:
  algolia-search:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: ruby/setup-ruby@v1
        with:
          ruby-version: '3.1'
          bundler-cache: true  
      - name: Algolia Jekyll Bootstrap
        uses: abhimanbhau/algolia-jekyll-bootstrap@v1
        with:
          API_KEY: '${{ secrets.ALGOLIA_API_KEY }}'
```

5. This action uses **algolia-jekyll-bootstrap** that I wrote sometime back. It sets up Ruby runner and runs Algolia index build and push. You can view the source for this action at [algolia-jekyll-bootstrap@github](https://github.com/abhimanbhau/algolia-jekyll-bootstrap)

#### Setup Algolia credentials.

1. In the settings page for your GitHub repo, add a new key under Secrets > Actions.
2. Create a new key named 'ALGOLIA_API_KEY' and add ADMIN API key as the value.
3. This key will be hidden from the GitHub repo.

#### Commit and test the search

1. Create a new post under *_posts* directory and commit the post.
2. Head over to the GitHub repo page. In the actions you should see two actions being triggered. One is the default GitHub pages deployment and second one is the new Algolia-search action.
3. Click on the Algolia-search action and see the progress. Check for any errors or warnings. 

You can head on to the blog after it is finished deploying and test the search. It will show powered by Algolia and will be super fast.

You can also head over to your Algolia dashboard for the app and check the index for the number of entries.

Good luck.
