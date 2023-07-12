---
title: "Agrihack0x07 CTFd Platform"
publishedAt: 2022-08-20
description: "A CTFd fork for Agrihack0x07 CTF (Capture The Flag) qualification round"
slug: "agrihack0x07-platform"
github: "https://github.com/irfanalmsyah/agrihack0x07-platform"
isPublish: true
---

## Description
This repository is a forked version of [CTFd/CTFd](https://github.com/CTFd/CTFd), a platform for organizing Capture The Flag (CTF) competitions. The forked version was created for the Agrihack0x07 Qualification event.

In this modified version, several changes have been made to the users table. Additional attributes, such as `nama_lengkap` (full name), `nim` (student ID), `angkatan` (batch/year), and `is_peserta` (participant status), have been added to the table. These changes allow for more specific user information to be stored.

One significant modification is the disabling of the registration feature. Users are no longer able to register themselves directly on the platform. This decision was made to control the participant list and ensure that only IPB University students are able to participate in the event.

The authentication process has also been altered. If a user does not exist in the CTFd database, an additional step is performed. A `GET` request is made to the `IPB University API` to check if the user exists in their database. If the user is found, a new user is inserted into the CTFd database. This modification suggests that the Agrihack0x07 Qualification event required authentication and integration with the IPB system.

Additionally, some minor frontend changes have been made to the platform's user interface. 