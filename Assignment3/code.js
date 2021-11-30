function changeName() {
  $('#thumbnail').attr('src', $(this).attr('src'))
}

function setup() {
  $('.image_selection').click(changeName)
}

$(document).ready(setup)
