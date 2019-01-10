'use strict';

function BmrCalc() {
   this.bmr = 0;
   this.height = 0;
   this.weight = 0;
   this.age = 0;
 }

  BmrCalc.prototype.getBmr = function() {
    return this.bmr;
  };

  BmrCalc.prototype.reset = function() {
    this.bmr = 0;
  };
  BmrCalc.prototype.height = function(height) {

     this.height += height;
  }

  BmrCalc.prototype.weight = function(weight) {
     this.weight += weight;
  }

  BmrCalc.prototype.age = function(age) {
     this.age += age;
  }

  BmrCalc.prototype.male = function(age, height, weight) {

     var result = 10*weight+6.25*height-5*age+5;

     this.bmr += result;
  }

  BmrCalc.prototype.female = function(age, height, weight) {

     var result = 10*weight+6.25*height-5*age-161;

     this.bmr += result;
  };
