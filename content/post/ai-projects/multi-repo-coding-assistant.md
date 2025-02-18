---
title: "Multi Repo Coding Assistant"
description: "Applying LLM routing for a single chat across multiple repositories"
tags: [Python, LLMs, RAG, Ollama]
publishdate: 2024-12-01
lastmod: 2025-02-17
categories: [
    "ai-projects",
]
---

*Applying LLM routing for a single chat across multiple repositories.*

## Introduction

Many of the projects I've worked on combine multiple repositories to create a single experience 
for the user. There are many common examples of this, like a full-stack developer working on 
the front and back end. It gets much more complex though as the scope of the application grows. Companies 
may want development teams for Android and iOS, and this requires teams to understand where each 
other team is at to maintain feature parity. There are many questions that a developer of one team
could have, and discussion on every technical intricacy can take time from development. 

Coding virtual assistants have become increasingly common over the last few years. 
Virtual assistants can help to better understand whatever question you ask on the topic it is 
made for. In another project of mine, I have been working on a suite of products that spanned across 
different platforms and coding languages. While most assistants only respond to questions about a single 
repository, my project would not work with most existing off-the-shelf solutions as I need to 
constantly think about how all three repositories interact at all times.

Creating a RAG system that most tools can generate automatically in this case would be difficult 
for multiple reasons. Firstly, a naïve implementation of throwing all of my code into a single system
will create a situation where it may find the most relevant files to be from the wrong project. Secondly, 
I would likely need to parse the files to extract the doc comments, function headers, and code body 
to minimize confusing the model. 

## Cleaning the Data
The project I wanted to build this virtual assistant (VA) for had its code base split across three repositories.
There was a Python desktop app, a Flutter mobile app, and a C++ project. I needed to get all of these code
files to the point I would be happy to pass them into my RAG.

I wanted to split each function into its doc comment, header, and body components, which I would find would be
extremely difficult for some languages. I wanted to do everything in a Python notebook and looked at libraries to 
do this for the Python project as it was likely going to be the easiest of the three. Python has a very easy internal 
system to do this in their standard library called [ast](https://docs.python.org/3/library/ast.html) (Abstract Syntax Trees). 
With `ast`, I could `walk` each file, and extract the contents of each part of the file as I wanted it, 
making this step very easy.

To solve this problem for Flutter (Dart) and C++, I decided my best option would be complex RegEx expressions. 
In most situations, I prefer to code these types of projects myself or get help by working together with an LLM 
so I always know what is happening in the code and the LLM only gives hints on where I 
am going wrong and correcting me as I go. With something like RegEx though, it is one of those tools 
where it is very precise and often feels like a waste of time researching to implement the one problem
you have for your use case. Because of how complex the problem is and the limited scope it had in the 
project, I decided to pass in code of the languages for LLMs to generate RegEx expressions and process them 
for me. 

While it did not work at first, after a dozen iterations I got the RegEx and code to work with almost 
all of the code blocks I was checking. With C++, I had some getter and setter functions that were only 
a few lines so I added a check that the code needed to be more than 10 lines long to be saved for RAG.
Flutter was even more complex, likely as it is a newer and less popular language.  

## Organizing and Optimizing For RAG
Before passing my data into RAG, I needed to figure out the best way to chunk the data.
I would have liked for the entire file to be directly passed in, but the problem was that some files 
were too long for the embedder to handle. I needed to split the files, and the common convention is to 
simply split them every set number of characters. I was not sure if this was the best approach, as 
this could split the data of a function in two, so alongside creating databases in the character 
chunk format, I also broke the file into its individual functions, which was small enough for 
the database. 

Now that I had my data as I wanted it, I needed to decide how to pass it into the RAG database.
I am a fan of [Matt Williams](https://www.youtube.com/channel/UCHaF9kM2wn8C3CLRwLkC2GQ) 
on YouTube, and a month before this project he posted a video about 
[the best ways to embed](https://youtu.be/76EIC_RaDNw). His channel focuses on 
[Ollama](https://ollama.com/), which I was going to use for the project, 
and he integrated RAG using an embedding model with prefixes called 
[snowflake-arctic-embed](https://arxiv.org/abs/2405.05374). 
I loosely followed his tutorial and set up my environment with Ollama for
managing the LLMs and [Chroma](https://www.trychroma.com/) for vector storage.

At this point, I had six databases. I had my two chunking methods, multiplied by the 
three repositories I was creating the assistant for. I now needed to do the unique part 
of my project, creating the routing to know which database to hit when a user asks a question. 
A [router](https://docs.llamaindex.ai/en/stable/module_guides/querying/router/) in the world of 
LLMs is pretty simple. Before it responds to a prompt we add a system instruction to tell it that 
instead of answering the question, we want it to respond with a pre-defined set of choices instead. 

We can use this concept to have a single interface for three different RAG databases. We ask 
the router to figure out which project the user's question is asking about, and send it to the 
correct model. This often uses a smaller model, but for my use case, I was already using small
models so I used the same one as the model that answered the question. I chose to use Meta's 
[Llama 3.1 8b](https://arxiv.org/abs/2407.21783) and 
[granite3-dense:8b](https://github.com/ibm-granite/granite-3.0-language-models/blob/main/paper.pdf)
in testing. Llama is very well known, and Granite3 was used in the Mat Williams video as a very good 
model for RAG applications. 

In the system, I made sure to include a system prompt and prefixes. The system prompt is just what 
we as the designers of the application are telling the model what to do. In this case, it is just a simple 
prompt to make sure that the routing is done correctly and that it does not deviate when it tries to answer
the question. LLMs are non-deterministic, so we need to also code in safeguards as well. The prefixes we need for 
our embedding model are just a simple string we add to the start of the prompt in addition to the system prompt 
so that it embeds optimally. For snowflake-arctic-embed, the prefix is "Represent this sentence for searching 
relevant passages: ". 

## Testing
I created 20 questions to test the model on, with about seven for each of the three repositories. 
For each question, I logged both the response of the router, the results from Chroma and, the final output 
so I would know where the issue went wrong. Maybe 70% of the time that there was an error, it was due to 
the wrong files being returned by RAG, rather than an issue with the LLM model. 

In the presentation, you can see the benchmarks on the final slide. Llama 3.1 and Granite had very similar scores 
for both chunking methods. The character-based chunking was significantly better than my function-based solution.

<iframe src="https://1drv.ms/p/c/78ac3e9c395f4290/IQTeSdxR92W3QY7pA3mtUBsAAaSRcWdEMoDNXt72TIjfmxM?em=2&amp;wdAr=1.7777777777777777" width="100%" height="400px" frameborder="0">This is an embedded <a target="_blank" href="https://office.com">Microsoft Office</a> presentation, powered by <a target="_blank" href="https://office.com/webapps">Office</a>.</iframe>

## Conclusion
This idea is somewhat promising in my opinion. I find much of the LLM product "solutions" to be hype, 
and while this problem does fall into that category, there are many people who are interested and want to use them.
I can see the tool being useful for someone who would want to contribute to my software suite, where scouring 
between three repositories in different languages to find the correct way to match compatibility is not feasible 
to expect from the average contributor otherwise. Maybe it could be useful for some other niche cases as well, but
any real company structure should have communication or some sort of bureaucracy in place so this is not needed.
Additionally, any real attempt would need tools for every supported language, and I am not willing to put 
research into a dozen languages for a product I don't want to use myself. 

I am still happy that I worked on this project and got the results I did. I feel that it is a unique touch to the 
existing code assistants that I have not seen much of. If you are interested, the project is available on my GitHub. 
Please note, that I made it specifically for another project of mine, FreeMoveVR, which is not public as of writing, 
but it should work on any other project with the basic structure:

https://github.com/Jaspann/FreeMoveVR_VA 