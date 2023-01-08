---
title: Increase Minecraft FPS on Macbook Pro M1 chip
date: 2023-01-06 22:00:00 -0600
categories: [gaming]
tags: [minecraft, gaming, macbook, m1 pro, m1 mac, m1 chip, mac gaming, m1 pro gaming performance, increase m1 mac fps, increase minecraft fps m1 macbook]
toc: true
seo:
  date_modified: 2023-01-07 22:00:00 -0600
gallery:
  - image_path: https://res.cloudinary.com/abemurica/image/upload/v1671590737/minecraft_mac/2022-11-09_18.07.06_toelqf.png
    url: https://res.cloudinary.com/abemurica/image/upload/v1671590737/minecraft_mac/2022-11-09_18.07.06_toelqf.png
  - image_path: https://res.cloudinary.com/abemurica/image/upload/v1671590737/minecraft_mac/2022-11-09_18.23.42_grst3f.png
    url: https://res.cloudinary.com/abemurica/image/upload/v1671590737/minecraft_mac/2022-11-09_18.23.42_grst3f.png
  - image_path: https://res.cloudinary.com/abemurica/image/upload/v1671590737/minecraft_mac/2022-11-09_21.04.19_ddnicn.png
    url: https://res.cloudinary.com/abemurica/image/upload/v1671590737/minecraft_mac/2022-11-09_21.04.19_ddnicn.png
  - image_path: https://res.cloudinary.com/abemurica/image/upload/v1671590737/minecraft_mac/2022-11-09_21.10.12_ys4h8q.png
    url: https://res.cloudinary.com/abemurica/image/upload/v1671590737/minecraft_mac/2022-11-09_21.10.12_ys4h8q.png
  - image_path: https://res.cloudinary.com/abemurica/image/upload/v1671590737/minecraft_mac/2022-11-09_18.18.38_fpcugp.png
    url: https://res.cloudinary.com/abemurica/image/upload/v1671590737/minecraft_mac/2022-11-09_18.18.38_fpcugp.png

---

## How to increase Minecraft FPS and improve performance on Apple MacBook Pro with M1 Chip

### Installation on M1 mac

To install the game, I downloaded the launcher from Mojang. I also chose to use the Microsoft-openjdk JDK, which can be installed through brew (refer to the guide at the provided link for instructions on how to install brew on a Mac). The installed JDK version was openjdk 17.0.5 2022-10-18 LTS. [guide for installing brew on mac](https://abhimanbhau.github.io/aws/macos/setup-oh-my-zsh-macos/).

Use following JVM flags in the launcher. 

```bash
-XX:+UnlockExperimentalVMOptions -XX:+UnlockDiagnosticVMOptions -XX:+AlwaysActAsServerClassMachine -XX:+AlwaysPreTouch -XX:+DisableExplicitGC -XX:+UseNUMA -XX:NmethodSweepActivity=1 -XX:ReservedCodeCacheSize=400M -XX:NonNMethodCodeHeapSize=12M -XX:ProfiledCodeHeapSize=194M -XX:NonProfiledCodeHeapSize=194M -XX:-DontCompileHugeMethods -XX:MaxNodeLimit=240000 -XX:NodeLimitFudgeFactor=8000 -XX:+UseVectorCmov -XX:+PerfDisableSharedMem -XX:+UseFastUnorderedTimeStamps -XX:+UseCriticalJavaThreadPriority -XX:AllocatePrefetchStyle=3 -XX:+UseG1GC -XX:MaxGCPauseMillis=37 -XX:G1HeapRegionSize=32M -XX:G1NewSizePercent=23 -XX:G1ReservePercent=20 -XX:SurvivorRatio=32 -XX:G1MixedGCCountTarget=3 -XX:G1HeapWastePercent=20 -XX:G1ConcMarkStepDurationMillis=5.0 -XX:G1ConcRSHotCardLimit=16 -XX:G1ConcRefinementServiceIntervalMillis=150 -XX:GCTimeRatio=99 -Xmx14g -Xms14g
```

The most important flag to consider is "+UseG1GC", as it enables the high-performing G1 garbage collector. 

I transferred my existing game world to the new Mac and connected it to a QHD Samsung Odyssey G5 monitor, making it the main display while keeping the debug console open on the Macbook's built-in screen. The only changes I made to the settings were enabling fullscreen mode and increasing the visible chunk size to 20.

I was pleasantly surprised to see that the game consistently ran at around 60fps, with some slight dips to 50fps.

![Minecraft default gameplay QHD](https://res.cloudinary.com/abemurica/image/upload/v1671590737/minecraft_mac/2022-11-09_18.07.06_toelqf.png "Stock gameplay")

> Note: bringing up f3 debug menu drops the fps.

60fps on QHD is a descent gaming experience. I was happy but I still wanted to experiment and see if the performance could be further improved.

### Fabric for Minecraft
[Fabric](https://fabricmc.net) is a lightweight, experimental modding toolchain for Minecraft. Similar to Forge, Fabric allows mods to be installed which are developed to work with Fabric. I prefer Fabric over Forge because it's lightweight and not bloated like Forge. 

I use [Modrinth](https://modrinth.com) to download the mods from. It's clean compared to bloated and non-intuitive curseforge. 

Following are the mods I installed in my Fabric profile in the Mincraft launcher.
1. BetterF3: For colored and concise f3 debug menu
2. c2me: Fabric mod designed to improve the performance of chunk generation, I/O, and loading
3. Cull leaves: Adds culling to leaf blocks, providing a huge performance boost over vanilla.
4. Entity culling: Using async path-tracing to skip rendering Block/Entities that are not visible.
5. FerriteCore: This mod reduces the memory usage of Minecraft in a few different ways.
6. Indium: Indium is an addon for the rendering optimisation mod Sodium, providing support for the Fabric Rendering API.
7. Sodium: Sodium is a free and open-source rendering optimization mod for Minecraft 1.16+ which greatly improves frame rates and stuttering while fixing many graphical issues.
8. iris: Shader support for Sodium. This enables support for Optifine shaders to work with Sodium under Fabric.
9. LazyDFU is an optimization mod for Minecraft that defers unnecessary initialization work so that it is only performed if required.
10. Lithium: Lithium is a modern, general-purpose optimization mod for Minecraft which works to improve a number of systems (game physics, mob AI, block ticking, etc) with the goal of not changing any vanilla mechanics.
11. More Culling: A mod that changes how multiple types of culling are handled in order to improve performance
12. Reese's Sodium options: Replaces Sodium's Options Screen with intention of improving UX
13. Sodium Extra: Extra features for Sodium
14. Starlight: Fabric mod for rewriting the light engine to fix lighting performance and lighting errors.
15. Visuality: This is a simple client-sided cosmetic mod that will add a bunch of new particles such as crystal sparkles, particles on mob hitting, custom blob particles for slimes, environmental particles to your Minecraft world. This mod actually adds slight performance penalty but the visual eye-candy outweighs the framerate loss.
> All the dependencies for the above mods were installed wherever necessary.


I did not tweak any settings for any off the mods.

__Results are mindblowing__

These are the results on QHD monitor. Same setup from stock gameplay test.
![QHD after mods](https://res.cloudinary.com/abemurica/image/upload/v1671590737/minecraft_mac/2022-11-09_18.23.42_grst3f.png "QHD modded fps")

~160 fps up from ~55 fps, almost 200% increase in performance.

I tried the same test on built-in mac screen with scaled resolution of 1920*1200. Lower resolution obviously resulted in increased fps. 

![HD+ result](https://res.cloudinary.com/abemurica/image/upload/v1671590737/minecraft_mac/2022-11-09_21.04.19_ddnicn.png "HD+ results")

The performance was once again impressive, with an average of nearly 200 fps while playing Minecraft on a laptop primarily used for development rather than gaming. 

Even more impressive, the fps remained stable even when the laptop was unplugged, thanks to the power-efficient ARM M1 Pro chip. While exploring a large mob farm and underground mine, I consistently achieved fps of 300+ and 470, respectively. 

These are exceptional results for a portable development machine and more than sufficient for a casual Minecraft player like myself.

![test in deep dark](https://res.cloudinary.com/abemurica/image/upload/v1671590737/minecraft_mac/2022-11-09_21.10.12_ys4h8q.png "deep dark fps")

### Shaders in Fabric

I was eager to try out shaders, and was pleased to find that most Optifine shaders worked well with the Iris/Sodium combination. However, I noticed that the debug console was filled with errors about unimplemented shader methods, which caused the rendering to fall back to software and resulted in a significant decrease in performance.

After experimenting with different shaders, I found Complementary shaders to be a good balance between quality and performance. I tested these shaders at their highest settings and with a QHD resolution, and the results were as follows.

![Shader on QHD](https://res.cloudinary.com/abemurica/image/upload/v1671590737/minecraft_mac/2022-11-09_18.18.38_fpcugp.png "Shader on QHD")

{% include gallery caption="Minecraft gaming on M1 Pro mac" %}