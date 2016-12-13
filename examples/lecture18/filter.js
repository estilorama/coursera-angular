/**
 * Created by dbourgon on 12/12/2016.
 */

var numberArray  =  [1,2,3,4,5,6,7,8,9,10];
console.log('Number Array' , numberArray);


function above5Filter (value) {
    return value > 5;
}
function below5Filter (value) {
    return value < 5;
}

var filteredNumberArray = numberArray.filter(above5Filter);

console.log('Filtered number Array:  ', filteredNumberArray);



var shoppingList1 = [
    'Milk', 'Donuts', 'Cookies', 'Chocolate', 'Peanut Butter', 'Pepto Bismol', 'Pepto Bismol (chocolate flavour)', 'Pepto Bismol (Cookie flavour)'
];

var searchValue = "Bismol";
function containsFilter (value) {
    return value.indexOf(searchValue) !== -1;
}

var filteredShoppingList1 = shoppingList1.filter(containsFilter);

console.log('filtered shopping list', filteredShoppingList1);