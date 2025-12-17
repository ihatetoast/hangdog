# Hangdog

# What

A hangman game with a dog theme, that uses the [Dog API]("https://dogapi.dog/") to get info on the breed and some random facts after the game has been played. 

# Where

[Hangdog](http://www.ihatetoast.com/hangdog/)

# Why

I wanted to work with the Fetch API but not bore myself with a generic free API. Hangman is a fun game to redo and experiment with new tools or logic. I also wanted to have more fun with the CSS and create typewriter keys and have a bone-shaped button. I also find that making smaller React apps is better for focusing on React than making some enormous app. I guess that's the way I learned German: did smaller exercises before I read Goethe and Tieck. It's doing the focused exercises that helped me understand the larger picture. 

Unrelated to hangman, I had in mind another project where I'd make a typewriter and have paper come out with what the person was typing. Very much an idea in my head, but when the time comes, I'd rather have some parts handled (looks of the keys and the keydown event listener) for reference. 

# How

Before I started, I pulled all the breeds that the API has and removed the extra material. I wanted an array of objects that just had an id, name, and extra info. If there's an id, it comes from the API. There's no need for extra info since the API will give me what they have. I wanted to add breeds I expected to see (Galgo Español), and some mixes. By allowing mixes, I can add more as I come across them. Because they are not recognized by the API, I add minimal extra info. I fetched from the API for info and random facts, not the dog breed. 

This is a Vite project using the React template. CSS modules for the components and just CSS file for App. 

# What if

- What if I handled the diacriticals more? Something to comeback to. Would have to think about Mac and PC. 
- What if I had more CSS animation? This is pretty flat. What if the keys looked pressed when pressed or clicked?
- What if I had space for the dog? That would be something to do while watching TV. There is another dog api, but coordinating would be a pain. I'd rather pick and choose an image from the interwebs. Is that the best way? No, it's the best way for now. 
- What if I refactored with Typescript? Oh, a good idea, but I would rather have that be a clone-n-do. 