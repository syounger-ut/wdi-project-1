# Sam's `1st` project for General Assembly `w02d04`
====

<sam.younger@gmail.com> | <http://sam.younger.co.uk> | <https://github.com/samyounger>

##Initial planning: Idea foundations
====

- A game based on **Duck Hunt**, called **PolitiCat**
	* it is like **AngryBirds**, a shot is fired infront of the moving object to time a collision
	* the player is aiming to hit the **politician**
	* they will fire **cats** at the politician

##Features
- The game is for **one player**
- A politician selected at random is fired across a Westminster landscape
- The player has to throw a cat at the politician to hit them
- The politician will appear at a random speed, from different locations
	* fired out of the London Eye > furthest away so smallest
	* pop out of big-ben's clock > medium distance, medium size
	* walk across the pavement > closest, so biggest
- A **score counter** to see how many points the player scores
- Each level has ten politicians to throw cats at
- The player has 3 cat lives.
	*  Each missed politician they lose a life. If they miss 3x then the GAME OVER. 
	*  If they hit 10 politicians in a row, they gain an additional life
- Each time a player completes a game sequence, they move onto the next level
	* it levels up by **increasing the speed** and **number** of politicians which appear
- The game has no more than **ten levels**, so **100  politicians** in total

***

###Styling
- The font selection is: Kaushan Script
- The colour used for highlighting the header and articles is: #FFEEC8
- The red button is: #550000
	* the text for the red button is: #AA3939

![Cat to Fire](http://pngimg.com/upload/cat_PNG1631.png "Cat Image")

Source: "http://pngimg.com/upload/cat_PNG1631.png"

- The cat sound for each firing of the cat was sourced from: "http://www.wavsource.com/snds_2016-08-21_1204101428963685/animals/cat_screech2.wav"

##Would like to have
Currently I do not have the technical capability to add this functionality, but this is the wish-list:

1. Ability for users to sign in and have a user profile to save their scores
2. The users with their profiles would be able to challenge other players, and email challenges to players not registered
3. This two-man game they would be able to each choose their own politician. Each round the game switches to the other player. The player can choose what item to throw at the politician; rose, rock, cat, elephant etc.
	* Connect the game to the twitter API
	* the twitter API searches for mentions of both politicians over the last month. If they are not mentioned and the player threw say roses, they would be marked up, if they threw rocks at a player mentioned regularly they would be marked up, and vice-versa for marking-down of the scores

##Pseudo `code`
###Introduction : `page1`
- Both players enter their names into a box on the landing page. 
- This page should be responsively designed, with a message saying: `this game is optimised for desktop play`
- Have a readme which explains that `any photos that are copyrighted will be removed immmediately but the page is for educational purposes.`
- Explanations for the game rules
- Contact details for the developer
- The player enters their last name, and select from a dropdown list the politician they want to play as.
	* the players last name, and the politicians first name are combined e.g. myName: Younger, politician: Boris => becomes Boris Younger.
		- consider halving each name, and combining to one e.g. using the example names above, Bornger ? 
- They are granted access to the game

***

###Game : `page2`
- There is a button on the page to start the game
	* also visible is both players names entered in the previous page, and a score counter
- Once clicked, politicians will start flying across the screen left to right and vice-versa
	* the direction will be decided by random
	* politician movement:
		- London-Eye && Big-Ben : steady arc
		- Pavement : straight line
- The cat destination is where the player clicks on the screen
- The cat speed will move in a linear fashion, on an arc trajectory
- When the cat reaches its target and they collide, the player gains a score
- As the game advances, the speed the politicians appear at increases, and therefore could have a number of politicians flying across the screen at the same time


##Notes
- Cartoon of politician faces > or GIFs.
- Make whole window look like newspaper, window where game is.
- Step 1: .Animate method in jQuery. Manipulate the css with Jquery.
	* can move the element across the page with jQuery by continuously looping and adding 10px to the left/right of the element.
- Step 2: make sure you can get the collision detection to work.
- Shrink element as it moves away (for the cat).
- Random animnation on direction of element when it.
- Refresh position on page every 10ms to see if location is the same for 2 elements.

***

# Completed project
====
During the course of the project the game shifted from being a levels based with lives game, to a simply enjoyable fire a cat at a politician game. 

###collisions
The core game logic is based around detecting the collision of two moving div elements. This is done by using the jquery .animate method, and within this the STEP function which runs for every step of the animation. Another tricky bit was getting the cannon to track the mouse and convert the tracking to rotate, done using trigonometry (back to school).

The collission effects are done using the jquery ui database, effect('explode').

The biggest challenge in creating the game was the collision logic. Using the .animate step function, the function runs so fast that when a collision was detected the step function was still running thereby detecting two collisions before stopping. To speed up the detection, a move=false & move=true to immediately change when a collision was detected to stop the function. This worked.

###politician movement
The politician moves using the jquery .animate method left / top. This means the politician moves from its current location to the right, and down. I could not figure out how to get it to move in different directions.

The politician moves to a fixed point on the game board through the above animation. I did have a randomizer function to change the left / top directions to + / -, however this meant the politician was moving off the page. As such it was removed.

###gameboard setup
The initial game board is blank, with just a title, start button and description of the game. On clicking the button a function is run which does css(display, none), and removes the elements from the page. It then by using an array converts hidden arrays (as detailed at the bottom of the CSS page) from visility: hidden, to visible. There is no css opposite of display: none, which is why visibility was used. An annoying side-effect of this is that on the game page the elements are there under the description etc, but invisible, and as such the opening page is longer than it should be.

The cat & politician are created within jQuery. Each time a cat hits a politician, the div elements are removed, and re-created. The styling of the politician was done using CSS.

###preventing the cat firing on clicking the start button
Another challenge on pressing the start button was that it was automatically running the catListen click event and firing the cat immediately. This was solved by adding a setTimeout function of 500ms before running.

###no levels - why?
I decided not to include a levels feature to the game as I found the game enjoyable enough as it was just firing cats at politicians. This is perhaps a feature to add later on. In addition the politician does not speed up, however due to the randomizer function on the move animation, its speed does vary.

###cat movement
The cat moves to where the mouse is clicked by doing a click listener on the pageX and pageY co-ordinates. Given more time I would have liked to fire the cat where clicked, but to continue for a fixed distance. I noticed this by observing others playing that they thought the cat was firing for a fixed distance and couldn't understand why it was falling short of the politician.

***

#Conclusions
====
I was happy with the overall result of the game given this is my first game. It took me two days to figure out the collision event function, and in the end required a little help from the course instructor Alex to figure out the move:true/false quirk of the step function to stop it happening.
Given more time I would have liked to include different speeds, lives and levels to make the game more interesting, but with the short amount of time I focused on improving the styling of the game once the core logic was figured out.

The final bug I would have liked to iron out was stopping the politician moving right and down, and allowing it to move in all directions while finishing within the game container.