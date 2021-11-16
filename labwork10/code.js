
// say_Hello = function(){
//   alert("Hello, World!")
// }
// x = 5 // this is just a variable's dectration and inilization
// x = x + 1
// alert(x) // this is how you would read a variable
// y = `blah blah` // y is a string variable
// // `blah blah ` a string literal value
// alert( x + 1 ); // this should display 7
// alert(x + (11/2)); //
// z = "!"
// alert(y + z)
add = function()
{
    x = parseInt(jQuery('#op1').html()); // html() is a getter
    y = parseInt(jQuery('#op2').html());
    // alert(x + y) //now, adition not concatenation anymore
    z = x + y // processing
    jQuery('#result').html(z); // html(inout) is a setter
}

setup = function()
{
    jQuery('#trigger_the_add').click(add)
}

jQuery(document).ready(setup)
