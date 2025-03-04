---
title: "3tene AutoHotKey"
description: ""
tags: ["AutoHotKey", "Windows", "Pose Estimation"]
publishdate: 2020-09-01
lastmod: 2025-02-09
categories: [
    "ai-projects",
]
weight: 0
---

*Allowing VTubers to express themselves through global hotkeys.*

## Finding VTubing and 3tene
Once the coronavirus pandemic hit and society was in lockdown, I started watching more Twitch. 
Around this time, VTubing was taking off, as people could remain semi-anonymous online while
attempting to grow a following on video-based platforms. The concept was in good fun and not too serious
as you would expect from a mildly popular casual entertainment genre. This was my first look at human 
positional tracking systems, and I was impressed with the underlying technology. The problem often was in
the feature set of the applications used for this growing genre of entertainment, where key features I 
would expect to find in popularly recommended apps seemed to be missing for the technology to 
be used more seriously. 

The app I grew affectionate towards was [3tene](https://3tene.com/). 3tene was primarily meant for facial 
tracking at the time and seemed to have a mix of customizability and community support. When I watched VTubers, 
I noticed that the facial expressions sometimes changed with what they were saying, and I wanted to do 
something like that in 3tene. While the feature existed in the app, I was disappointed that as soon as I 
clicked on another window I could no longer use the shortcut to change my emotion. As a relatively new programmer, 
I wanted to see if I could solve this problem.

Side note: this is not really and AI project. With my post grouping structure, 
this is the only post that did not fall cleanly into a category, so I put it under AI 
as the script extends the abilities of an AI facial tracking app.

## Solving With AutoHotKey

The first thought I would expect most people to have comes down to: "Windows says 'No' and 3tene says 'No' so you 
can't program your way out of it." That is a pretty fair response, as I can't edit either of these pieces of software 
myself, and creating a stand-alone app, which is all I knew how to do, does nothing in this problem. I only knew Java 
and Unity, and nothing that I had learned in school felt like it could help me in any way. Thinking about 
how to solve the problem, an old Tom Scott video came into mind for how to create duct-tape solutions in Windows. 
[The Art of the Bodge: How I Made The Emoji Keyboard](https://youtu.be/lIFE7h3m40U) seemed to use 
[AutoHotKey](https://www.autohotkey.com/) (AHK) for a similar type of otherwise impossible solution I was looking for. 
There was good documentation for everything I could need and there was enough of a user base to find all of the questions I had online. 

## Implementation

As a novice programmer, I searched through Google to find something in AHK that could send keystrokes from anywhere on the
desktop into an application. The solutions online often did not work, as `ControlSend` did not send the update to 3tene 
unless the window was first focused. 3tene didn't like the num pad much, which was annoying because that was how I assumed most
users would control their avatar. I found a working solution though over the course of a day or two and simply copied and pasted the 
five lines a dozen times over to create a key bind for each number on the num pad. The solution worked, and that's all 
that needed to matter as a new developer.

## Publishing

Once I wrote the script and verified that everything worked, I posted about it on  
[r/VirtualYoutubers](https://www.reddit.com/r/VirtualYoutubers/comments/ikxoq1/solution_to_using_hotkeys_without_focus_on_3tene/)
and 3tene's [Steam Page](https://steamcommunity.com/app/871170/discussions/0/2945872608881921166/). I got a few upvotes and 
comments saying thanks, and I was happy that someone else was benefiting from what I made.

A few months later, I found out that a YouTube video by Blossom Baphomet had made a tutorial on my script.
To my surprise, the video has garnered over 1.7 thousand views since its release, 
exceeding all of my expectations for its reach when I first created it.

Blossom Baphomet delisted her videos on her channel, 
but I was granted permission to link the video for this post.

{{< youtube OO6NMm2qoB8 >}}

## Retrospective

As this was the first software project I published on GitHub, I had some difficulties. The biggest issue I see looking 
back on the project was the README file, as I treated it more like a dev log + instructional essay rather than a clear 
and concise document for readers. I also should have tried harder for the script to be more user-friendly. 
While the code is not long, users needed to input the shortcuts they want directly into the script, 
and the code block needed to be copied each time the user wanted to add a new emotion to their character. 
I should have made the code block into a function, and making the variables the user inputs into 
a single data structure to manipulate. 

As I had effectively been self-taught via online classes and was completely unaware of coding outside of the 
Eclipse Editor and the Unity engine, this project greatly expanded what I saw to be possible with programming. 
Looking back, it was likely very beneficial to my outlook on software development that such a unique 
problem and solution was the my first published project. It allowed me to be much more innovative when 
creating project ideas, which in my opinion shows in the novelties of RoundHouse, Unified Live Chat, and FreeMoveVR.

## Rewrite

As part of this post, I decided I wanted to re-write the script with these edits in mind and see if my 
original code even worked on modern software. Since its release, Windows 11 came out, AHK v2.0 was released, 
and 3tene had many small updates over the years. When I tested it on AHK v1.1, to my surprise it actually 
worked completely! AHK and Windows both pride themselves on backward completely, and there were never any 
big overhauls in 3tene. I still wanted to make my changes so I started working on a AHK v2.0 version of the script. 

To start the re-write, the list of shortcuts was turned into a map, where users only needed to change one line to add their 
key binds rather than copy and paste five lines and edit small components inside the code block. I added 
some additional examples in the comments after the map for non-technical users in case they wanted to use the control, alt, 
or shift in their key binds. Then, it was as simple as creating a function that directs input into the 
window and sends the appropriate button, and then creating a for loop to apply the function to each hotkey in the map.

I wanted to make sure that my README instructions also improved, so after re-writing, I had a non-technical friend 
read over it and try to follow it. My friend may have been a bit *too* non-technical, but from the exercise, 
we cleaned up some ambiguities in the instructions. Additionally, a popup was added when the user enabled or disabled
the script for visual feedback that it was working. 

This is the first real project I made intended for others to use, and despite its size, 
it holds a special place in my heart and defines how I approach software development to this day.

The repo is available at https://github.com/Jaspann/3tene-AutoHotKey.
