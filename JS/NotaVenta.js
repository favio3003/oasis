

var Carritos;
var Imagenes;
var Productos;
var IdUsusriolog;


function finaldetransaccion() {
   

    window.open('https://wa.me/59165887244?text=Hola,%20Realice%20un%20pedido');
    window.location.href = "/Home/Index";

}

function mostraSeccion2() {

    $("#step-1").hide();
    $("#Menustep-1").attr('style', 'background:#c1c1c1');
    $("#Menustep-2").attr('style', 'background:#1a5b30');
    $("#Menustep-3").attr('style', 'background:#c1c1c1');
    $("#step-2").show();
    $("#step-3").hide();


    var totalnota = 0;
    var Ordendetalle = [];
    for (var i = 0; i < Carritos.length; i += 1) {

        var Carritoslis = Carritos[i];
        var nombre;
        var Precio;
        var Cantidad;
        $.each(Productos, function (index, elemento) {
            if (Carritoslis.IdProducto == elemento.IdProducto) {
                nombre = elemento.Nombre;
                if (elemento.PrecioOferta != 0) {
                    Precio = elemento.PrecioOferta;
                }
                else {
                    Precio = elemento.Precio;
                }
                Cantidad = elemento.Cantidad;
            }

        });




        var total = Precio * Carritoslis.Cantidad;

        totalnota = totalnota + total;
  
        Ordendetalle[i] = {
            IdCarrito: Carritoslis.IdCarrito,
            Nombre: nombre,
            Cantidad: Carritoslis.Cantidad,
            Precio: Precio,
            Total: total,
      

        }

    }
    $("#TotalPedido").empty();
    $("#Subtotaaldetalle").empty();
    var totalpedido = totalnota + 30;
    $("#TotalPedido").append("Bs. " + totalpedido);
    $("#Subtotaaldetalle").append("Bs. " + totalnota);

    $('#griddetallenota').dxDataGrid({
        dataSource: Ordendetalle,
        columns:

            [
                {
                    dataField: 'Nombre',
                    caption: 'NOMBRE',
                    alignment: 'left',
                },
                {
                    dataField: 'Cantidad',
                    caption: 'CANTIDAD',
                    alignment: 'left',
                },
                {
                    dataField: 'Precio',
                    caption: 'PRECIO',
                    alignment: 'left',
                },
                {
                    dataField: 'Total',
                    caption: 'SUB TOTAL',
                    alignment: 'left',
                },
                
                ],



           
     
        showBorders: true,

        dataRowTemplate(container, item) {
            const { data } = item;
            const markup = '<tr class=' + 'TablaCompleta' + ' onclick = "EditarProducto(' + data.IdCarrito + ')" >'
                + `<td>${data.Nombre}</td>`
                + `<td>${data.Cantidad}</td>`
                + `<td>${data.Precio}</td>`
                + `<td>${data.Total}</td>`
           
                + '</tr>'


            container.append(markup);
        },
    });
}

function notadetalleGuardado() {

    $.each(Carritos, function (index, elementos) {



        var Carrito = {
            IdCarrito: elementos.IdCarrito,
            Cantidad: elementos.Cantidad,
            IdProducto: elementos.IdProducto,
            IdUsuario: elementos.IdUsuario,
            Estado: 2

        };
        var Carritodto = JSON.stringify(Carrito);

        $.ajax({

            url: "/Carrito/GuardarCarrito",
            data: { pCarrito: Carritodto },
            type: "GET",
            dataType: "json",

        })
            .done(function (data, textStatus, jqXHR) {

             




            })
            .fail(function (jqXHR, textStatus, errorThrown) {

                console.log("La solicitud a fallado: " + textStatus);

            });

    });

    $.each(Carritos, function (index, elementos) {
        $.each(Productos, function (index, elemento) {
            if (elementos.IdProducto == elemento.IdProducto) {

                var Producto = {
                    IdProducto: elemento.IdProducto,
                    Nombre: elemento.Nombre,
                    DescripcionCorta: elemento.DescripcionCorta,
                    DescripcionLarga: elemento.DescripcionLarga,
                    Precio: elemento.Precio,
                    PrecioOferta: elemento.PrecioOferta,
                    DireccionImagen: elemento.DireccionImagen,
                    Cantidad: elemento.Cantidad - elementos.Cantidad,
                    Carcteristica: elemento.Carcteristica,
                    Tipo: elemento.Tipo,
                    Estado: elemento.Estado,
                    Usuario: elemento.Usuario
                };
                var Productodto = JSON.stringify(Producto);



                $.ajax({

                    url: "/Producto/GuardarProducto",
                    data: { Producto: Productodto },
                    type: "POST",
                    dataType: "json",

                })
                    .done(function (data1, textStatus, jqXHR) {


                 


                    })
                    .fail(function (jqXHR, textStatus, errorThrown) {

                        console.log("La solicitud a fallado: " + textStatus);

                    });



            }

        });
    });


    finaldetransaccion();





}

function RegistrarNotaExitosa() {
    $("#Menustep-1").attr('style', 'background:#c1c1c1');
    $("#Menustep-2").attr('style', 'background:#c1c1c1');
    $("#Menustep-3").attr('style', 'background:#1a5b30');
    $("#step-1").hide();
    $("#step-2").hide();
    $("#step-3").show();


    $.ajax({

        url: "/Nota/obtenerNotaVenta",
        data: {},
        type: "POST",
        dataType: "json",

    })
        .done(function (NotaVenta, textStatus, jqXHR) {



            var notalist = NotaVenta.Data.Data
            
            let date = new Date();
            let output = date.toISOString().split('T')[0];

            var fechaSplit = output.split("-");
            var fecha = new Date(Number(fechaSplit[0]), Number(fechaSplit[1]) - 1,
                Number(fechaSplit[2]), 0, 0, 0);
            fechaJson = "/Date(" + fecha.getTime() + ")/";



            var Precio = 0;
            var totalnota = 0;
            $.each(Carritos, function (index, elementos) {

                $.each(Productos, function (index, elemento) {
                    if (elementos.IdProducto == elemento.IdProducto) {

                        if (elemento.PrecioOferta != 0) {
                            Precio = elemento.PrecioOferta;
                        }
                        else {
                            Precio = elemento.Precio;
                        }

                    }

                });

                var total = Precio * elementos.Cantidad;

                totalnota = totalnota + total;

            });
          

            var razon = "";
            if ($("#RazonSocial").val().trim() == "") {
                razon = "SIN NOMBRE";
            } else {
                razon = $("#RazonSocial").val().trim();
            }

            var nit = "";
            if ($("#NIT").val().trim() == "") {
                nit = "0";
            } else {
                nit = $("#RazonSocial").val().trim();
            }


            var nota = {
                IdNota: 0,
                NroNota: notalist.length + 1,
                Fecha: output.trim() == "" ? null : fechaJson,
                RazonSocial: razon.trim(),
                NIT: nit.trim(),
                Direccion1: $("#Direccion1").val().trim(),
                Direccion2: $("#Direccion2").val().trim(),
                Direccion3: $("#Direccion3").val().trim(),
                DireccionCorreo: $("#DireccionCorreo").val().trim(),
                Telefono: $("#Telefono").val().trim(),
                Descripcion: $("#Descripcion").val().trim(),
                Total: totalnota + 30,
                Entrega: $("#Pedido").val(),
                Tipo: 1,
                IdUsuario: parseInt(IdUsusriolog),                 
                Estado: 1
            };
    



            var notadto = JSON.stringify(nota);
         
            $.ajax({

                url: "/Nota/GuardarNota",
                data: { pNota: notadto },
                type: "POST",
                dataType: "json",

            })
                .done(function (IdnotaCreado, textStatus, jqXHR) {

                    var NotaCreada = IdnotaCreado.Data.Data;

                    toastr.success("Pedido Realizado Correctamente."); 

                    $.each(Carritos, function (index, elementos) {
                        $.each(Productos, function (index, elemento) {
                            if (elementos.IdProducto == elemento.IdProducto) {

                                if (elemento.PrecioOferta != 0) {
                                    Precio = elemento.PrecioOferta;
                                }
                                else {
                                    Precio = elemento.Precio;
                                }                            

                            }

                        });
                        var total = Precio * elementos.Cantidad;
                        var Detalle = {
                            IdDetalle: 0,
                            IdProducto: elementos.IdProducto,
                            IdNota: parseInt(NotaCreada),
                            Cantidad: elementos.Cantidad,
                            Total: total,
                            Tipo: 1,
                            Estado: 1,

                        };

                  




                        var Detalledto = JSON.stringify(Detalle);

                        $.ajax({
                            url: "/Detalle/GuardarDetalle",
                            data: { pDetalle: Detalledto },
                            type: "GET",
                            dataType: "json",

                        })
                            .done(function (data, textStatus, jqXHR) {

                                
                                notadetalleGuardado();








                            })
                            .fail(function (jqXHR, textStatus, errorThrown) {

                                console.log("La solicitud a fallado: " + textStatus);

                            });





                    });



               

                })
                .fail(function (jqXHR, textStatus, errorThrown) {

                    console.log("La solicitud a fallado: " + textStatus);

                });

        })
        .fail(function (jqXHR, textStatus, errorThrown) {

            console.log("La solicitud a fallado: " + textStatus);


        });



    
       

}

function FinalizarNotaVenta() {
   
    var esVisible = $("#step-1").is(":visible");
    var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var correo = $("#DireccionCorreo").val();
    if (esVisible == true) {

  
        if ($("#Direccion1").val().trim() == "") {
            toastr.error("Por favor Seleccione la Seccion 2");
        } else {
            if ($("#Direccion2").val().trim() == "") {
                toastr.error("Por favor Seleccione la Seccion 2");
            } else {
                if ($("#DireccionCorreo").val().trim() == "") {
                    toastr.error("Por favor Seleccione la Seccion 2");
                } else {
                    if (!regex.test(correo)) {
                        toastr.error("Por favor Seleccione la Seccion 2");
                    } else {
                        if ($("#Telefono").val().trim() == "") {
                            toastr.error("Por favor Seleccione la Seccion 2");
                        }
                        else {
                            if ($("#Descripcion").val().trim() == "") {
                                toastr.error("Por favor Seleccione la Seccion 2");
                            } else {
                                if ($("#Pedido").val() == 0) {
                                    toastr.error("Por favor Seleccione la Seccion 2");
                                } else {
                                    RegistrarNotaExitosa();
                                }
                            }
                        }
                    }
                
                }
            }
        }


    }
    else {

        if ($("#Direccion1").val().trim() == "") {
            toastr.error("Complete el campo de Direccion ");
        } else {
            if ($("#Direccion2").val().trim() == "") {
                toastr.error("Complete el campo de Numero de casa y nombre de la calles");
            } else {
                if ($("#DireccionCorreo").val().trim() == "") {
                    toastr.error("Complete el campo de Dirección de correo electrónico");
                } else {
               
                    if (!regex.test(correo)) {
                        toastr.error("el campo de Dirección de correo electrónico Incorrecto");
                    } else {
                        if ($("#Telefono").val().trim() == "") {
                            toastr.error("Complete el campo de Telefono");
                        }
                        else {
                            if ($("#Descripcion").val().trim() == "") {
                                toastr.error("Complete el campo de Notas sobre el pedido");
                            } else {
                                if ($("#Pedido").val() == 0) {
                                    toastr.error("Complete el campo de FORMA DE PAGO");
                                } else {
                                    RegistrarNotaExitosa();
                                  
                                }
                            }
                        }
                    }

                 
                }
            }
        }
    }




}

$("#Menustep-1").click(function () {
  
    $("#step-1").show();


    $("#Menustep-1").attr('style', 'background:#1a5b30');
    $("#Menustep-2").attr('style', 'background:#c1c1c1');
    $("#Menustep-3").attr('style', 'background:#c1c1c1');

    $("#step-2").hide();
    $("#step-3").hide();
});

$("#Menustep-2").click(function () {

    mostraSeccion2();

});

$("#Menustep-3").click(function () {

    FinalizarNotaVenta();
});

$("#Continuarstep1").click(function () {

    mostraSeccion2();
   


});

$("#Continuarstep2").click(function () {




    FinalizarNotaVenta();



});

function EliminardeCarritoNota(Carrito) {

    var totalnota = 0;
    var formData1 = new FormData();
    formData1.append("IdCarrito", Carrito);

    $.ajax({

        url: "/Carrito/EliminarCarrito",
        data: formData1,
        type: "POST",
        contentType: false,
        processData: false,
    })
        .done(function (data, textStatus, jqXHR) {

            $("#ListaProduto" + Carrito).hide();
  
            $("#trlis" + Carrito).hide();

            $.ajax({

                url: "/Carrito/obtenerCarritosUsuarioInt",
                data: { id: IdUsusriolog },
                type: "POST",
                dataType: "json",

            })
                .done(function (data50, textStatus, jqXHR) {

                    var CantidadCarrito = data50.Data.Data;
                    $("#CantidadCarrito").empty();
                    $("#CantidadCarrito").append(CantidadCarrito);

                    $.ajax({

                        url: "/Carrito/obtenerabmCarritoVista",
                        data: { idUsuario: IdUsusriolog },
                        type: "POST",
                        dataType: "json",

                    })
                        .done(function (data1, textStatus, jqXHR) {



                            var Carritovista = data1.Data.Data;

                            Carritos = Carritovista.Carritos;
                            Imagenes = Carritovista.Imagenes;
                            Productos = Carritovista.Productos;

                            if (Carritos.length <= 0) {

                                window.location.href = "/Home/Index";

                            } else {
                                var Precio = 0;

                                $.each(Carritos, function (index, elementos) {

                                    $.each(Productos, function (index, elemento) {
                                        if (elementos.IdProducto == elemento.IdProducto) {

                                            if (elemento.PrecioOferta != 0) {
                                                Precio = elemento.PrecioOferta;
                                            }
                                            else {
                                                Precio = elemento.Precio;
                                            }

                                        }

                                    });

                                    var total = Precio * elementos.Cantidad;
                                    totalnota = totalnota + total;

                                });
                                $("#TotalCarritonota").empty();
                                $("#TotalCarritonota").append(totalnota);

                            }

                        

                        })
                        .fail(function (jqXHR, textStatus, errorThrown) {

                            console.log("La solicitud a fallado: " + textStatus);

                        });
               
                })
                .fail(function (jqXHR, textStatus, errorThrown) {

                    console.log("La solicitud a fallado: " + textStatus);

                });

        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            
            console.log("La solicitud a fallado: " + textStatus);

        });

}

function ValorSubtoTotal(idcarrito, PrecioProducto) {

    var int = $("#intCarrito" + idcarrito).val();
    PrecioProducto;
    var total = parseInt(int) * parseInt(PrecioProducto);
    $("#Subtotal" + idcarrito).empty();
    $("#Subtotal" + idcarrito).append("Bs. " + total);

    var Carrito;
    var totalnota = 0;
    $.each(Carritos, function (index, elementos) {

        if (idcarrito == elementos.IdCarrito) {
            Carrito = {
                IdCarrito: idcarrito,
                Cantidad: parseInt(int),
                IdProducto: elementos.IdProducto,
                IdUsuario: elementos.IdUsuario,
                Estado: elementos.Estado
            };          

        }

    });


    var Carritodto = JSON.stringify(Carrito);
    $.ajax({

        url: "/Carrito/GuardarCarrito",
        data: { pCarrito: Carritodto },
        type: "POST",
        dataType: "json",

    })
        .done(function (data1, textStatus, jqXHR) {

            $.ajax({

                url: "/Carrito/obtenerabmCarritoVista",
                data: { idUsuario: IdUsusriolog },
                type: "POST",
                dataType: "json",

            })
                .done(function (data1, textStatus, jqXHR) {



                    var Carritovista = data1.Data.Data;


                    Carritos = Carritovista.Carritos;
                    Imagenes = Carritovista.Imagenes;
                    Productos = Carritovista.Productos;

                    var Precio = 0;   

                    $.each(Carritos, function (index, elementos) {

                        $.each(Productos, function (index, elemento) {
                            if (elementos.IdProducto == elemento.IdProducto) {

                                if (elemento.PrecioOferta != 0) {
                                    Precio = elemento.PrecioOferta;
                                }
                                else {
                                    Precio = elemento.Precio;
                                }

                            }

                        });

                        var total = Precio * elementos.Cantidad;

                        totalnota = totalnota + total;




                    });
                    $("#TotalCarritonota").empty();
                    $("#TotalCarritonota").append("Bs. " + totalnota);
       
                  




                })
                .fail(function (jqXHR, textStatus, errorThrown) {

                    console.log("La solicitud a fallado: " + textStatus);

                });

        })
        .fail(function (jqXHR, textStatus, errorThrown) {

            console.log("La solicitud a fallado: " + textStatus);

        });
       

}

function ImprimirCarrito() {

    Carritos;
    Imagenes;
    Productos;

    var totalnota = 0;

    for (var i = 0; i < Carritos.length; i += 1) {

        var Carritoslis = Carritos[i];
        var nombre;
        var Precio;
        var Cantidad;
        $.each(Productos, function (index, elemento) {
            if (Carritoslis.IdProducto == elemento.IdProducto ) {
                nombre = elemento.Nombre;
                if (elemento.PrecioOferta != 0) {
                    Precio = elemento.PrecioOferta;
                }
                else {
                    Precio = elemento.Precio;
                }
                Cantidad = elemento.Cantidad;
            }             

        });

        var NombreImagen
        $.each(Imagenes, function (index, elementos) {
            if (Carritoslis.IdProducto == elementos.Producto) {
                NombreImagen = elementos.Nombre;
              
            }

        });

  
        var trTablatd6ai = $('<i>').attr('class', 'icon-trash icons');
        var trTablatd6a = $('<a>').append(trTablatd6ai).attr("onclick", "EliminardeCarritoNota("+ Carritoslis.IdCarrito + ")"); 
        var trTablatd6 = $('<td>').attr('class', 'product-remove').append(trTablatd6a); 

        var total = Precio * Carritoslis.Cantidad;

        totalnota = totalnota + total;
    
        var trTablatd5 = $('<td>').attr('class', 'product-subtotal').attr('id', 'Subtotal' + Carritoslis.IdCarrito).append("Bs. "+ total); 


        var trTablatd4input = $('<input>').attr('id', 'intCarrito' + Carritoslis.IdCarrito).attr('onkeydown', 'return false').attr('type', 'number').attr('onchange', "ValorSubtoTotal(" + Carritoslis.IdCarrito+","+ Precio+")").attr('value', Carritoslis.Cantidad).attr('min', '1').attr('max', Cantidad); 
        var trTablatd4 = $('<td>').attr('class', 'product-quantity').append(trTablatd4input); 


        var trTablatd3span = $('<span>').attr('class', 'amount').append("Bs. " +Precio); 
        var trTablatd3 = $('<td>').attr('class', 'product-price').append(trTablatd3span); 

        var trTablatd2a = $('<a>').append(nombre); 
        var trTablatd2 = $('<td>').attr('class', 'product-name').append(trTablatd2a); 


        var trTablatd1aimg = $('<img>').attr('style', 'width:20%').attr('src', "/FotosProyecto/" + Carritoslis.IdProducto + "/Portada/" + Carritoslis.IdProducto + "_" + NombreImagen).attr('alt', 'product img'); 
        var trTablatd1a = $('<a>').append(trTablatd1aimg); 
        var trTablatd1 = $('<td>').attr('class', 'product-thumbnail').append(trTablatd1a); 
        
        var trTabla = $('<tr id= '+"trlis"+ Carritoslis.IdCarrito+'>').append(trTablatd1).append(trTablatd2).append(trTablatd3).append(trTablatd4).append(trTablatd5).append(trTablatd6);    

        $("#TablaVenta").append(trTabla);
        
    }

    $("#TotalCarritonota").append("Bs. "+ totalnota);


}

$(document).ready(function () {

    IdUsusriolog = sessionStorage.getItem("IdUsusriolog");

    $.ajax({

        url: "/Carrito/obtenerabmCarritoVista",
        data: { idUsuario: IdUsusriolog },
        type: "POST",
        dataType: "json",

    })
        .done(function (data1, textStatus, jqXHR) {

            var Carritovista = data1.Data.Data;

            Carritos = Carritovista.Carritos;
            Imagenes = Carritovista.Imagenes;
            Productos = Carritovista.Productos;


            if (Carritos.length <= 0) {

                window.location.href = "/Home/Index";

            } else {
                ImprimirCarrito();
 
            }

           

        })
        .fail(function (jqXHR, textStatus, errorThrown) {

            console.log("La solicitud a fallado: " + textStatus);

        });






});