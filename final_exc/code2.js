function process_(data){
  // console.log(data);
  // jQuery('#city_temperature').html(data.main.temp)
  //create a table 250 x 3
  // rank, title, imdb rating
  counter = 0;
  jQuery('#list_').append("<table>");
  jQuery('#list_').append("<tr><th>Number</th><th>Title</th><th>imdb rating</th></tr>");


  for (var j = 0; j < data.items.length; j++){
    to_add = ""
    to_add += "<tr>"
    // to_add +="<tr>"

    to_add +="<td>";
    to_add +=counter++;
    to_add +="</td>";


    to_add +="<td>";
    to_add +=data.items[j].title;
    to_add +="</td>";

    to_add +="<td>";
    to_add +=data.items[j].imDbRating;
    to_add +="</td>";

    to_add +="</tr>";
    jQuery('#list_').append(to_add)
  }

  jQuery('#list_').append("</table>");
  // alert("sad")
}

function call_ajax(){
  // alert("asd")
  $.ajax(
    {
      url: `https://imdb-api.com/en/API/Top250Movies/k_eu3xrtjw`,
      type: 'GET',
      success: process_
    }
  )
}

function setup(){
  // alert('asd')
  // jQuery('#get_temperature_button').click(call_ajax)
  call_ajax()
}

jQuery(document).ready(setup)
