$(document).ready(function() {
  var BmrCalc1 = new Bank();

  $('#Male').click(function(){
    BmrCalc1.reset()
    var age = $('#age').val();
    var height = $('#Height').val();
    var weight = $('#Weight').val();

    // var result = 10*weight+6.25*height-5*age+5;
    BmrCalc1.male(age, height, weight)

    var result = BmrCalc1.getBmr();

    $('#bmr').text(result);
  });


  $('#Female').click(function(){
    BmrCalc1.reset()
    var age = $('#age').val();
    var height = $('#Height').val();
    var weight = $('#Weight').val();

    console.log(age + " " + height + " " + weight);

    BmrCalc1.female(age, height, weight)
    // var result = 10*weight+6.25*height-5*age-161;
    //
    // console.log("Result " + result);

    var result = BmrCalc1.getBmr();

    $('#bmr').text(result);
  });


});
