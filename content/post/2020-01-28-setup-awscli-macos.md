---
categories:
- AWS
- macOS
date: '2020-01-28T18:30:00Z'
seo:
  date_modified: 2020-06-08 19:27:30 -0500
tags:
- AWS
- macOS
- terminal
- zsh
- Amazon
- akolte
- howto
title: macOS awscli setup guide
toc: true
---

## macOS aws-cli setup guide

This guide provides a comprehensive walkthrough for setting up the **AWS Command Line Interface (CLI)** on **macOS**. The **AWS CLI** is an open-source tool that enables you to interact with **AWS** services using commands in your command-line shell. This setup will also cover enabling autocomplete functionality for **zsh**.

> ##### _Note:_
>
> Please follow my other guide on setting up oh-my-zsh and homebrew before proceeding by [clicking here](https://abemurica.github.io/posts/setup-oh-my-zsh-macos/)

### Install **AWS-CLI**

1. Run following command to install aws-cli

```bash
brew install awscli
```

2. Verify you awscli installation by running

```bash
aws --version
```

3. Add this line to the end of your `~/.zshrc` file by running:

```bash
vim ~/.zshrc
```

> `source /usr/local/share/zsh/site-functions/_aws`

4. After sourcing the file, you should now be able to access autocomplete functionality by pressing the `Tab` key.
