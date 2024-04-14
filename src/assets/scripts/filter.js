$(document).ready(function(){
    $("#socio-buscar").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("#grupo > div").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
  });