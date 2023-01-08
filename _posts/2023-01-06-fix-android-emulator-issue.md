---
title: Fix AVD emulator process has terminated
date: 2023-01-06 18:30:00 -0600
categories: [Android]
tags: [Android, avd, android, development, android avd manager, android studio issue, android emulator windows issue]
toc: true
seo:
  date_modified: 2020-01-06 18:30:00 -0600
---

## Fix AVD Emulator process has terminated issue on Windows 11

I recently installed the Android Studio on my new Windows 11 installation and I had the following issue that prevented me from launching the Android Emulator and debugging my app on it. I used the default settings of the Android Studio during the installation. I also used the latest Android Tiramisu(API level 33) Play Services AVD image.
I created a sample app with basic activity and tried to build and debug it using Android Emulator. I received the following error.

![issue](https://res.cloudinary.com/abemurica/image/upload/v1673149724/android/android_avd_issue_pc3nxw.png)

I tried basic troubleshooting such as killing the Emulator process from task manager (qemu.exe). Restarting Android Studio and finally restarting my PC. None of these worked for me. I still got this issue.

### Root cause of the problem.

1. Found the log file that IntelliJ IDE writes to. It is located at. C:\Users\<USER>\AppData\Local\Google\AndroidStudio2021.3\log\idea.log
2. Found following lines in the log just before the AVD process died. 
   ```
   Emulator: API33_PLAY - Failed to sync vcpu reg 
   ```

There's two ways to solve this problem.

### Solution 1: Install correct version of Intel HAXM

1. Uninstall the Intel HAXM from control panel and reinstall the one offered by Android SDK. This is necessary because Android images still use the very old HAXM/QEMU format. If you have HAXM installed from the GitHub version(latest) or anywhere else, Uninstall that from control panel.
2. Open the Android SDK manager. It will still show the Intel HAXM as installed. To fix that, uncheck and click apply. It will proceed and say Intel HAXM is already uninstalled. Once finished, check the Intel HAXM and hit apply. This time it will install the supported Intel HAXM version. Once you have that installed. Restart the PC and AVD will start working.

### Solution 2: Stop any running VMs

1. This one is weird because even after I had the right Intel HAXM version installed I still was seeing the same issue as above.
2. Solution is to stop any running VMs from the PC. I forgot I had a KUbuntu VM running in VirtualBox. I had power it off for the AVD to boot up.
3. Note that if you have any docker running, you will have to stop that as well.