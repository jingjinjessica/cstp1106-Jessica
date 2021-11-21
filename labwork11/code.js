function add() {
  x = parseInt($('#num1').val());
  y = parseInt($('#num2').val());
  z = x + y
  $('#result').html(z);
  $('#history').append(x + ' + ' + y + ' = ' + z + '<br>');
}

function minus() {
  x = parseInt($('#num1').val());
  y = parseInt($('#num2').val());
  z = x - y
  $('#result').html(z);
  $('#history').append(x + ' - ' + y + ' = ' + z + '<br>');

}

function multiply() {
  x = parseInt($('#num1').val());
  y = parseInt($('#num2').val());
  z = x * y
  $('#result').html(z);
  $('#history').append(x + ' * ' + y + ' = ' + z + '<br>');

}

function divide() {
  x = parseInt($('#num1').val());
  y = parseInt($('#num2').val());
  z = x / y
  $('#result').html(z);
  $('#history').append(x + ' / ' + y + ' = ' + z + '<br>');

}

function show_() {
  $('#history').show()
}

function hide_() {
  $('#history').hide()
}

function setup() {
  $('#trigger_add').click(add);
  $('#trigger_minus').click(minus);
  $('#trigger_multiply').click(multiply);
  $('#trigger_divide').click(divide);
  $('#show').click(show_);
  $('#hide').click(hide_);
}

$(document).ready(setup)
