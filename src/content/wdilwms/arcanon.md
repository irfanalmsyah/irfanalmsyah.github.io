---
title: "arcanon"
publishedAt: 2023-07-12
description: "Websocket, Django Channels, Deployment to Digital Ocean"
slug: "arcanon"
project: "arcanon"
isPublish: true
---

arcanon (all lower caps) is a final project for the software engineering course. It is a web application with concept of anonymous, where user can find a match and talk and chat anonymously. Other than that, user can also write a post (also anonymously) and other user can comment on it (obviously, anonymously). I was in charge for primarily the backend development, but I also did the database design, frontend development, and deployment. I did face some challenges, particularly with the real-time messaging feature.

## Websocket
AFAIK, HTTP is a request-response protocol, which means that the client needs to send a request to the server to get a response. This approach was not suitable for a chat feature, where real-time communication was essential. This is where websocket comes in. Websocket is a protocol that allows a two-way communication between client and server. This means that the server can send a message to the client without the client asking for it. This is perfect for a chat feature, because the server can send a message to the client whenever there is a new message.
![Websocket](https://github.com/irfanalmsyah/irfanalmsyah.github.io/blob/main/assets/img/wdilwms/arcanon/Websocket_vs_HTTP.png?raw=true)

### Using Websocket in Django
Since Django doesn't provide built-in websocket support, so I needed to use a third-party library. I used [django-channels](https://channels.readthedocs.io/en/stable/), which is a third-party library that allows websocket in Django. Quoting from the documentation,
> Channels builds upon the native ASGI support in Django. Whilst Django still handles traditional HTTP, Channels gives you the choice to handle other connections in either a synchronous or asynchronous style.

## Django Channels
I rely on the documentation a lot to implement the websocket using Django Channels in Django. First thing i did before implementing the chat feature that our project intended, I followed the [tutorial](https://channels.readthedocs.io/en/stable/tutorial/index.html), tweaked, broke, and fixed some things to really get my understanding better. Later, I implemented the chat anonymous feature using the knowledge I got from the tutorial. 

### Understanding WSGI vs ASGI
While learning the tutorial, I encountered the terms WSGI and ASGI. WSGI (Web Server Gateway Interface) in a nutshell acts as a mediator between the web server and the web application. It is a specification that describes how a web server communicates with a web application, and vice versa. The problem with WSGI is that it is synchronous and doesn't support websocket. This is where ASGI (Asynchronous Server Gateway Interface) comes in. ASGI (Asynchronous Server Gateway Interface) is just like WSGI, but it is asynchronous and supports websocket. 

### Dealing with Synchronous Database ORM
TDjango's ORM (Object-Relational Mapping) operates synchronously, which means that it blocks the thread until a database operation is completed. his synchronous behavior was not desirable for the chat feature, as it would cause the server to be blocked during database operations. The first solution that came to my mind was using `database_sync_to_async` as suggested in the documentation. But, for some reason that I still don't understand, it didn't work. It created some undefined behavior, where the message was sent twice, or the message was not sent at all. I tried to debug it, but I couldn't find the problem. I tried to find the solution on the internet, but I couldn't find any. I was stuck for a few days, until I found a solution to add `os.environ["DJANGO_ALLOW_ASYNC_UNSAFE"] = "true"` in the `settings.py`. I'm pretty sure it was not the ideal solution, but it worked. Perhaps I will revisit this problem in the future. But for this project, I will leave it as it is.

## AJAX
In the web application, there are some features where the user needs to send a request to the server to get a response, for example giving a like, posting comments, requesting a room chat, and so on. When user does this, the page will be refreshed. We don't really like it even though it was working fine. I did some research (read: googling) and found out that AJAX is the solution.

### AJAX the football team?
![Ajax the football team](https://github.com/irfanalmsyah/irfanalmsyah.github.io/blob/main/assets/img/wdilwms/arcanon/ajax.jpg?raw=true)
No, not that Ajax. AJAX (Asynchronous JavaScript and XML) is a technique for creating fast and dynamic web pages. It allows web pages to be updated asynchronously by exchanging small amounts of data with the server behind the scenes. It basically create an API request to the server, and the server will send a response in JSON format. This means that it is possible to update parts of a web page, without reloading the whole page. This is perfect for the features that I mentioned above.

## Deploying on Digital Ocean Droplet
The project wasn't really need to be deployed. But I did it anyway (for the sake of flexing, jk). Just like most of the students, I was bro and couldn't afford a VPS. I used my free Google Cloud Platform credits before so i need another free VPS, and Digital Ocean was one of it.

### Uncomplicated Firewall (UFW)
I managed the VPS via SSH (Secure Shell) protocol. When I run the website in the VPS, I couldn't access it from the browser. Obviously because I had not yet opened the HTTP port. To resolve this, I tried to use UFW tool to open the port. I allowed the HTTP port and enabled the UFW. But, suprise-suprise! I couln't connect to the SSH anymore. I was really confused why would that happened. My first thought was because I updated and upgraded the VPS. So I reset the droplet and retried it again, and I still couldn't connect to the VPS via SSH again after enabling the UFW. It turned out that the port that will be opened after enabling the UFW is the port that are allowed in the UFW. So, even though the port for SSH was opened before enabling the UFW, it will be closed after enabling the UFW becase i didn't allow SSH yet in the UFW. So I reset the droplet again, and this time I allowed the SSH port (and HTTP of course) before enabling the UFW. And it worked. It was a silly mistake. I should've read the documentation more carefully.

## Conclusion
That was it. Actually I learned a lot more but I started to write this WDILWMs (What Did I Learn While Making) a while after the project was finished and I didn't list the things that I learned. I will try to write the WDILWMs as soon as possible once I finished a project (or maybe while the future project is on going, or not at all, who knows). I hope this WDILWMs can help you in some way. Thank you for reading.
