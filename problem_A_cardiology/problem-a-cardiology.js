const rows = 9;
const columns = 3;
//CHANGE INPUTS ABOVE TO TEST//

//lay out all the cards given rows & columns above
let allCards = [];
for (let i = 1; i <= (rows * columns); i++) {
    allCards.push(i)
}

//given the card's column is picked up pth, find the final stable location & max iterations to get there
function findFinalStableLocation(pthColumnPicked) {
    let finalI;
    let finalJ;
    let finalS;
    
    let currentRow;
    let currentColumn;

    let maxIterations = 0;

    //"test" the trick 10 (or however many!) times with a random card each time
        //in order to find the stable location & maximum number of iterations (shuffles/redeals) needed to get there
    for (let i = 0; i < 10; i++) {
        //let computer pick any random card
        let chosenCard = chooseRandomCard(rows, columns);
        
        let nestedArray = createNestedArray(allCards, chosenCard);

        //find the new the location of the chosenCard
        currentRow = getRow(nestedArray, "card");
        currentColumn = getColumn(nestedArray, "card");

        //temp variables to hold stuffs
        let startingRow;
        let startingColumn;
        let currentArray = nestedArray;

        //reset how many iterations it takes to stabilize the location for each test
        let iterationsToStabilize = 0;

        do {
            //set the starting location to the current one
            startingRow = currentRow;
            startingColumn = currentColumn;
            //"shuffle and deal" to get the next location of the card
            let newCardOrderNested = newCardLocation(currentArray, getOrderToPickUp(pthColumnPicked, startingColumn));
            //set current location to the new location of the card
            [currentRow, currentColumn] = [getRow(newCardOrderNested, "card"), getColumn(newCardOrderNested, "card")];
            iterationsToStabilize++;
            currentArray = newCardOrderNested;
            } 
            //as long as the starting location is NOT the same as the current/new location
                //because once it is the same, the card has stabilized
            while (startingRow != currentRow || startingColumn != currentColumn);
        
        //always update maxIterations to the maximum # needed to stabilize 
            //(subtract 1 because we ran through the do-while loop one extra time to ensure card was stable)
        if (iterationsToStabilize - 1 > maxIterations - 1) {
            maxIterations = iterationsToStabilize - 1;
        }
    }
    finalI = currentRow;
    finalJ = currentColumn;
    finalS = maxIterations;

    return [finalI, finalJ, finalS];
}


//test out picking up the card's column each pth time, see which will get the stabilized card closest to middle, & then return all final values
function findPthColumn() {
    //put closness to middle calculations in an arry
    let closenessToMiddle = [];
    //ideally the card ends up in the very middle (idealRow, idealColumn)
    let idealRow = rows/2;
    let idealColumn = columns/2;

    //try each pth column (p=0 means picking up the card's column first)
    for (let p = 0; p < columns; p++) {
        //find the card's stable row and column
        console.log("if card's column is picked up " + (p + 1) + "th then...");
        let actualRow = findFinalStableLocation(p)[0];
        let actualColumn = findFinalStableLocation(p)[1];
        console.log("stable row is = " + (actualRow + 1));
        console.log("stable column is = " + (actualColumn + 1));
        //calculate how close to the center that locations is
        let calculation = (idealRow - actualRow) + (idealColumn - actualColumn);
        console.log("and the closeness to middle score is = " + calculation);
        closenessToMiddle.push(calculation);
    }
    //find which calculation is closes to 0 (closest to 0 = closest to middle of grid)
    let closestZero = 0;
    for (let i = 0; i < closenessToMiddle.length ; i++) {
        if (closestZero === 0) {
            closestZero = closenessToMiddle[i];
        } else if (closenessToMiddle[i] > 0 && closenessToMiddle[i] <= Math.abs(closestZero)) {
            closestZero = closenessToMiddle[i];
        } else if (closenessToMiddle[i] < 0 && - closenessToMiddle[i] < Math.abs(closestZero)) {
            closestZero = closenessToMiddle[i];
        }
    }
    //the index in the closenessToMiddle array that's closest to 0 corresponds to the pth column to pick up
    let pthColumn = closenessToMiddle.indexOf(closestZero);

    console.log("FINAL ANSWER:");
    return [ //adding 1 to some of these because arrays start at 0 but output expected starts at 1
        pthColumn + 1, //pth column to pick up
        findFinalStableLocation(pthColumn)[0] + 1, //stable row
        findFinalStableLocation(pthColumn)[1] + 1, //stable column
        findFinalStableLocation(pthColumn)[2] //max number of iterations
    ]
}

console.log(findPthColumn());



//find new card location for just 1 iteration
function newCardLocation(nestedArray, orderPickUp) {
    //flatten array to make it easier to "pick up & deal"
    let flatten = nestedArray.flatMap(num => num);
    let newCardOrder = [];
    //for as many columns as there are
    for (let i = 0; i < columns; i++) {
            //"pick up" every nth card based on how many columns there are, starting with the column to pick up first
        for (let j = orderPickUp[i]; j < (rows * columns); j = j + columns)
            newCardOrder.push(flatten[j]);
        }
    let newCardOrderNested = createNestedArray((newCardOrder));
    return newCardOrderNested;
}

//given the card's column and the pth column to pick up, return an array with the order to pick up the columns
function getOrderToPickUp(pthColumnPicked, cardColumn) {
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
        if (i !== pthColumnPicked) {
            //then add any column to the array that is not the cardColumn
            for (let x = 0; x < remainingColumns.length; x++) {
                if (orderToPickUp.indexOf(remainingColumns[x]) === -1) {
                orderToPickUp.push(remainingColumns[x]);
                break;
                }
            }
        }
        //if it is the time to pick up the column, add that column to array in correct order
        else if (i === pthColumnPicked) {
            orderToPickUp.push(cardColumn);
        }
    }
    return orderToPickUp;
}

function chooseRandomCard(rows, columns) {
    let max = rows * columns;
    const randomNum = Math.floor(Math.random() * max + 1);
    return randomNum;
}

//"lay out the cards" -- created nested array given # of rows and columns
function createNestedArray(flatArray, card) {
    let nestedArray = [];
    let startEachRow = 0;
    for (let i = 0; i < rows; i++) {
        let subArray = [];
        for (let j = startEachRow; j < startEachRow + columns; j++) {
            if(flatArray[j] === card) {
                subArray.push("card");
            }
            else subArray.push(flatArray[j]) 
        }
        nestedArray.push(subArray);
        startEachRow = startEachRow + columns;
    }
    return nestedArray;
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