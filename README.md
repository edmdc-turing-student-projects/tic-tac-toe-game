# Solo project: Tic Tac Toe

Create a playable game of tic tac toe from beginning to end. Each player's wins and previous victory game board should be displayed on their respective side of the game board. These victory game boards should be a small modal of the winning game board. They should also persist accross refreshes a.k.a be stored in local storage. 
This app has very light functionality beyond the game itself. Possible extensions include: adding player names, resetting victory count, and choosing an unique token from an array of options.  


Creating the logic was a steady challange. I decided to build the game board as an array with three arrays each containing three elements. This gave the game board a natural structure that could easily accessed. The first level of the array being the rows, and the second level the columns. 
I drew out all the possible win scenarios, and a schema of possible paths to get there. These diagrams though kinda messy, helped me decide that arrays and their methods were the way to go. Here's what some of notes looked like: 

![tic_tac_toe_game_plan 0](https://user-images.githubusercontent.com/60306770/79937145-5c3efc00-8416-11ea-8a6e-9a4f363d6b2c.jpg)
![tic_tac_toe_game_plan 1](https://user-images.githubusercontent.com/60306770/79937165-64973700-8416-11ea-8ccf-a851a2fa2fb0.jpg)
  
Once I started writting code, I found myself trying to solve too big a problem with one function. I used some pesudocode and kept reminding myself to keep the test to a single colum or row. During these early times, I often found myself wanting to create a test suite to break down the problem and incrementally add functionality. I adopted this mindset and took all the functionality a step at a time.

I began checks for win scenarios with the center row. I based my check off a filter method, given that a row win will have all its three elements equal one another, hence it's length would be three. If this condition is met, the player claim the win function which saves the current game board to their wins and resets the game. 

The check on the columns was the trickier of the three checks. Finding a way to keep the second index (column number) constant while iterating over the different rows proved somewhat challenging. I found myslef trying to do all the columns at once, so I circled back to a testing mentality. Focusing on the center column allowed to see what the process for all other columns would look like, and the challange was overcome.  

I did use a bit of hard coded logic for the diagonal, since this seemed the best approach on these win scenarios.

Checking for a draw was a lesson in stepping back and seeing the bigger picture. I had being working mostly within the scope of other functions so that the bigger picture began to be lost to me. I was keeping a counter on all the dead ends, which proved difficult given all the possible paths to a draw and last minute win. It took a moring off to realize the thin I had to keep count off was the player turns, a more constant source of game completion. Everything else was already set up, and it actrually cleaned up my code some. 


![Name input validation](https://media.giphy.com/media/dCcb7gHSuYEGu96Djo/giphy.gif)

This was added feature I decided to add to personalize the game some. The user is able to input their name on first load, and only on first load using local storage. The player names will be displayed on their respective columns. We can see this information reset later in the game. 


![Each player can win](https://media.giphy.com/media/gHhCCm1VKAn6y1ZwDc/giphy.gif)

We can see that when a player wins the winning game board is displayed under their column which also displays their number of wins. A little less obvious feature is that once the game completes no other tokens can be placed. 

![There can be draw](https://media.giphy.com/media/huJ3hM41NOtMopLrN8/giphy.gif)

Here we can see that a draw is also possible. The result of each game is displayed for two seconds before it resets. 

![Both players colums are able to scroll when content overflows](https://media.giphy.com/media/Lq00GeNwIWzwtQV5k9/giphy.gif)

Here we can see how the content is able to overflow, when the amount of wins is greater than the space allocated to its display.

![Data persist accross refreshes](https://media.giphy.com/media/m9Y5G0edTX0ovFXnAr/giphy.gif)

Here, the brief display of the initial input form is an indication of a hard page refresh. Since player names have been stored it doesn't ask for an another input. We can see all the previous wins continue to be displayed.


![We can also restart a gaming session by clearing local storage](https://media.giphy.com/media/WqdsqgeO1q3htPHVYq/giphy.gif)

As an added functionality, I allowed the users to easily clear all previous wins to start a new gaming session. 
