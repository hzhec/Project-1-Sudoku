# GA Project 1 Details - Sudoku

<h2>About</h2>


<p>Sudoku is a logic-based, combinatorial number-placement puzzle.</p> 
<p>Its objective is to fill a 9x9 grid with numbers so that each column/row/subgrid (3x3 box) contain all of the numbers from 1 to 9.</p>

<img src="https://github.com/hzhec93/Project-1-Sudoku/assets/127362399/b71134b7-69d0-4f79-ac3f-72bbec25fcc3" width="600">
<br><br>
<span>GitHub page: https://hzhec.github.io/Project-1-Sudoku/</span>

<h2>Approach Taken</h2>
<ol>
  <li>Create a 9x9 grid box</li>
  <li>Generate and display sudoku puzzle onto 9x9 grid box</li>
  <li>Create number buttons and add event listener for input purpose</li>
  <li>Create a new game button to load sudoku puzzle</li>
  <li>Display message when a number button is clicked</li>
  <li>Add event listener to 9x9 grid box</li> 
  <li>Add functions to check for duplicate number along row/column/subgrid</li>
  <li>Add solve function to solve the sudoku puzzle</li>
  <li>Change style when no duplicate number is found along row/column/subgrid</li>
  <li>Add timer to sudoku puzzle</li>
  <li>Change input method from clicking to drag-and-drop</li>
  <li>Add scoreboard to track top 10 players results (Updated: using firebase instead of localStorage</li>
  <li>Add Media Query of max-width: 750px</li>
</ol>

  
<h2>How To Play</h2>
<p> Sudoku is played on a grid of 9x9 grid. Within the rows and columns are 9 subgrids (made up of nine 3x3 "squares"). </p>
<p>Each row, column and subgrid needs to be filled out with the numbers 1 to 9, without repeating any numbers within the row, column or square</p>

<h2>Tips for Beginners</h2>
<ul>
  <li><b>Look for easy play first</b> - crowded row/column/subgrid that is almost full of numbers. This way you can quickly use process of elimination to figure out where to place a number.</li>
  <li><b>Look for which numbers are missing</b> - is about placing digit where they don't already exist. If a number already exists in a row/column/subgrid, then that number cannot be placed again.</li>
  <li><b>Don't (Try not to) guess</b></li>
  <li><b>Keep Moving</b> - if stuck, don't concentrate too hard on one part of the puzzle grid.</li>
  <li><b>Constantly re-evalutate</b> - Ask yourself, if you place a number in a row, how does that number affect corresponding column and subgrid.</li>
</ul>


<h2>Screenshots</h2>

<img src="https://github.com/hzhec93/Project-1-Sudoku/assets/127362399/330bb5ba-2085-4d74-9b3a-b2c1b6da17c0" width="400">
<img src="https://github.com/hzhec93/Project-1-Sudoku/assets/127362399/ed9eb8c6-9624-4cc9-9ac4-5f5adfa6b033" width="400">
<img src="https://github.com/hzhec93/Project-1-Sudoku/assets/127362399/540e92e4-ec7e-4435-b151-f5212b2d9038" width="400">
<img src="https://github.com/hzhec93/Project-1-Sudoku/assets/127362399/31a961da-4db0-4d01-91e3-a214a252d074" width="400">
<img src="https://github.com/hzhec93/Project-1-Sudoku/assets/127362399/4d333887-5b47-4cb8-92ed-6e80d4433254" width="400">
<img src="https://github.com/hzhec93/Project-1-Sudoku/assets/127362399/2a49090b-4855-4f00-913f-3c02ed61c538" width="400">
