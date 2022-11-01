//FIRST STAB ONLY -- NOT A SOLUTION

const nthColumnPicked = 1; //1 is 2nd because array starts with 0
const maxIterations = 3;
const rows = 7;
const columns = 3;

//the below lets the spectator (computer) choose any random card & "finds" the final stable location, but assumes the inputs above

const chosenCard = chooseRandomCard(rows,columns);

function findLocationAtEnd() {
    //take all the cards
    let allCards = [];
    for (let i = 1; i <= (rows * columns); i++) {
        allCards.push(i)
    }
    console.log("initial set of cards is=");
    console.log(allCards);
    //build the initial nested array with 3 columns (like cards on table)
    let cardArray = createNestedArray(allCards, chosenCard);
    console.log("pick card & view cards in grid=");
    console.log(cardArray);

    let cardColumn = getColumn(cardArray, 'card');
    let orderToPickUp = getOrderToPickUp(nthColumnPicked, cardColumn);
    console.log("card is in column " + cardColumn + " so order to pick up is : " + orderToPickUp);

    let finalCardArray = findFinalArray(cardArray, orderToPickUp);
    console.log(finalCardArray);
    console.log("final location is column " + parseInt(getColumn(finalCardArray, 'card') + 1) +
    " and row " + parseInt(getRow(finalCardArray, 'card') + 1));
}

function findFinalArray(nestedArray, orderToPickUp) {
    
    for (let i = 1; i <= maxIterations; i++) {
        //"pick up" (aka flatten array) and reorder cards
        let newCardOrder = flattenAndReorderCards(nestedArray, orderToPickUp);
        console.log("flattened new card order for " + i + " iteration");
        console.log(newCardOrder);

        //"deal" newly ordered cards into new nested array
        nestedArray = createNestedArray(newCardOrder, chosenCard);
        console.log("nested new card order for " + i + " iteration");
        console.log(nestedArray);

        //find out which column the card is in now
        let cardColumn = getColumn(nestedArray, 'card');

        // figure out the order of columns to pick up again based on where the card is
        orderToPickUp = getOrderToPickUp(nthColumnPicked, cardColumn);
        console.log("card is in " + cardColumn + " column so order tp pick up is : " + orderToPickUp);
    }
    return nestedArray;
}


//lays out the cards in a grid with chosenCard indicated
function createNestedArray(array, chosenCard) {
    let nestedArray = [];
    let startEachRow = 0;
    for (let i = 0; i < rows; i++) {
        let subArray = [];
        for (let j = startEachRow; j < startEachRow + columns; j++) {
            if(array[j] === chosenCard) {
                subArray.push("card");
            }
            else subArray.push(array[j]) 
        }
        nestedArray.push(subArray);
        startEachRow = startEachRow + columns;
    }
    return nestedArray;
}


//return column order in which to pick up cards, ASSUMES you pick up the column with chosenCard SECOND (=bad)
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

function flattenAndReorderCards(nestedArray, orderToPickUp) {
    let flatten = nestedArray.flatMap(num => num);
    let newCardOrder = [];
    //"pick up" cards in the order that is needed (every 3rd card based on the column order)
    //for as many columns as there are
    for (let i = 0; i < orderToPickUp.length; i++) {
        //cycle through the columns in their order, and push each numbers from each column into new array
        for (let j = orderToPickUp[i]; j < (rows * columns); j = j + columns)
            newCardOrder.push(flatten[j]);
            }
    return newCardOrder;
}

function chooseRandomCard(rows, columns) {
    let max = rows * columns;
    const randomNum = Math.floor(Math.random() * max + 1);
    return randomNum;
}

findLocationAtEnd();