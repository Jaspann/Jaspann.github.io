---
title: "Eventified"
description: "An Android calendar app for school clubs."
tags: [Android, Java, AWS, Python, XML, API, SNHU]
publishdate: 2021-12-01
lastmod: 2025-02-15
categories: [
    "mobile-projects",
]
draft: true
---

*An Android calendar app for school clubs.*

## Arriving at SNHU
It was my first semester on campus at Southern New Hampshire University (SNHU). 
Covid was the year prior, so my class along with the cohort below me was new to the campus.
I had experience with Java in my high school and even [taught the AP course on it](post/community-work/ap-comp-sci-a-ta).
They also taught Java in the first coding class of SNHU, 
so going into my second year I figured I would want to use it in team based projects.

SNHU is unique in that, even though the degree says I have a computer science degree, 
it is taught much more like how I would imagine a software engineering degree to be taught.
Each semester (or year) you are put with a group to build a single project. It is a great exercise in 
working as a software development team, developing using agile, using issue tracking boards, 
and the teacher acts similar to a project manager. 

I quickly realized, that, because of my extra AP credits moving me ahead in the graduation schedule, 
I was placed in an extremely small class with all the students that either were like me and got 
ahead somehow or fell behind over the pandemic. 

## Creating the Idea
My favorite part of the software engineering series of classes had to be the 
start of the semester when we pitch our ideas. Students can choose almost anything they want
as long as it is within the teacher's permission. It can be any problem, using any language or 
framework, and as long as you pitch well and can prove that the goal is achievable within the year, 
it is likely that you will get a team to work on the project with you.

As a new student on campus, I had been extremely confused with how to engage in the community. 
Club events often felt like they were not communicated well, and I felt like I missed out on a lot
after I did not get all the contacts I wanted after the school club fair. I wanted this to be my 
problem statement for the class. I knew the class knew Java, and Android apps are written in Java, so 
it would be inclusive to the other members, and it was relatively simple in theory. We would need to have
some external server to sync all the data, but there are upperclassmen that offered help in that area 
and we were learning about databases in another class. 

The teacher decided that partners were decided via how we chose to sit ourselves on the first day, and my 
partner did not have any ideas from what I remember. The teacher begrudgingly accepted my idea. I found out
later many students made calender apps to the point he was going to ban the idea after my semester. The other 
team decided to take the teacher's pet idea, which created a clear favorite from the teacher.

## Implementation
This was probably the semester I worked the hardest in school because of this class. Even knowing the language, 
I found that knowing the framework was often the larger hurdle. My only experience was with the raw languages and 
Unity, so working within the Android ecosystem was a lot all at once. I needed to make sure the work I was doing 
matched the teacher's expectations: my partner found the topic extremely difficult, the teacher was constantly 
unimpressed with the project, and I needed to not only learn Android, but also get it working with AWS. While the
other group went to an upperclassman for help with the server, I was of the opinion that their solution was too complex,
and looked into a serverless solution instead. I didn't know much at the time, but all I knew I needed was a few functions 
that needed to be activated on the backend which looked exactly like what Amazon Lambda was offering. It required Python, 
but it allowed me to access the backend database from my app which was enough for the project.

{{< figure src="/mobile-projects/eventified/androidStack.jpg"
    caption="National Aviation System Delays, Jan 2021 to Dec 2023" 
    class="bordered-image">}}


https://github.com/Jaspann/Eventified


{{< youtube 53W1g1DNmHY >}}

<iframe src="https://1drv.ms/p/c/78ac3e9c395f4290/IQT4glrVFTcxR6_8_9ZO6__jAQPDLy0OEk9MHgNe8nHEhRI?em=2&amp;wdAr=1.7777777777777777" width="100%" height="400px" frameborder="0">This is an embedded <a target="_blank" href="https://office.com">Microsoft Office</a> presentation, powered by <a target="_blank" href="https://office.com/webapps">Office</a>.</iframe>

