---
title: "Multi Repo Coding Assistant"
description: "Applying LLM routing for a single chat across multiple repositories"
tags: [Python, LLMs]
publishdate: 2024-12-01
lastmod: 2025-02-16
categories: [
    "ai-projects",
]
draft: true
---

*Applying LLM routing for a single chat across multiple repositories.*

## Introduction

Many of the projects I've worked on combine multiple repositories to create a single experience 
for the user. There are many common examples of this, like a full-stack developer working on 
front and back-end. It gets much more complex though as the scope of the application grows. Companies 
may want development teams for Android and iOS, and this requires teams to understand where each 
other team is at to maintain feature parity. There are many questions that a developer of one team
could have, and discussion on every technical intricacy can take time from development. 

Coding virtual assistants have become increasingly common over the last few years. 
Virtual assistants can help to better understand whatever question you ask it on the topic it is 
made for. In another project of mine, I have been working on a suite of products that spanned across 
different platforms and coding languages. While most assistants only respond to questions about a single 
repository, my project would not work with most existing off-the-shelf solutions as I need to 
constantly be thinking about how all three repositories interact at all times.

Creating a RAG system that most tools can generate automatically in this case would be difficult 
for multiple reasons. Firstly, a naïve implementation of throwing all of my code into a single system
will create a situation where it may find the most relevant files to be from the wrong project. Secondly, 
I would likely need to parse the files to extract the doc comments and function headers, 
as much of the code would likely be trash data that would confuse the model, and the doc comments and 
header should be all I need if I have been doing my job correctly. 

## Cleaning the Data
My project I was to attempt to build this virtual assistant (VA) with was split into three repositories.
There was a Python desktop app, a Flutter mobile app, and a C++ project. I needed to get all of these code
files to the point I would be happy to pass them into my RAG.



<iframe src="https://1drv.ms/p/c/78ac3e9c395f4290/IQTeSdxR92W3QY7pA3mtUBsAAaSRcWdEMoDNXt72TIjfmxM?em=2&amp;wdAr=1.7777777777777777" width="100%" height="400px" frameborder="0">This is an embedded <a target="_blank" href="https://office.com">Microsoft Office</a> presentation, powered by <a target="_blank" href="https://office.com/webapps">Office</a>.</iframe>