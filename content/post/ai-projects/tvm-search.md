---
title: "Optimizing Scheduler Search in TVM"
description: "Optimizing AI Scheduling with Ansor, Transfer Tuning, and Droplet Search."
tags: [Python, Apache TVM]
publishdate: 2024-12-15
lastmod: 2025-03-03
categories: [
    "ai-projects",
]
weight: 1
---

## Introduction
Machine Learning Compiler Frameworks like [Apache TVM's](https://tvm.apache.org/) 
[Ansor](https://tvm.apache.org/2021/03/03/intro-auto-scheduler)  
optimize schedulers for inference. The software runs a search algorithm, optimizing 
a model for the specific hardware configuration. Apache TVM integrates with all popular 
model frameworks, allowing for optimizations in inference latency, improved throughput, 
and memory usage optimization. For this project, we combine and evaluate the efficiency 
of two additional techniques used to improve Ansor: 
[transfer-tuning](https://github.com/gicLAB/transfer-tuning/tree/main) and 
[droplet search](https://dl.acm.org/doi/10.1145/3650109).
In our tests, we find that combining these two techniques can lead to an improvement of up 
to 10% faster inference than using transfer-tuning alone.

## Apache TVM and Ansor
Apache TVM is an actively maintained open-source deep learning compiler.
It enables straightforward optimization for end-to-end training compatible with PyTorch TensorFlow, and many other frameworks.
In the context of Deep Learning, graph optimization can boost performance by two means: 

1. Layout rewriting, for example, rearranging CNN channels to best match specific GPU.
2. Operation fusion, which involves combining several operations such as convulsions 
and activations to reduce the function call overhead, or repeated memory access.

Ansor is the algorithm that our work primarily uses to optimize the model. 
Ansor was introduced in March of 2021, and it preforms optimizations through 
adjusting the task scheduler. It was a large improvement over Apache TVM's previous 
workflow, known as *AutoTVM Workflow*, where writing an advanced template scheduler was 
no longer required, drastically lowering the barrier to entry for the library. 

The basic idea of Ansor is that it performs an evolutionary search, which performs 
mutations on the current solution with the highest performance score to attempt 
to find a better solution. Ansor is run tens of thousands of times to find the 
best possible optimizations.

## Droplet Search
Droplet search is a technique to optimize machine learning kernels, based on the 
coordinate descent algorithm. The idea in principle is kinda like gradient descent, 
but simplified so that only one axis is minimized at a time. Each variable that the 
search algorithm can adjust is mapped to a coordinate point in an n-dimensional space 
to be minimized. Once enough tests are run, the algorithm can understand how 
traversing on any axis will impact the objective function, allowing us to minimize. 
The original paper behind this technique also argues that from any starting configuration, 
the fastest possible solution that the algorithm can come up with within the constraints of 
the data is always achievable. Due to the speed of the algorithm, this makes it a very 
appealing choice for this type of problem. While droplet search was possible on AutoTVM Workflow,
it was not fully implemented into Ansor, so the optimization was never tested in the original 
transfer-tuning paper. 

## Transfer-Tuning
While Ansor helps find the best schedules for a particular architecture-hardware configuration,
what if we have several hardware configurations? Or similar software configurations? 
Re-running the optimization on each would be expensive, 
and we would likely find similar optimizations between optimal configurations.
Transfer Tuning attempts to tackle this problem.
It builds upon Ansor but extracts optimization for later reuse on new DNN architectures.
By having several models share their optimizations over a small period of time, the models
can combine the optimizations together to achieve a performance much greater 
than their individual components' search steps could do alone.
The method shows up to 88% faster inference given the same search time with pure Ansor.

## Results
For our tests, we ran ResNet50, GoogleNet, and AlexNet through five thousand trials in 
Ansor with and without droplet search, and then performed Transfer tuning across each 
pair of models. It is important to note that Transfer Tuning suggests running twenty 
thousand trials per model through Ansor, but we needed to cut Ansor short at 5000 due 
to time constraints. While most combinations between the models resulted in no 
significant difference between the two benchmark times, GoogleNet when using Droplet 
Search with Transfer Tuning against AlexNet, performed almost 10% faster than Transfer 
Tuning against AlexNet by itself, showing hints at promising results with more testing. 
This outcome is also not too surprising due to the nature of Transfer Tuning, where some 
model combinations are able to transfer their optimizations more efficiently than other 
models. Transfer Tuning may fully be able to optimize GoogleNet via ResNet50, but for using 
a model like AlexNet as the basis for Transfer Tuning, when applied to GoogleNet, it may not 
be able to fully optimize like ResNet50, allowing for Droplet Search to be beneficial in these 
scenarios.

## Future Work
A clear direction for future work is testing at the recommended 20,000 Ansor trials for 
transfer-tuning and seeing the difference from what we have recorded so far. We also see 
potential in fewer trails to find how droplet search can optimally be applied. 
Additionally, testing additional hardware configurations is necessary due to the nature 
of Ansor and Transfer Tuning.

Another potential area for future work is to apply droplet search on a set of data points 
beyond the initial log files of the model. The idea is that if transfer-tuning is able to 
apply the data from other models, it should be possible to feed all of that data back into 
droplet search, potentially creating an even better data set then the current set up.

You can view the source code for the project at:

https://github.com/Jaspann/transfer-tuning

For the project, we also created a slideshow as well as a report, available below:

<iframe src="https://1drv.ms/p/c/78ac3e9c395f4290/IQRWNHHXwyudS6COJxySn5nxATWeS_FmdKJg9VkjwDCvIiY?em=2&amp;wdAr=1.7777777777777777" width="100%" height="400px" frameborder="0">This is an embedded <a target="_blank" href="https://office.com">Microsoft Office</a> presentation, powered by <a target="_blank" href="https://office.com/webapps">Office</a>.</iframe>

<div style="margin: 2rem 0;"></div>

{{< pdf src="/ai-projects/tvm-search/tvm-search.pdf" width="100%" height="800px" >}}