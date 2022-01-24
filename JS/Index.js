
var Mayor;

$("#EdaddSi").click(function () {

    sessionStorage.setItem("MayorEdad", true);
});



$(document).ready(function () {

    Mayor = sessionStorage.getItem("MayorEdad");
  
    
    if (Mayor != null) {
      
    } else {
        $('#ModalEdad').modal({
            backdrop: 'static',
            keyboard: false  // to prevent closing with Esc button (if you want this too)
        })
        $("#ModalEdad").modal("show");
    }

  

});