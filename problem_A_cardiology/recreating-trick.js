const nthColumnPicked = 2;
const maxIterations = 3;
const rows = 7;
const columns = 3;

//this code "finds" the final stable location at the end given the inputs above

//should maybe write a function to find the location of the card for each iteration (output = location of cards)
//then see how many iterations are needed before card is stable

//and should write a function to see which order the column needs to be picked up (this thought not fully formed)

//push out column, row, and iterations needed to get there.
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
    let orderToPickUp = getOrderToPickUp(cardColumn);
    console.log("card is in " + cardColumn + " column so order tp pick up is : " + orderToPickUp);

    let finalCardArray = findFinalArray(cardArray, orderToPickUp);
    console.log("card is in column " + parseInt(getColumn(finalCardArray, 'card') + 1));
    console.log("card is in row " + parseInt(getRow(finalCardArray, 'card') + 1));
    console.log(finalCardArray);
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
            orderToPickUp = getOrderToPickUp(cardColumn);
            console.log("card is in " + cardColumn + " column so order tp pick up is : " + orderToPickUp);
    }

    return nestedArray;
}

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


//return column order in which to pick up cards, given an array and the column of the card (this assumes pick up the right column SECOND)
function getOrderToPickUp(cardColumn) {
    //pick up that column 2nd
    //create order of column picked up in array
    let orderToPickUp = [];
    if (cardColumn-1 >= 0) {
        orderToPickUp.push(cardColumn-1, cardColumn);
    } else if (cardColumn+1 <= columns - 1) {
        orderToPickUp.push(cardColumn + 1, cardColumn)
    }
    let remainingColumns = 0;
    while (remainingColumns <= columns - 1) {
        //if the remaining columns are not already in the array, push them in
        if(orderToPickUp.indexOf(remainingColumns) === -1) {
            orderToPickUp.push(remainingColumns);
            }
        remainingColumns++;
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
    //for as many columns as their are
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