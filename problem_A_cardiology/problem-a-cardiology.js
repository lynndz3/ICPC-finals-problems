const rows = 7;
const columns = 3;

//let computer pick any random card
const chosenCard = chooseRandomCard(rows, columns);

function chooseRandomCard(rows, columns) {
    let max = rows * columns;
    const randomNum = Math.floor(Math.random() * max + 1);
    return randomNum;
}

//"deal" the cards out on the table
let allCards = [];
for (let i = 1; i <= (rows * columns); i++) {
    allCards.push(i)
}
console.log("initial set of cards is=");
console.log(allCards);

//created nested array given # of rows and columns
function createNestedArray(flatArray) {
    let nestedArray = [];
    let startEachRow = 0;
    for (let i = 0; i < rows; i++) {
        let subArray = [];
        for (let j = startEachRow; j < startEachRow + columns; j++) {
            if(flatArray[j] === chosenCard) {
                subArray.push("card");
            }
            else subArray.push(flatArray[j]) 
        }
        nestedArray.push(subArray);
        startEachRow = startEachRow + columns;
    }
    return nestedArray;
}
let nestedArray = createNestedArray(allCards);
console.log(nestedArray);
//... to find starting column
let cardColumn = getColumn(nestedArray, "card");

/*given the starting column and nested array...    
    cycle through picking up card's column 1st, 2nd, 3rd, etc (input)
        pick up & redeal (function) - and return new location (recursive?)
            until location is the same twice in a row, then returning # of iterations AND location (row, column) in nested array
            let finalLocations = [
                [3, 3, 2], --if card column picked up 1st, it takes max 2 iterations to end up at (3, 4)  
                [1, 6, 3],
                [3, 5, 2]
            ]
        }*/

function findFinalLocation(nthColumnPicked) {
    //to find MaxIterations loop until the new location of the card is the same as the last location of the card
    let MaxIterations = 0;
    let startingRow = getRow(nestedArray, "card");
    let startingColumn = getColumn(nestedArray, "card");
    while (startingRow != endingRow && startingColumn != endingColumn) {
        //find newCardLocation
    }
}

//find new card location for just 1 iteration
function newCardLocation(nestedArray, orderPickUp) {
    let flatten = nestedArray.flatMap(num => num);
    let newCardOrder = [];
    //"pick up" cards in the order that is needed (every 3rd card based on the column order)
    //for as many columns as there are
    for (let i = 0; i < columns; i++) {
        //cycle through the columns in their order, and push each numbers from each column into new array
        for (let j = orderPickUp[i]; j < (rows * columns); j = j + columns)
            newCardOrder.push(flatten[j]);
        }
    let newCardOrderNested = createNestedArray((newCardOrder));
    console.log(newCardOrderNested);
    let newCardLocation = [getRow(newCardOrderNested, "card"), getColumn(newCardOrderNested, "card")];
    return newCardLocation;
}



console.log("new card location is ");
console.log(newCardLocation(nestedArray, getOrderToPickUp(2, cardColumn)));


function getOrderToPickUp(nthColumnPicked, cardColumn) {
    //pick up cardColumn nth (pick up the 2 column 1st = (0, 1))
    //create an array to hold the other columns that don't have the "card"
    let remainingColumns = [];
    for (let j = 0; j < columns; j++) {
        if (cardColumn != j) {
            remainingColumns.push(j);
        } 
    }
    //create array to hold the order that the columns should be picked up
    let orderToPickUp = [];

    for (let i = 0; i < columns; i++) {
        //if it is not the time to pick up the column...
        if (i !== nthColumnPicked) {
            //then add any column to the array that is not the cardColumn
            for (let x = 0; x < remainingColumns.length; x++) {
                if (orderToPickUp.indexOf(remainingColumns[x]) === -1) {
                orderToPickUp.push(remainingColumns[x]);
                break;
                }
            }
        }
        //if it is the time to pick up the column, add that column to array in correct order
        else if (i === nthColumnPicked) {
            orderToPickUp.push(cardColumn);
        }
    }
    return orderToPickUp;
}


function getColumn(arr, card) {
    for (let i = 0; i < arr.length; i++) {
      let index = arr[i].indexOf(card);
      if (index > -1) {
        //return the column that the card is
        return index;
      }
    }
  }

function getRow(arr, card) {
    for (let i = 0; i < arr.length; i++) {
      let index = arr[i].indexOf(card);
      if (index > -1) {
        //return the row that the card is
        return i;
      }
    }
  }


/*function to take rows and columns from above as inputs and return new array with how close they are to middle
        if 7 rows and 3 columns, 
        middle is (3.5, 1.5)
        |3.5 - 3| + |1.5 - 2| = 0
        let closenessToMiddle = [0, -4, -2]

  find the index of the smallest number and that = column to be picked up -- also references the array above

  return the correct index of the array from finalLocations plus the column to be picked up*/