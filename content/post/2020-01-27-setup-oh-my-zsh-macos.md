---
categories:
- AWS
- macOS
date: '2020-01-27T21:34:00Z'
seo:
  date_modified: 2020-06-08 20:28:12 -0500
tags:
- AWS
- macOS
- terminal
- zsh
- Amazon
- akolte
- howto
title: macOS Oh-my-zsh installation guide
toc: true
---

## Setup oh-my-zsh for macOS to improve your terminal experience

This guide will walk you through setting up **oh-my-zsh** on **macOS** to significantly enhance your terminal experience. We'll cover installing **Homebrew**, setting up **iTerm2**, and configuring **oh-my-zsh** with a custom theme and plugins.

### Install **Homebrew**

1. Run this command in terminal

```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

2. It will ask you to install macOS developer tools. Accept the terms and proceed.
3. It will take a while to finish installing homebrew.
4. Make sure you Homebrew installation succeeded by running following command

```bash
brew --version
```

### Install oh-my-zsh

1. Install iterm2 to replace standard terminal

```bash
brew install iterm
```

2. Install custom font to enhance your terminal experience
   [Few font recommendations](https://www.slant.co/topics/7014/~fonts-to-use-in-a-terminal-emulator)
3. Go to iterm2 preferences -> Profiles -> Text to select your new font.
4. Install **oh-my-zsh**:
   1. Update your **zsh** to the latest version from **Homebrew**:
      ```bash
      brew install zsh
      ```
   2. Change your default shell to **zsh**:
      ```bash
      chsh /bin/zsh
      ```
   3. Install "oh-my-zsh" [Follow instructions](https://ohmyz.sh/)
   4. Install the **Pure** theme:
      ```bash
      cd  ~/.oh-my-zsh/custom  &&  \
      git clone  https://github.com/sindresorhus/pure && \
      ln  -s  pure/pure.zsh-theme  .  &&  \
      ln  -s  pure/async.zsh  .
      ```
   5. Set the **Pure** theme to launch on startup:
      ```bash
      vim ~/.zshrc
      # Set ZSH_THEME to ZSH_THEME=refined
      ```
5. Install optional zsh packages using 'brew install package-name'

*   `zsh-autosuggestions`
*   `zsh-completions`
*   `zsh-git-prompt`
*   `zsh-history-substring-search`
*   `zsh-lovers`
*   `zsh-navigation-tools`
*   `zsh-syntax-highlighting`
### This is how my setup looks

1.  **iTerm2**
2.  **Color scheme** [iterm2-Snazzy](https://github.com/sindresorhus/iterm2-snazzy)
3.  [**Hermit Font**](https://pcaro.es/p/hermit/)
