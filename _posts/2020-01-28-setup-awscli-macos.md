---
title: macOS awscli setup guide
date: 2020-01-28 18:30:00 -0600
categories: [AWS, macOS]
tags: [AWS, macOS, terminal, zsh, Amazon, akolte, howto]
toc: true
seo:
  date_modified: 2020-06-08 19:27:30 -0500
---

## macOS aws-cli setup guide

> ##### _Note:_
>
> Please follow my other guide on setting up oh-my-zsh and homebrew before proceeding by [clicking here](https://abemurica.github.io/posts/setup-oh-my-zsh-macos/)

### Install AWS-CLI

1. Run following command to install aws-cli

```bash
brew install awscli
```

2. Verify you awscli installation by running

```bash
aws --version
```

3. Add this line to end of your .zshrc by running

```bash
vim ~/.zshrc
```

> source /usr/local/share/zsh/site-functions/\_aws

4. You should now be able to access autocomplete fucntionality by pressing tab key.
