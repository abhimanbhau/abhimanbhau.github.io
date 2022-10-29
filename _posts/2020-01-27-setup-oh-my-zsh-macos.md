---
title: macOS Oh-my-zsh installation guide
date: 2020-01-27 21:34:00 -0600
categories: [AWS, macOS]
tags: [AWS, macOS, terminal, zsh, Amazon, akolte, howto]
toc: true
seo:
  date_modified: 2020-06-08 20:28:12 -0500
---

## Setup oh-my-zsh for macOS to improve your terminal experience

### Install Homebrew

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
4. Install 'oh-my-zsh'.
   - Update your zsh to latest version from Homebrew
   ```bash
   brew install zsh
   ```
   - Change you default shell to zsh
   ```bash
   chsh /bin/zsh
   ```
   - Install "oh-my-zsh" [Follow instructions](https://ohmyz.sh/)
   - Install pure theme
   ```bash
   cd  ~/.oh-my-zsh/custom  &&  \
   git clone  https://github.com/sindresorhus/pure && \
   ln  -s  pure/pure.zsh-theme  .  &&  \
   ln  -s  pure/async.zsh  .
   ```
   - Set pure theme to launch on startup
     ```bash
     vim ~/.zshrc
     # Set ZSH_THEME to ZSH_THEME=refined
     ```
5. Install optional zsh packages using 'brew install package-name'

```bash
zsh-autosuggestions           zsh-lovers
zsh-completions               zsh-navigation-tools
zsh-git-prompt                zsh-syntax-highlighting
zsh-history-substring-search
```

### This is how my setup looks

![Screenshot](https://res.cloudinary.com/abemurica/image/upload/v1667008023/misc/Screen_Shot_2022-10-28_at_6.46.49_PM_ckbpl6.png)

1. iTerm2
2. Color scheme [iterm2-Snazzy](https://github.com/sindresorhus/iterm2-snazzy)
3. [Hermit Font](https://pcaro.es/p/hermit/)
