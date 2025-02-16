---
title: "Eventified"
description: "An Android calendar app for university clubs."
tags: [Android, Java, AWS, Python, XML, API, SNHU]
publishdate: 2021-12-01
lastmod: 2025-02-15
categories: [
    "mobile-projects",
]
---

*An Android calendar app for university clubs.*

{{< gallery class="content-gallery" >}}
  {{< figure src="/mobile-projects/eventified/androidStack.jpg" >}}
  {{< figure src="/mobile-projects/eventified/homescreen.png" >}}
{{< /gallery >}}


## Arriving at SNHU
It was my first semester on campus at Southern New Hampshire University (SNHU). 
Covid was the year prior, so my class along with the cohort below me was new to the campus.
I had experience with Java in my high school and even [taught the AP course on it](post/community-work/ap-comp-sci-a-ta).
They also taught Java in the first coding class of SNHU, 
so going into my second year I figured I would want to use it in team-based projects.

SNHU is unique in that, even though the degree says I have a computer science degree, 
it is taught much more like how I would imagine a software engineering degree to be taught.
Each semester (or year) you are put with a group to build a single project. It is a great exercise in 
working as a software development team, developing using agile, using issue tracking boards, 
and the teacher acts similarly to a project manager. 

I quickly realized, that, because of my extra AP credits moving me ahead in the graduation schedule, 
I was placed in an extremely small class with all the students that either were like me and got 
ahead somehow or fell behind over the pandemic. 

## Creating the Idea
My favorite part of the software engineering series of classes had to be the 
start of the semester when we pitched our ideas. Students can choose almost anything they want
as long as it is with the teacher's permission. It can be any problem, using any language or 
framework, and as long as you pitch well and can prove that the goal is achievable within the year, 
it is likely that you will get a team to work on the project with you.

As a new student on campus, I had been extremely confused about how to engage in the community. 
Club events often felt like they were not communicated well, and I felt like I missed out on a lot
after I did not get all the contacts I wanted after the school club fair. I wanted this to be my 
problem statement for the class. I knew the class knew Java and Android apps are written in Java, so 
it would be inclusive to the other members, and it was relatively simple in theory. We would need to have
some external server to sync all the data, but there are upperclassmen who offered help in that area 
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
unimpressed with the project, and I needed to not only learn Android but also get it working with AWS. 

### Frontend
Any type of UI solution that Android offered was going to be new to me. For [Pond Jumper](post/mobile-projects/pond-jumper) 
I only needed a few buttons for a game while Eventified a end user application that had much more intricate design over several
pages that needed to get content from an external source. In 2021, [Android Jetpack Compose](https://developer.android.com/compose) 
was very recently released, and not many tutorials explained it well. Instead, we used the more stable XML UI solution. 

Android uses custom XML elements to define each of its components that are in the framework by default in addition to your own custom
components. All the attributes are defined by XML, then if you need to override them you do so in the code, like grabbing a logo for 
our club information. This is very clear to understand in my opinion, but it is easy to see why Google moved away from this solution as
XML limits the options and splits the development into two languages, whereas Jetpack Compose allows developers to write everything in Kotlin.

One of the largest issues I remember facing in the front end was that RecyclerView, responsible for scrolling items past the screen, was not 
working for my requirements. If I recall correctly, this was because RecyclerView only handles one class type, while I needed it to handle 
two for both the student's personal events as well as the club events. Handling this is surprisingly challenging. I needed to extend RecyclerView.Adapter
[creating a new class](https://github1s.com/Jaspann/Eventified/blob/HEAD/app/src/main/java/com/example/eventified/HomeAdapter.java)
that overrode `onBindViewHolder`, forcing it to figure out which type of event it was and correctly applied to the data. I was able to get away with
two classes that `extends RecyclerView.ViewHolder`, and did not need to do anything to PersonalEvent and ClubEvent, which in retrospect may 
have been the cleaner solution.

While that was the most notable issue I had, as I think it was the last roadblock we had in the project, I am surprised about how much I was able to do.
I very much agree with anyone saying that the UI does not look great. And it didn't need to be for a group of two computer science students. But the code
is actually much more than I would have expected of myself in 2021. My commits back then were even larger than they are today, which I guess is some progress,
but I impressed myself with how much code there is for the semester. 

Reading through the code, there are also some interesting choices I made back then. I think most interestingly, I remember I really didn't want the long URLs to 
be in the middle of code blocks. This has some merit, as long URLs take up screen space making the code less readable. My solution was to 
[add all of the URLs into the save data for the user on startup](https://github.com/Jaspann/Eventified/blob/master/app/src/main/java/com/example/eventified/MainActivity.java#L101).
The idea of what to do is there, but there almost certainly was a better way to manage this. 
Another thing was that, for a small amount of time, I thought that
AWS Amplify was the correct direction to go in instead. I only thought about this for a few days, 
but at the end of the project, I still had references to Amplify in the code base. 
Some level of cleaning up the code and making sure that everything looks nice goes a long way. 
Another thing that goes a long way is comments. I had virtually no comments,
which was a serious problem of mine back then. Today I at least try to add doc 
comments to the code I edited at the end of a commit or branch, often requiring it in the linter, 
and comment whenever standard convention is broken. 

### Backend

The only real requirement that the teacher imposed on our projects were that we needed to connect to an external SQL database to store data.
This was fine for our project, and it was there so that we couldn't cheat him and say that we are storing all the data locally.

While the other group went to an upperclassman for help with the server, I was of the opinion that their solution was too much,
work for the small amount of processing that needed to be done for the problem we were tackling,
and looked into a serverless solution instead. I didn't know much at the time, but all I knew I needed was a few functions 
that needed to be activated on the backend which looked exactly like what [AWS Lambda](https://aws.amazon.com/lambda/) was offering. 
It required Python, but it allowed me to access the backend database from my app which was enough for the project.

I set up endpoints via [Amazon API Gateway](https://aws.amazon.com/api-gateway/) for the app to activate the lambda functions. 
API Gateway was just a simple UI for creating random URLs for the project and hooking them up to your Lambda functions easily.
The API Gateway would pass the JSON payload to the AWS lambda function, which did some simple checking that the account doing the action is valid, and
then doing simple CRUD operations on the SQL database before sending the data back. As everything was very simple, 
I was able to get away with using Python without any libraries, which was a decent introduction to Python for me.

Frontend then needed to pass the data to the backend using a library called [Android Volley](https://google.github.io/volley/). 
Volley is a simple HTTP library, which was all we needed for this application. Volley handles requests in kind of a unique way, where 
instead of `async` and `await`, you create a request queue that is processed through. In practice this means we never `await`, 
so we need to heavily use live updating instead, which was fine for our use case.

Here is the final visualization we made for the class to explain the tech stack. 

{{< figure src="/mobile-projects/eventified/androidStack.jpg"
    caption="A visualization of the stack used. On Front end, we made the app for Android using Android Studio and Java, passed through API calls via the Android Volley library which went to AWS's API Gateway, which activated a Lambda function written in Python to finally preform an operation on the SQL database, and send the information back up the chain." >}}

In addition, we needed to present our work in front of the CS department. 
For this, we made a small YouTube video to see the flow of the app and 
a slideshow showing what we did for the class.

{{< youtube 53W1g1DNmHY >}}

<div style="margin: 2rem 0;"></div>

<iframe src="https://1drv.ms/p/c/78ac3e9c395f4290/IQT4glrVFTcxR6_8_9ZO6__jAQPDLy0OEk9MHgNe8nHEhRI?em=2&amp;wdAr=1.7777777777777777" width="100%" height="400px" frameborder="0">This is an embedded <a target="_blank" href="https://office.com">Microsoft Office</a> presentation, powered by <a target="_blank" href="https://office.com/webapps">Office</a>.</iframe>

<div style="margin: 2rem 0;"></div>

At the end of the semester, we were happy with where the app was. We understood how to develop 
a consumer-facing social application in Android, and wanted to move on to something else. The project
is still available on GitHub for anyone interested:

https://github.com/Jaspann/Eventified
