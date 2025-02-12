---
title: "Pond Jumper"
description: "My First Large Project: an Arcade Game for Smart Phones."
tags: ["C Sharp", "Unity", "Google Play"]
publishdate: 2020-03-01
lastmod: 2025-02-09
categories: [
    "mobile-projects",
]
---

*My First Large Project: an Arcade Game for Smart Phones.*

Looking back at how I first learned software development, I feel very fortunate to have taken the path I did.
In my junior year of high school I took [AP Computer Science A](https://apstudents.collegeboard.org/courses/ap-computer-science-a), 
which was taught extremely thoroughly on [VLACS](https://vlacs.org/) and 
is probably the best course I took in high school despite it being online. My senior year I needed to do a senior 
project, and for this, I decided to re-implement an idea I had made previously, reimagining it using [Unity](https://unity.com/). 

{{< figure src="/past-projects/pond_jumper/pond_jumper_home.png" 
    caption="The Pond Jumper Title Screen.">}}

## Game Inspiration
At that time I had recently played [Undertale](https://undertale.com/). The main action of the game is a bullet-hell system where you control 
a small character that needs to move and avoid obstacles. While many aspects of Undertale are unique, a core part of 
the game focuses on special mechanics in boss battles. During these scenes, the normal rules of the fights change and the 
novelty of additional rules applied to the core bullet-hell mechanic are explored and become more complex throughout the battle. 

Two of the concepts I had wished there were more of were in the middle of the game, in the Undyne and Muffet battles. The 
Undyne battle complexly changed the idea of a bullet-hell, where instead of avoiding the bullets, you had a shield and needed 
to block them. The Muffet battle had the player jumping between pre-defined tracks to avoid the bullets which differed from the normal 
game where you have complete control over the movement of your character to any point within the arena.

{{< figure src="/past-projects/pond_jumper/undyne_fight.png" 
    caption="The Undyne Fight in Undertale. Image source: DualShockers">}}

<div style="margin: 2rem 0;"></div>

{{< figure src="/past-projects/pond_jumper/muffet_fight.png" 
    caption="The Muffet Fight in Undertale. Image source: Very Vennie">}}

While many bullet-hell styled games did exist, these takes on the genre rarely seemed to have been expanded upon.

## Early Attempt
For a introductory computer class I took in high school my sophomore year, we were required to create a game in 
[Scratch](https://scratch.mit.edu/). At that time, I had wanted to learn to code, but genuinely had no clue about 
how to get started with programming. I was excited to show what I could do in code if I was able to write, 
so I worked tirelessly to create the game I was imagining. 

I wanted to combine the concepts of the Undyne and Muffet fights into one. Instead of three tracks like Muffet, 
I made it a 5x5 grid where the player jumps between cells. I then took the idea of the Undyne fight, and made some bullets 
able to be blocked by a shield that rotated around the player. Additionally, some bullets were not able 
to be blocked so the player needed to both move around and block to survive. The game is still playable on Scratch as
"[5x5 Bullet Avoid Game](https://scratch.mit.edu/projects/214045899/)" by WillPar. I definitely over-achieved in the
assignment, and I think I got a 98% if I recall correctly. The teacher took off 2 points because I did not specify 
in the instructions that by WASD I was referring to the keys on the keyboard to move the character (she was an art teacher
and not well-versed in technology).

{{< figure src="/past-projects/pond_jumper/scratch_game.png" 
    caption="My first game on Scratch.">}}

## Pond Jumper
Back to the start of my senior year in high school and I knew I wanted to make a game in Unity. I understood that C# was close
to Java, and I knew Java well from taking AP Computer Science A the previous year. I had a few ideas but none of them stuck as well
as taking another shot at my bullet-hell idea. This time I wanted to make it 3D, with better graphics, and playable on mobile with swiping 
as the main input method. I would call the app "Pond Jumper", and theme the game around a character with a shield blocking birds while
jumping between lily pads on a pond.

This was my first time writing code other than in Java for a class, and I was surprised about how easily the language concepts from Java were 
able to transfer to this project. The biggest change was that I was using a framework for the first time, and while I didn't completely 
understand some of the parts of the framework and all of the new options presented to me, I found that creating a game was probably the 
best way for me to be introduced to the concept of a framework. Coding tutorials for games are some of the most common types of coding 
tutorials, and extremely high-quality sources exist like [Brackeys](https://www.youtube.com/channel/UCYbK_tjZ2OrIZFBvU6CCMiA) on YouTube. 
These early lessons about working with the framework I found to not really be taught in college, but a critical part of knowing how to build 
any sort of real application.

I decided to use prebuilt assets from the Unity Asset Store. I had made clear that I was building the app as an exercise in programming, 
and not for the artistic side, so this was fine to do. There was also no sound, but the prebuilt assets did have animations for when 
the player died at least.

{{< figure src="/past-projects/pond_jumper/pond_jumper_game.png" 
    caption="A screenshot of Pond Jumper mid-game.">}}

The programming for the game honestly was not bad in comparison to all of the work I needed to do for AP Computer Science A, and despite 
having an incredible senior project for the school it felt like the coding was easy for what I was doing. It heavily relied on 
timers to know when to spawn bullets, or now birds to match the theme with my assets, and to properly give points to the player. I needed to 
keep track of the birds despawning once they were out of range of the camera, and I made a predefined jump script for the character so that it 
always looked like it was on a grid tile, or now lily pad for movement. I learned about game balancing, making sure that the game became more 
difficult as the game went on so that it would not be endlessly boring, and added additional assets to the game so it was interesting to look at.

The final component of the project was releasing the app to the Google Play Store. I chose to only release to the Play Store, 
as I had an Android phone, and that Google has a one-time cost to publish compared to the yearly cost on iOS. The publishing process was 
much easier back then than it is today. Google now requires 20 beta testers before launch, but that requirement did not exist 
at all in 2020. Additionally, Unity had clear instructions on how to build the game to be published to the Play Store, and I learned how to 
publish to the platform.

Over time, I forgot to check the email associated with the project. Unity deleted the cloud backup of the project 
and the Play Store took down the game due to inactivity. While there is not much of a record of the game anymore, 
the app can still be downloaded from mirror sites like on APK Pure from the link below:

https://apkpure.com/pond-jumper/com.WilliamParker.PondJumper
