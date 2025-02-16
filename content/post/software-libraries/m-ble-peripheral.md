---
title: "Peripheral BLE Library for Flutter"
description: "Developing a Flutter library with full BLE peripheral capabilities for iOS and Android"
tags: [Java, Swift, iOS, Android, Flutter, Mobile, Library, BLE, Bluetooth]
publishdate: 2023-10-01
lastmod: 2025-02-13
categories: [
    "software-libraries",
]
---

*Developing a Flutter library with full BLE peripheral capabilities for iOS and Android*

## Bluetooth For FreeMoveVR
Early on in the creation of FreeMoveVR, I knew I wanted the primary communication 
method between the smartphone and computer to be over Bluetooth. I believed that 
Bluetooth was the perfect solution for our use case because:

1. Everyone has Bluetooth on their phone, and it is a stable option for developers.
2. FreeMoveVR needs to transfer a relatively small amount of data compared to something like streaming music to AirPods.
3. It's wireless, so there is less hassle setting up the program for the end user.
4. It does not rely on Wi-Fi at all, which is good in cases like colleges where the protocols are very complex and locked down for students.
5. BLE stands for Bluetooth Low Energy, so the implication is that the phone can do the main task of pose detection and spend minimal resources on data transfer.

The most notable arguments against the other methods were that a wired connection would be hard to use given how the app works, 
and that a Wi-Fi connection would be impossible to develop while on campus at SNHU. 

Working on FreeMoveVR was the first time I ever looked into Bluetooth as a developer.
When learning about the technology, there seemed to be a lot of missing information in discussions, so I will 
briefly discuss some core background to understand the problem I was facing.

## Bluetooth 
When first learning about Bluetooth, there are two main types developers may be talking about: 
[Bluetooth Low Energy](https://developer.android.com/develop/connectivity/bluetooth/ble/ble-overview) 
(BLE) and Classic Bluetooth, often associated with Bluetooth versions like Bluetooth 5.
Classic Bluetooth is what something like AirPods or your car uses to transfer large amounts 
of data and something that needs to be manually set up on your phone.
Advanced applications with heavy data transfer likely need Classic Bluetooth. 
If your application has lower data streaming needs, you can likely use BLE. 
BLE allows for easier and even automatic connections. 
BLE facilitates easier and even automatic connections. An app with BLE functionality 
can scan for known UUIDs, allowing it to connect to devices and read static or streaming data.
This is the basic concept behind Bluetooth mesh networks, which is sometimes brought up in smart homes or offices.
There are also many more libraries for BLE than Bluetooth 5. A very good library that I use for desktop applications is 
[SimpleBLE](https://www.simpleble.org/), and for Python [Bleak](https://github.com/hbldh/bleak) is very popular.
Overall, BLE is the correct choice for most small to medium projects for the ease of use for developers and users.

BLE works on a central & peripheral system. This is loosely similar to the concept of a client and server. 
The peripheral "advertises" the BLE connections that centrals can connect to. Each connection has two UUIDs 
one for the service (normally one per application) and one for the characteristic, which an application 
can have as many as needed. When a central sees UUIDs it recognizes, it can connect and start reading and 
writing data from the peripheral. 

The main issue that I faced in development was that BLE libraries and developers almost always focus 
on the central and rarely implement the peripheral side of the technology. [Bless](https://github.com/kevincar/bless)
is another Python library for BLE that implements the peripheral side of BLE, 
but only has 127 stars on GitHub and is hardly maintained compared to Bleak 
with 1.9k stars and a much more active commit history. SimpleBLE only supports central 
and the peripheral side has been in development for [2.5 years](https://github.com/simpleble/simpleble/issues/99)

## BLE and Flutter
Flutter has one of the best [communities for libraries](https://pub.dev/). 
It is much smaller than that of Python or NPM, but you can still find almost anything you need for mobile development. 

When I was initially building FreeMoveVR in 2022, I only focused on building for Android, 
and I would retrofit iOS compatibility later. I was not too worried about trying to make 
sure what I did would instantly work on iOS, but I chose Flutter for the platform and 
tried to make decisions to make iOS compatibility easier later on. 

When going over the requirements at the time I had found something interesting. 
Multiple libraries existed for the central side of BLE, and some even existed for 
implementing the peripheral side on 
[Android devices](https://github.com/keysking/k_ble_peripheral), but none existed for iOS.
It was even more interesting, as the libraries at the time said that iOS was not planned or 
possible, even though it was clearly possible on 
[Apple's documentation](https://developer.apple.com/documentation/corebluetooth/cbperipheral)
There were a lot of different parts of FreeMoveVR I needed to work on and I did not have any 
Apple hardware available to me at the time, so I used an Android-exclusive peripheral library
and even [fixed a small](https://github.com/keysking/k_ble_peripheral/pull/5) issue I had 
noticed when using it.

By September 2023, it had been a year since I was aware of the issue in my app, and I 
was not seeing any progress in the Flutter space for enabling BLE support. 
I decided it was time that I started working on modifying the library I was using to add iOS support. 
As the owner seemed to have abandoned the project, I forked it for my use case.

I was not aware, but at the same time, a package simply called 
[bluetooth_low_energy](https://pub.dev/packages/bluetooth_low_energy) was about to be published to 
pub.dev which today does exactly what I needed at the time. 

## m_ble_peripheral

The project I forked was called [k_ble_peripheral](https://github.com/keysking/k_ble_peripheral). 
I'm not sure why 'k' was in the name, but I decided my fork would replace the 'k' with a 'm' to 
signify I modified it, making it [m_ble_peripheral](https://github.com/Jaspann/m_ble_peripheral). 

This was my first time working on a Flutter library for iOS, or really at all. 
I was only making the project for FreeMoveVR, so I had a very clear idea of the 
features I needed to add and what I didn't need to think about.
This was also the main reason I didn't publish the library on pub.dev, 
as I didn't really mind if the library did not implement all the features available to 
Apple phones or meet feature parity with the Android side.
I only needed enough iOS code for FreeMoveVR to communicate with the desktop, and then I 
could consider this complete. 

As someone that never used Apple products before developing for FreeMoveVR, I was surprised 
by the limitations they impose on developers and superusers. I was trying to download 
Flutter library example apps to understand the process, and quickly hit the three-app limit 
with code I was actively using to build the library for the platform. The way that Flutter needs
to handle itself inside Xcode is also unorthodox, according to the 
[Flutter doc](https://docs.flutter.dev/packages-and-plugins/developing-packages#step-2c-add-ios-platform-code-swift-hplus-m) 
to start development on a package, you need to locate your files Xcode at: 
`Pods/Development Pods/examplePlugin/../../example/ios/.symlinks/plugins/examplePlugin/ios/Classes`
This is beyond strange to have required `..` in the file path, as that means that you would land 
yourself back at `Pods`, but this whole path is required to get to `example`.

As someone who learned software development primarily through the Android ecosystem, it was a 
breath of fresh air looking at Apple's documentation for BLE. I sometimes think that the documentation
in Android feels so ambiguous that it was automatically generated using only the name of the function as 
a reference. Apple, on the other hand, not only has descriptions for classes and details about functions 
that I found useful, but they even had an example project for Macs! As someone who never had written in Swift 
before this, I felt like I was able to perfectly understand the library and how I needed to implement it. 

The main unique thing I noticed when coding in Swift is its extra keyword called `guard`. This is used for
negative conditions, where we need to check if the values are valid before we run a method. This is great, as 
it allows you to check your inputs like you would in an `if` statement but in a more streamlined way. 

## Development
I knew that the structure for k_ble on Android worked and saw many similarities between the two platforms
BLE libraries, so I thought it would be best to go in with a general structure mirroring the Android side in 
addition to the example provided by Apple. I needed the Flutter code to be as platform-agnostic as possible,
so taking hints from the Android side would help with that goal.

Almost all my code ended up in `CharacteristicDelegate.swift` and `PeripheralManagerHandler.swift`. The other files,
like in Android, were for class structures and not much else. In the library, the main thing I needed to be aware of 
was managing the active connections, as we abstracted that away in the Flutter layer, 
but it is handled by the program at least on the Apple side. That meant managing objects that the app found and 
connected to in a way that would be standard for libraries. 

## Conclusion
This was a small project I did 2 years ago, and I didn't end up leaving comments. 
So, like most of these posts, I am piecing back together what happened as I write the post.
While I am happy I made the project, I genuinely don't remember much about the problems I encountered, 
and I don't think it is a good use of time to study my code to figure out what I thought I did back then.
I would have liked to make the development section much larger, and I may in the future, but understanding 
at a macro level is becoming more important as time progresses, so I am fine leaving the post as is for now.
If you want to look at the code though, it is available at:

https://github.com/Jaspann/m_ble_peripheral

Balancing the backward compatibility with k_ble and the differences between iOS and Android's implementation on the 
BLE peripheral specification was an interesting and fun challenge. From this, I learned a lot about how Flutter's libraries 
work, Bluetooth, and backward compatibility with existing solutions. This immediately preceded my work on my next Flutter 
library, google_mediapipe_pose_detection, where I further expanded my abilities in this area.