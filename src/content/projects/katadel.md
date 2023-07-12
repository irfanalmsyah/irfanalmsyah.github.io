---
title: "Katadel"
publishedAt: 2022-07-05
description: "Python program that implements an Indonesian word-guessing game (like Wordle)"
slug: "katadel"
github: "https://github.com/irfanalmsyah/katadel"
isPublish: true
---

## Code Breakdown
```py
import random
import sys
import requests
import words
import colorama
from colorama import Back
```
The program starts by importing several necessary modules

```py
colorama.init(autoreset=True)
```
This line initializes the Colorama module, which allows for colored text output in the terminal. The autoreset=True parameter ensures that the color settings are reset automatically after each use.

```py
def validation(x):
    try:
        r = requests.get(url=f'https://new-kbbi-api.herokuapp.com/cari/{x}')
        description = r.json()['data'][0]['arti'][0]['deskripsi']
    except:
        return False
    return description
```
The validation function takes a word as input and validates whether it has a description in KBBI. It makes an HTTP GET request to a KBBI API and checks if the word has a description. If it does, it returns the description; otherwise, it returns False.

```py
def check(input_word, word):
    check_list = []
    i = 0
    while i < 5:
        if input_word[i] == word[i]:
            check_list.append('G')
        elif input_word[i] in word:
            check_list.append('B')
        else:
            check_list.append('R')
        i += 1
    return check_list
```
The check function compares the inputted word with the correct word. It returns a list of letters indicating the correctness of each letter in the word. 'G' represents a correct letter in the correct position, 'B' represents a correct letter in the wrong position, and 'R' represents an incorrect letter.

```py
WORDS = words.WORDS
word_result = ''
```
The WORDS variable stores a list of words.

```py
while True:
    x = input('\nSelamat datang di Katadel 5 huruf! Apakah kamu ingin bermain? (Y/N)\n')
    if x == 'N' or x == 'n':
        sys.exit()
    elif x == 'Y' or x == 'y':
        print("\nSelamat bermain! Inputkan 'clue' untuk mendapatkan clue. Inputkan 'help' untuk mendapatkan petunjuk\nHarap tunggu beberapa saat...")
        while True:
            word = random.choice(WORDS)
            valid = validation(word)
            if valid:
                break

        turn = 1
        while turn < 6:
            while True:
                input_word = (input(f'\nTebakan ke-{turn}: ')).lower()
                if input_word == 'clue':
                    print(valid)
                elif input_word == 'help':
                    print('Hijau berarti huruf tersebut benar dan posisinya benar\nBiru berarti huruf tersebut benar tetapi posisinya salah\nMerah berarti huruf tersebut salah')
                elif input_word.isalpha() is False or len(input_word) != 5:
                    print('Input yang diperbolehkan hanya 5 huruf')
                elif input_word not in WORDS:
                    print('Kata tersebut tidak ada dalam KBBI')
                else:
                    break
            result = check(input_word, word)
            i = 0
            while i < 5:
                if result[i] == 'G':
                    word_result += Back.GREEN + input_word[i]
                elif result[i] == 'B':
                    word_result += Back.BLUE + input_word[i]
                elif result[i] == 'R':
                    word_result += Back.RED + input_word[i]
                i += 1
            print(word_result)
            word_result = ''
            if result == ['G', 'G', 'G', 'G', 'G']:
                print(f'Kamu menang!\nJawabannya adalah: {word.upper()}')
                break
            if turn == 5:
                print(f'\nKamu kehabisan kesempatan :( \nJawabannya adalah: {word.upper()}')
                break
            turn += 1
    else:
        print("\nInput Kamu tidak dapat dipahami")
```

The program enters an infinite loop, asking the user if they want to play the game or exit. If the user chooses to play (by entering 'Y' or 'y'), the program proceeds to select a random word from the `WORDS` list.
The program then calls the `validation` function to ensure the selected word has a description in KBBI. It continues selecting a new word until a valid one is found.
The game starts with a `turn` counter set to 1. It enters another loop that allows the user to make up to five guesses.
Within the inner loop, the program prompts the user to enter their guess. If the user inputs 'clue', it displays the description of the word. If the user inputs 'help', it provides instructions on the color-coded feedback for each letter. If the input is not valid (not exactly five alphabetical characters), it displays an error message. If the input word is not in the `WORDS` list, it informs the user that the word is not in KBBI. Otherwise, it breaks out of the loop.
The program calls the check function to compare the `input_word` with the correct word and obtain a list of color codes representing the correctness of each letter.
It then iterates over the color codes, adding the corresponding color to the `word_result` string.
The `word_result` string is printed, displaying the user's input with the appropriate color codes.
If the user's guess is completely correct (all 'G' in the result list), the program displays a winning message and the correct word, then breaks out of the loop.
If the turn counter reaches 5 (the user has made five unsuccessful guesses), the program displays a losing message and the correct word, then breaks out of the loop.
After the game ends (either by winning or losing), the program goes back to the initial user input prompt, allowing the user to play again or exit.