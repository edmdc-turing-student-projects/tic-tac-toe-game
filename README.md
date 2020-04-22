# Solo project: Tic Tac Toe

Create a playable game of tic tac toe from beginning to end. Each player's wins and victory game board should be displayed on their respective side of the game board. These victory game boards should be a small modal of the actual game board. They should also persist accross refreshes. 
This app has very light functionality beyond the game itself. Possible extensions include: adding player names, resetting victory count, and choosing an unique token from an array of options.  


Creating the logic was a steady challange. I decided to build the game board as an array with three arrays each containing three elements. At first, I played around with the idea of using an object for the game board, but two main reason steered me away from doing so. First, many of the methods involved for checking the winning scenario would require turning said object into an array adding an extra step, and the nature of the data did not require the specificity of key value pairs that give objects their advantage over arrays (in my opinion).  

I drew out all the possible win scenarios, and a schema of possible paths to get there. These diagrams though kinda messy, helped me decide how best to approach the check for a win. Wether with a series of if else conditions or as array data sets. After drawing out the second diagram, the choice was obvious. I could create functions that would contain certain logic paths to be repeatedly called rather than creating logic path to a win.
  
Once I started writting code, I found myself trying to solve too big a problem with one function. I used some pesudocode and kept reminding myself to keep the test to a single colum or row. During these early times, I often found myself wanting to create a test suite to break down the problem and incrementally add functionality. Given my current ability, and project time constraint/scope, I abandoned the idea after an hour or so of reasearh into the topic. With three or so days more, one of them for relevant lessons/learning, it's a challenge I would have like to pursue. 

I began checks for win scenarios with the center row. I based my check off a filter method, given that a row win will have all its three elements equal one another, hence it's length would be three. If this condition is met, we invoke the claimWin function which saves the current game board and resets the game. 

The check on the columns was the trickier of the three checks. Finding a way to keep the child index (column number) constant while iterating over the different rows proved somewhat challenging. This was mostly due to the fact that I tried to do all rows at once rather than breaking it down to each row, and I wa adamant of gaining some experience in using the forEach() array prototype method. Once I kept the check to one row, I was able to more efficiently break down the solution of checking for all the rows. 

I did use a bit of hard coded logic for the diagonal, since this seemed the best approach on this instance. The current function could use some refactoring but will require furtehr thinking. 

I created a counter to keep track of the times the checks ran t failure. I played the game to different draw scenarios, keeping in mind that there are a set number of turns per game, but many paths to a draw. After seeing that most often, the check ran a number of 39 times, I was able to code in a condition to restart the game if these scenarios were reached. 

In drawing out the logic, I realized the limitations of pseudocode and the advantages of drawing out the different paths in paper. I believe it made the difference it gathering together a game plan, no pun intented, to approch this project. 

###Working with local storage:

// Interjecting this loop proved tricker than I initially thought, mainly due to the fact that at the heart of them I used the current game board a (global variable in our script) to create the rendering. I wanted to display the previous wins without employing our game board variable. I just had to figure out where in the function chain I could define a local variable to house our current winning game board and pass that around as an argument. This would allow me to interchange the winning game board array for each of our winning arrays.  

[Name input validation] (https://media.giphy.com/media/dCcb7gHSuYEGu96Djo/giphy.gif)

[Each player can win] (https://media.giphy.com/media/gHhCCm1VKAn6y1ZwDc/giphy.gif)

[There can be draw] (https://media.giphy.com/media/huJ3hM41NOtMopLrN8/giphy.gif)

[Both players colums are able to scroll when content overflows] (https://media.giphy.com/media/Lq00GeNwIWzwtQV5k9/giphy.gif)

[Data persist accross refreshes] !(https://media.giphy.com/media/m9Y5G0edTX0ovFXnAr/giphy.gif)

[We can also restart a gaming session by clearing local storage] (https://media.giphy.com/media/WqdsqgeO1q3htPHVYq/giphy.gif)

