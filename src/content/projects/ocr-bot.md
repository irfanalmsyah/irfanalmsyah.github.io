---
title: "OCR Bot"
publishedAt: 2022-02-10
description: "A Discord.py Bot that does OCR on image to convert it to text. It using tesseract to do optical character recognition"
slug: "ocr-bot"
github: "https://github.com/irfanalmsyah/OCR-discordbot"
isPublish: true
---

## Code Breakdown
```py
from PIL import Image
from pytesseract import *
from io import BytesIO
import requests
import discord
from discord.ext import commands, tasks
```
These lines of code import packages and modules required. `discord` and `discord.ext` is API wrapper for discord. It's basically essential for this project. `io` is required to sending attachment (images, videos, etc). `request` to make GET request to load image. `PIL` to read image and `pytesseract` to use the tesseract app 

```py
pytesseract.tesseract_cmd = 'C:\\Program Files\\Tesseract-OCR\\tesseract.exe'
client = commands.Bot(command_prefix='.')
```
The first line is to setting the path to the Tesseract OCR engine executable file. The next line instantiate the bot

```py
@client.event
async def on_ready():
	print('{0.user} is on'.format(client))
	change_status.start()
```

These lines of code prints the bot name and discriminator and runs a function to change the bot activity presence

```py
@client.event
async def on_message(message):
  link = message.attachments[0]
  response = requests.get(link)
  img  = Image.open(BytesIO(response.content))
  output = pytesseract.image_to_string(img)
  await message.channel.send(output)
```

These lines of code take any image that user send and do the OCR using tesseract. Then sending the ouput to the channel

```py
client.run ("token")
```
This runs the bot