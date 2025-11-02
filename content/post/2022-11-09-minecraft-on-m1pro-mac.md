---
categories:
- gaming
date: '2022-11-09T22:00:00Z'

seo:
  date_modified: 2022-11-09 22:00:00 -0600
tags:
- minecraft
- gaming
- macbook
- m1 pro
- m1 mac
- m1 chip
- mac gaming
- m1 pro gaming performance
title: Minecraft on M1 Pro Macbook Pro with 16 core GPU
toc: true
---

## Minecraft on Macbook Pro with M1 Pro. Gameplay performance improvement tips

## Intro
I recently got the 2021 Macbook Pro 16 inch with M1 Pro chip. It has been absolute beast for my daily tasks and programming needs. I was apprehensive about the move to ARM mac due to the initial software incompatibility due the new architecture. But software support on ARM has come a long way. All the tools that I need for everyday development are available as native ARM binaries. Battery endurance is unmatched. My previous 2019 Intel Core i7 Macbook Pro used to last me 7-8 hours on average day. This mac easily lasts me 10-12 hours in same usecase scenario. Best thing about the new Mac is the silent operation. I rarely have seen the fan ramp. During long code compilations which run over 10 minutes I see fan ramp up to about 20-25% but that's about it. It's very silent during most of my use.

## Gaming on Mac
Apple Mac machines and Macos is not recognized as an OS to play games. Every mac I have owned has failed miserably to perform well in games on Bootcamp. Apart from the lightweight games and some browser based '.io' games such as agar.io, snake.io, etc. I do not see gaming on Mac worthwhile.

### Minecraft on Macbook
I have been playing Minecraft since the early alpha days. I had a gaming PC from 2011 till it died on me in 2016. The good 'ole AMD Phenom II X6 1090T and AMD Radeon HD 6850 did solid 120+ fps back then in Minecraft.

After switching to Mac fulltime, I had to make some compromises on the performance. I was usually very okay with the downgrade in the gameplay experience as I do not play competitive Minecraft. 2019 Intel Macbook Pro could maintain 60+ fps on native screen with some visual tweaks.

When launching the M1 Pro and M1 Max apple touted the great capabilities of the new chips. Even comparing them to high-end competitor consumer GPU cards. As a casual gamer I did not think of GPU too much as the AMD 5500 Pro was good enough and anything that performed better than Intel 630 is good enough for Minecraft. 

### Installation on M1 mac
Installation was as simple as downloading the launcher from Mojang. I decided to use the microsoft-openjdk JDK. This JDK can be installed via brew. Refer [guide for installing brew on mac](https://abhimanbhau.github.io/aws/macos/setup-oh-my-zsh-macos/). Installed JDK version was openjdk 17.0.5 2022-10-18 LTS.

I used following flags to boot up Minecraft.
```bash
-XX:+UnlockExperimentalVMOptions -XX:+UnlockDiagnosticVMOptions -XX:+AlwaysActAsServerClassMachine -XX:+AlwaysPreTouch -XX:+DisableExplicitGC -XX:+UseNUMA -XX:NmethodSweepActivity=1 -XX:ReservedCodeCacheSize=400M -XX:NonNMethodCodeHeapSize=12M -XX:ProfiledCodeHeapSize=194M -XX:NonProfiledCodeHeapSize=194M -XX:-DontCompileHugeMethods -XX:MaxNodeLimit=240000 -XX:NodeLimitFudgeFactor=8000 -XX:+UseVectorCmov -XX:+PerfDisableSharedMem -XX:+UseFastUnorderedTimeStamps -XX:+UseCriticalJavaThreadPriority -XX:AllocatePrefetchStyle=3 -XX:+UseG1GC -XX:MaxGCPauseMillis=37 -XX:G1HeapRegionSize=32M -XX:G1NewSizePercent=23 -XX:G1ReservePercent=20 -XX:SurvivorRatio=32 -XX:G1MixedGCCountTarget=3 -XX:G1HeapWastePercent=20 -XX:G1ConcMarkStepDurationMillis=5.0 -XX:G1ConcRSHotCardLimit=16 -XX:G1ConcRefinementServiceIntervalMillis=150 -XX:GCTimeRatio=99 -Xmx14g -Xms14g
```
Most important flag is the __+UseG1GC__. This flag enables the high performant G1 garbage collector.

I copied over my existing world to the new Mac. I connected the Mac to my QHD (2560*1440) Samsung Odyssey G5 monitor. I made it the main monitor and had debug console open on the Macbook's built-in display. 

Only settings I modified were to enable fullscreen and increase the visible chunk size to 20. I was surprised to see the results. I was getting consistent ~60fps with some drops to ~50fps. 



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


~160 fps up from ~55 fps, almost 200% increase in performance.

I tried the same test on built-in mac screen with scaled resolution of 1920*1200. Lower resolution obviously resulted in increased fps. 



Again absolutely impressive results. almost ~200 fps.

200 fps playing Minecraft on a laptop primarily meant for development and not gaming. More important, I unplugged the laptop and fps did not change because ARM M1 Pro chip consumes way less power compared to Windows laptops whose performance is gimped as soon as they are unplugged. 

I had huge mob farm near where my player character is standing in the screenshot. I went in a underground mine and I was able to get consistent 300+ fps. 
Here in deep dark, fps averaged about 470. These are phenomenal results for a portable dev machine and overkill for a casual minecrafter like me.



### Shaders in Fabric

Finally I had to try shaders. 

Most of the optifine shaders works as it is on iris/Sodium combo. All the well known shaders worked without a flaw on Mac but debug console was filled with unimplemented shader methods errors. In those cases the rendering fell back onto software leading to massive performance hit.

I found Complementary shaders to be good balance between quality and performance.

I ran complementary shaders on their highest settings and QHD resolution. These are the results



Yes absolutely. As shown above, you can have a great experience on vanilla minecraft and even better experience using the mods listed above. Also, the descent experience while using shaders is cherry on top.

### Is minecraft optimized for M1 ARM macbook?

Minecraft Java edition is written in well, Java. Java being cross platform and JDK being available for long time it was already possible to run Minecraft on M1 ARM mac since the launch. However, Minecraft also has a lot of native code mainly graphics rendering. This however caused severe performance penalty which has improved over the past few months.

## Conclusion

I was deeply amazed by the capability of Macbook Pro's 16 core GPU. Consitent performance across battery/AC power scenario means higher protablity while gaming. Performance after adding the mods is crazy. Overall, I am very satisfied by the performance of M1 Pro mac.
