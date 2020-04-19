// Create central game board on the DOM
// Connect Game data model to the DOM

//  the main game board class name is game-board quite specific. given 
// that the main functionality is happeing here, it should be out main query selector 
// and event listener. Maybe game container is a better choice since we must also change the game title 
// Other candidates for query selectors are player info sections, really with can make do with those three.  
// The trickiest part of this page will be attaching the DOM event on the game board to
// the player funciton of deciding token placement and updating 
// our data model game  board accordingly 
// the other game landmarks, win or draw, should be a little easier to intergrate. 
// All in all, the hard part was getting the gane working 