/**
 * Created by dbourgon on 16/12/2016.
 */

(function(){

    'use strict';
    angular.module('ThisApp', [])
        .controller('ThisController', ThisController);

    function ThisController () {

    }

})();



/**
 * Pruebas
 * @constructor
 */

function Person (name, fav) {
    this.fullName = name || "Yaakov";
    this.fav = fav || "Cookies";

    this.describe = function () {
        console.log('"this" is:', this);
        console.log(this.fullName+ ' likes '+ this.fav);
    };
}

var yaakov = new Person();
yaakov.describe();

var david = new Person('david' , 'metal');


var describe = yaakov.describe;
describe();

describe.call(yaakov);

