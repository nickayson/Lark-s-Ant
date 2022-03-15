# larksAnt

CPSC 335-03 Algorith Engineering
Project 1:
Team: NS
Nicholas Ayson
Shiv Bhagat

Intro
   - We extend the ant to a “Larks” ant by adding a mode whereby the Larks ant will sometimes ignore the color
    changes but instead continue in a straight line for sequence of cell moves; which requires maintaining some
    state, a countdown. (Larks, or LRCS, means Left-Right-Countdown-Straight.)  
    This works as follows. '  
    First, as usual our K-color sequence is indexed color[0]..color[K-1].  
    Second, each color (equivalently, each color index) can map to one of 3 actions: Turn Left, Turn Right, and
    Straight-Countdown.
    Third, the bot FSM is in one of 3 states/modes: Normal or Straight or Countdown mode.  
    Here is the Larks ant brain FSM processing in detail:  
    1. Read the cell's color, translate to its color sequence index.  
    2. Obtain the action given the color index, & store it in the FSM counter // Just in case  
    If FSM is in Normal mode and an L/R action then  
    3. Change nose direction accordingly  
    Else If FSM is in Normal mode and a Countdown-Straight action then  
    3. Change to Countdown mode & don't change direction  
    Else if FSM is in Countdown Mode then // we'll go straight, no change in direction  
    3a. If FSM counter is non-positive, then change FSM to Normal Mode  
    3b. Decrement the FSM counter & don't change direction  
    4. Increment cell's color modulo the number of colors // ie, with wraparound  
    5. Move to neighbor cell // in nose direction  
    So, the Larks ant is a bit more complex than the TP ant. Sometimes it decides to go straight based on the cell  
    color index (for a count indicated by the previous cell it had been in), and while it goes straight it doesn't try to
    turn until it's finished counting down to zero.  
    Because we'll be running the Larks ant on a finite grid (rectangle) in a browser webpage, we will have the ant
    wrap around to the opposite cell if it tries to “step off” an edge of the grid.  
    The colors will be black, blue, yellow, and red, in that order, with color indexes 0, 1, 2, and 3.  
    The actions will be Turn Left, Turn Right, and Straight-Countdown, with action indexes 0, 1, and 2.  
    The color-action map will be 0 → 0, 1 → 1, 2 → 2, 3 → 1. So the action order is 0121.  
    The Larks #0121 ant will start in an all black 60 by 40 grid (with each grid cell being 10 by 10 pixels) at cell
    location (30,20), and the ant's nose will be facing up (north) toward the cell (0,20) at the top-edge of column 20.  
    The program will be written in P5.js+Javascript with an HTML web page for display (as described in
    lecture). You do not have to show grid lines or row/column numbers.  
    
Zip Contents:
      - File README.txt
      - File larks-ant.js
      - File index.html
      - File p5.js
      - PDF 335-p1-cella-larks-ant.pdf
      - Folder assests:
        -File styles.css
        -File draw-studd.js
           
Setup and Installation:
  1. Extract the .zip file 
  2. Drag and drop the index.html into a either browser.

Sample Invocation / Credts:
  -Credit goes to the professor since we modified his code.
  
 Features:
  - It includes javascript, HTML, CSS and the p5.js library.
 
 Bugs:
  - One that we know of is before the ant goes straight it paints the cell red.
 
![grab-landing-page](https://github.com/nickayson/Lark-s-Ant/blob/main/giphy%20(2).gif)
