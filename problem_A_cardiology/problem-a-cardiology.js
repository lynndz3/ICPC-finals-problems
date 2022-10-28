const rows = 7;
const columns = 3;

//let computer pick any card
const chosenCard = chooseRandomCard(rows,columns);

function chooseRandomCard(rows, columns) {
    let max = rows * columns;
    const randomNum = Math.floor(Math.random() * max + 1);
    return randomNum;
}
//created nested array given # of rows and columns

//given chosenCard and nested array, return the card's starting location

//iterate through picking up card's column 1st, 2nd, 3rd, etc (input)
    //given a column order in which to be picked up and starting location,
        //iterate through picking up & redealing (function) - return new location
            //until location is the same twice in a row, returning # of iterations AND location (row, column)