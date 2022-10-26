const nthColumnPicked = 2;
const maxIterations = 3;
const row = 7;
const column = 3;
const cardPicked = 4;

function findLocationAtEnd() {
    let allCards = [];
    for (let i = 1; i <= (row * column); i++) {
        allCards.push(i)
    }
    console.log("initial set of cards is=");
    console.log(allCards);
    //build the initial nested array with 3 columns (like cards on table)
    let cardArray = createNestedArray(allCards, cardPicked);
    console.log("pick card & view cards in grid=");
    console.log(cardArray);

    let cardColumn = getIndexOfCard(cardArray, 'card');
    let columnOrder = getColumnOrder(cardColumn);
    console.log("card is in " + cardColumn + " column so order tp pick up is : " + columnOrder);

    let finalCardArray = findFinalArray(cardArray, columnOrder);
    console.log(finalCardArray);
}



function findFinalArray(nestedArray, columnOrder) {
    
    for (let i = 1; i <= maxIterations; i++) {
            //"pick up) (aka flatten array) and reorder cards
            let newCardOrder = flattenAndReorderCards(nestedArray, columnOrder);
            console.log("flattened new card order for " + i + " iteration");
            console.log(newCardOrder);

            //"deal" newly ordered cards into new nested array
            nestedArray = createNestedArray(newCardOrder, cardPicked);
            console.log("nested new card order for " + i + " iteration");
            console.log(nestedArray);

            //find out which column the card is in now
            let cardColumn = getIndexOfCard(nestedArray, 'card');

            // figure out the order of columns to pick up again based on where the card is
            columnOrder = getColumnOrder(cardColumn);
            console.log("card is in " + cardColumn + " column so order tp pick up is : " + columnOrder);
    }

    return nestedArray;
}

//return column order in which to pick up cards, given an array and the column of the card (this assumes pick up the right column SECOND)
function getColumnOrder(cardColumn) {
    //pick up that column 2nd
    //create order of column picked up in array
    let columnOrder = [];
    if (cardColumn-1 >= 0) {
        columnOrder.push(cardColumn-1, cardColumn);
    } else if (cardColumn+1 <= column-1) {
        columnOrder.push(cardColumn+1, cardColumn)
    }
    let remainingColumns = 0;
    while (remainingColumns <= column - 1) {
        //if the remaining columns are not already in the array, push them in
        if(columnOrder.indexOf(remainingColumns) === -1) {
            columnOrder.push(remainingColumns);
            }
        remainingColumns++;
      }
      return columnOrder;
}




function getIndexOfCard(arr, card) {
    for (let i = 0; i < arr.length; i++) {
      let index = arr[i].indexOf(card);
      if (index > -1) {
        //return the column that the card is
        return index;
      }
    }
  }

function createNestedArray(array, cardPicked) {
    let nestedArray = [];
    let startEachRow = 0;
    for (let i = 0; i < row; i++) {
        let subArray = [];
        for (let j = startEachRow; j < startEachRow + column; j++) {
            if(array[j] === cardPicked) {
                subArray.push("card");
            }
            else subArray.push(array[j]) 
        }
        nestedArray.push(subArray);
        startEachRow = startEachRow + column;
    }
    return nestedArray;
}

function flattenAndReorderCards(nestedArray, columnOrder) {
    let flatten = nestedArray.flatMap(num => num);
    let newCardOrder = [];
    //"pick up" cards in the order that is needed (every 3rd card based on the column order)
    //for as many columns as their are
    for (let i = 0; i < columnOrder.length; i++) {
        //cycle through the columns in their order, and push each numbers from each column into new array
        for (let j = columnOrder[i]; j < (row*column); j = j + column)
            newCardOrder.push(flatten[j]);
            }
    return newCardOrder;
}

findLocationAtEnd();