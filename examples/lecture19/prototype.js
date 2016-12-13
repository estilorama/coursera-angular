/**
 * Created by dbourgon on 12/12/2016.
 */

/*
var parent = {
    value : "parentValue",
    obj: {
        value: "parentObjValue"
    },
    walk: function () {
        console.log('walking!!!')
    }
};

var child = Object.create(parent);

console.log("CHILD", "VALUE", child.value);
console.log("CHILD", "OBJ.VALUE", child.obj.value);
console.log("PARENT", "VALUE", parent.value);
console.log("PARENT", "OBJ VALUE", parent.obj.value);
console.log("CHILD", "VALUE", child.value);

console.log("Parent:", parent);
console.log("Child:", child);

child.value = "childValue";
child.obj.value = "childObjValue";


console.log("*** CHANGED: child.value = 'childValue'");
console.log("*** CHANGED: child.obj.value = 'childObjectValue'");

console.log("CHILD", "VALUE", child.value);
console.log("CHILD", "OBJ.VALUE", child.obj.value);
console.log("PARENT", "VALUE", parent.value);
console.log("PARENT", "OBJ VALUE", parent.obj.value);
console.log("CHILD", "VALUE", child.value);


console.log("Parent:", parent);
console.log("Child:", child);

console.log("child.obj === parent.obj ? :  ", child.obj === parent.obj );


var grandChild = Object.create(child);
console.log("Granchild: ", grandChild);
grandChild.walk();
*/

// Constructor
function Dog (name) {
    this.name = name;
    console.log("'this' is: ", this);
}
// Instance
var myDog = new Dog('Cain');
console.log('myDog',myDog);


Dog('Pepe')