---
title: "3tene AutoHotKey"
description: ""
tags: ["AutoHotKey", "Windows", "Pose Estimation", "Bodge"]
publishdate: 2020-09-01
lastmod: 2025-02-09
categories: [
    "past-projects",
]
draft: true
---

*Allowing VTubers to express themselves though emotion hotkeys.*

## Finding VTubing and 3tene
Once the coronavirus pandemic hit and society was in lock down, I started watching more Twitch. 
Around this time was when VTubers were taking off, as people could remain semi-anonymous online while
attempting to grow a following on video based platforms. The concept was in good fun and not too serious
as you would expect from a mildly popular casual entertainment genre. This was my fist look at human 
positional tracking systems, and I came to the conclusion that while the underlying technology was good, 
some key features I would expect seemed to be missing from apps for people to use this seriously. 

The app I grew affectionate towards was [3tene](https://3tene.com/). 3tene was primarily meant for facial 
tracking at the time, and seemed to have a mix of good UI with customizability. When I watched VTubers, 
I noticed that the facial expressions sometimes changed with what they were saying, and I wanted to do 
something like that in 3tene. While the feature existed in the app, I was disappointed that as soon as I 
clicked on another window I could no longer use the shortcut to change my emotion. As a relatively new programmer, 
I wanted to see if I could solve this problem.

## Solving With AutoHotKey

The first thought I would expect most people to have comes down to: "Windows says 'No' and 3tene says 'No' so you 
can't program you way out of it." That is a pretty fair response, as both of these pieces of software I can't 
edit myself and creating a stand alone app, which is all I knew how to do, does nothing in this problem. Thinking about 
how to solve the problem, an old Tom Scott video came into mind for how to create duct-tape solutions in Windows. 
[The Art of the Bodge: How I Made The Emoji Keyboard](https://youtu.be/lIFE7h3m40U) seemed to use 
[AutoHotKey](https://www.autohotkey.com/) for a similar type of otherwise impossible solution I was looking for. 
There was good documentation for everything I could need and there was enough of a user base to find all of the questions I had online. 

## Publishing

Once I wrote the script and verified that everything worked, I posted about it on  
[r/VirtualYoutubers](https://www.reddit.com/r/VirtualYoutubers/comments/ikxoq1/solution_to_using_hotkeys_without_focus_on_3tene/)
and 3tene's [Steam Page](https://steamcommunity.com/app/871170/discussions/0/2945872608881921166/)

While there didn't seem to be many people interested in the solution via my posts, 
a YouTube video tutorial was created by a VTuber that had this problem which gained over 1.7 thousand views since posting. 

## Retrospective

As this was my first software project I published on GitHub, I had some difficulties. The biggest issue I see looking 
back on the project was the README file, as I treated it more like a dev log + instructional essay rather then a clear 
and concise document for readers. I also should have tried harder for the script to be more user-friendly. 
While the code is not long, users needed to input the shortcuts they want directly into the script, 
and the code block needed to be copied each time the user wanted to add a new emotion to their character. 
I should have looked into making the code block into a function, and making the variables the user inputs into an 
array with some pre-set values commented out. 

As I had effectively been self taught and completely unaware of coding outside of the Eclipse Editor and the Unity engine, 
it greatly expanded what I saw to be possible with programming. Looking back, it was likely very beneficial that such a unique 
problem and solution was the my first published software project, it allowed me to be much more innovative when creating project 
ideas, which in my opinion shows in the novelties of RoundHouse, Unified Live Chat, and FreeMoveVR.

TODO: Update the script and README to be up to standards
