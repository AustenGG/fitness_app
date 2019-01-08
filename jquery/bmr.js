$(document).ready(function() {
  var thermostat = new Thermostat();
  getCurrentTemperature();

  $('#temp-up').click(function() {
    thermostat.up();
    getCurrentTemperature();
  });

  $('#temp-down').click(function() {
    thermostat.down();
    getCurrentTemperature();
  });

  $('#temp-reset').click(function() {
    thermostat.resetTemperature();
    getCurrentTemperature();
  });

  $('#psm-on').click(function() {
    thermostat.switchPowerSavingModeOn();
    $('#power-saving-status').text('on')
    getCurrentTemperature();
  })

  $('#psm-off').click(function() {
    thermostat.switchPowerSavingModeOff();
    $('#power-saving-status').text('off')
    getCurrentTemperature();
  })

  $.get('http://api.openweathermap.org/data/2.5/weather?q=London&appid=a3d9eb01d4de82b9b8d0849ef604dbed&units=metric', function(data) {
    $('#current-temperature').text(data.main.temp);
  })

  $('#current-city').change(function() {
  var city = $('#current-city').val();
  $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=a3d9eb01d4de82b9b8d0849ef604dbed&units=metric', function(data) {
    $('#current-temperature').text(data.main.temp)
  })
})
  function getCurrentTemperature() {
    $('#temperature').text(thermostat.temperature);
    $('#temperature').attr('class', thermostat.energyUsage());
    };
});
