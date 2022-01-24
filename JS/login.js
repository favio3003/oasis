var _datosUsuario;
var TipoProducto;
var Usuario1Log;
var IdUsusriolog;
var tiplog;
var log;


function RegistrarExitoso(resul) {

    var Usuarios = resul;
    var validarcorre = true;
    $.each(Usuarios, function (index, elemento) {
        
        if (elemento.Usuario1.toUpperCase() == $("#txtUsuarioR").val().trim().toUpperCase()) {
            validarcorre = false;
        }
    });
    
    if (validarcorre == false) {
        toastr.error("Este Nombre de usuario ya existe debe ser unico para poder crear");
    } else {

        var Usuario = {
            IdUsuario:0,
            Usuario1: $("#txtUsuarioR").val().trim().toUpperCase(),
            Pass: $("#txtPassR").val().trim(),
            Nombre: $("#txtUsuarioR").val().trim().toUpperCase(),
            Direccion: null,
            Correo: $("#txtCorreoR").val().trim(),
            Tipo: 2,
            Estado: 1

        };

        var UsuarioDto = JSON.stringify(Usuario);

        $.ajax({

            url: "/Usuario/GuardarUsuario",
            data: { pUsuario: UsuarioDto},
            type: "GET",
            dataType: "json",

        })
            .done(function (data, textStatus, jqXHR) {
                
                var id = data.Data.Data;

                sessionStorage.setItem("Usuario1Log", $("#txtUsuarioR").val().trim().toUpperCase());
                sessionStorage.setItem("IdUsusriolog", id);
                sessionStorage.setItem("tiplog", 2);
                Usuario1Log = $("#txtUsuarioR").val().trim().toUpperCase();
                IdUsusriolog = id;
                tiplog = 2
                log = true;
                Menu(tiplog);
                $("#ContadorICO").show();



                $("#LoginModal").modal("hide");
                toastr.success("Bienvenido " + ' ' + Usuario1Log);


                $.ajax({

                    url: "/Carrito/obtenerCarritosUsuarioInt",
                    data: { id: IdUsusriolog },
                    type: "POST",
                    dataType: "json",

                })
                    .done(function (data1, textStatus, jqXHR) {

                        var CantidadCarrito = data1.Data.Data;
                        $("#CantidadCarrito").empty();
                        $("#CantidadCarrito").append(CantidadCarrito);



                    })
                    .fail(function (jqXHR, textStatus, errorThrown) {

                        console.log("La solicitud a fallado: " + textStatus);

                    });

            })
            .fail(function (jqXHR, textStatus, errorThrown) {

                console.log("La solicitud a fallado: " + textStatus);

            });




    }


}

function Registrar() {


    var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var correo = $("#txtCorreoR").val().trim();

    if ($("#txtUsuarioR").val().trim() == "") {

        toastr.error("Complete el campo de Nombre de usuario");

    } else {
        if ($("#txtCorreoR").val().trim() == "") {

            toastr.error("Complete el campo de Correo Electronico");

        } else {

            if (!regex.test(correo)) {

                toastr.error("el campo de Correo Electronico Incorrecto");

            }else {
                if ($("#txtPassR").val().trim() == "") {

                    toastr.error("Complete el campo de Contraseña");

                }
                else {

                    $.ajax({

                        url: "/Usuario/ObtenerNombreUsuarioDto",
                        data: {},
                        type: "GET",
                        dataType: "json",

                    })
                        .done(function (data, textStatus, jqXHR) {

                            RegistrarExitoso(data.Data.Data);

                        })
                        .fail(function (jqXHR, textStatus, errorThrown) {

                            console.log("La solicitud a fallado: " + textStatus);

                        });



                }

            }
       

        }

    }
}

function ObtenerUsuarioDTOExitoso(resul) {
  
    var Resultado = resul.Data.Data;
    var Usuario1 = $("#txtUsuario1I").val().trim().toUpperCase();
    var Pass = $("#txtPassI").val().trim();
 
    if (Resultado.length != 0) {

        $.each(Resultado, function (index, elemento) {

            if (elemento.Usuario1.trim().toUpperCase() == Usuario1 && elemento.Pass.trim() == Pass) {

                sessionStorage.setItem("Usuario1Log", $("#txtUsuario1I").val().trim().toUpperCase());
                sessionStorage.setItem("IdUsusriolog", elemento.IdUsuario);
                sessionStorage.setItem("tiplog", elemento.Tipo);
                Usuario1Log = $("#txtUsuario1I").val().trim().toUpperCase();
                IdUsusriolog = elemento.IdUsuario;
                tiplog = elemento.Tipo
                log = true;
                Menu(tiplog);
                $("#ContadorICO").show();

              

                $("#LoginModal").modal("hide"); 
                toastr.success("Bienvenido " + ' ' + Usuario1Log); 


                $.ajax({

                    url: "/Carrito/obtenerCarritosUsuarioInt",
                    data: { id: IdUsusriolog },
                    type: "POST",
                    dataType: "json",

                })
                    .done(function (data1, textStatus, jqXHR) {

                        var CantidadCarrito = data1.Data.Data;
                        $("#CantidadCarrito").empty();
                        $("#CantidadCarrito").append(CantidadCarrito);
                     


                    })
                    .fail(function (jqXHR, textStatus, errorThrown) {

                        console.log("La solicitud a fallado: " + textStatus);

                    });


             
            }
            else {
               
                toastr.warning("Usuario o contraseña Incorrectos ");
        
            }
        }); 
        
    } else {
       
        toastr.error("El Usuario ingresado no EXISTE");

    }



}

$("#CerrarSesion").click(function () {

    $("#ContadorICO").hide();
    log = false;
    sessionStorage.removeItem('Usuario1Log');
    sessionStorage.removeItem('tiplog');
    sessionStorage.removeItem('IdUsusriolog');
    IdUsusriolog = null;
    Usuario1Log = null;
    tiplog = null;
    Menu(tiplog);
    $("#LogPerfil").modal("hide");
  

    


});

$("#Menuclia1").click(function () {
    sessionStorage.setItem("listaProducto", "a1");
    window.location.href = "/Producto/Productos";
});

$("#Menuclia2").click(function () {
    sessionStorage.setItem("listaProducto", "a2");
    window.location.href = "/Producto/Productos";
});

$("#Menuclia3").click(function () {
    sessionStorage.setItem("listaProducto", "a3");
    window.location.href = "/Producto/Productos";
});

$("#Menuclia4").click(function () {
    sessionStorage.setItem("listaProducto", "a4");
    window.location.href = "/Producto/Productos";
});

$("#CerrarCarritoLateral").click(function () {
    $("#carritolateral").hide();
});

$("#Menuclia5").click(function () {
    sessionStorage.setItem("listaProducto", "a5");
    window.location.href = "/Producto/Productos";
});


function ListadeVentadeUsuario(id) {

    
}

function cargarDatosPerfilCliente() {
    $.ajax({

        url: "/Nota/obtenerNotasUsuario",
        data: { pIdUsu: IdUsusriolog },
        type: "GET",
        dataType: "json",

    })
        .done(function (data, textStatus, jqXHR) {

            var notas = data.Data.Data;

            var Entregado = 0;
            var enProceso = 0;

            $.each(notas, function (index, elementoss) {
                if (elementoss.Estado == 1) {
                    enProceso = enProceso + 1;
                }
                else {
                    if (elementoss.Estado == 2) {
                        Entregado = Entregado + 1;
                    }

                }


            });
        
            
            $("#ContadorPerfil").empty();
            $("#ContadorPerfil").append(enProceso);


        })
        .fail(function (jqXHR, textStatus, errorThrown) {

            console.log("La solicitud a fallado: " + textStatus);

        });
}


function cargarDatosPerfilAdmin() {

    $.ajax({

        url: "/Nota/obtenerNotaVenta",
        data: {},
        type: "GET",
        dataType: "json",

    })
        .done(function (nota, textStatus, jqXHR) {

            var notas = nota.Data.Data;


            $.ajax({

                url: "/Producto/ObtenerProductosMenores",
                data: {},
                type: "GET",
                dataType: "json",

            })
                .done(function (Productos, textStatus, jqXHR) {

                    var Productos = Productos.Data.Data;

                    var Entregado = 0;
                    var enProceso = 0;

                    $.each(notas, function (index, elementoss) {
                        if (elementoss.Estado == 1) {
                            enProceso = enProceso + 1;
                        }
                        else {
                            if (elementoss.Estado == 2) {
                                Entregado = Entregado + 1;
                            }

                        }


                    });
                    var Productosmenore = 0;
                    $.each(Productos, function (index, elementoss) {
                        Productosmenore = Productosmenore + 1;


                    });

           


                    var totalPerfil = enProceso + Productosmenore;
                    $("#ContadorPerfil").empty();
                    $("#ContadorPerfil").append(totalPerfil);

                })
                .fail(function (jqXHR, textStatus, errorThrown) {

                    console.log("La solicitud a fallado: " + textStatus);

                });







        })
        .fail(function (jqXHR, textStatus, errorThrown) {

            console.log("La solicitud a fallado: " + textStatus);

        });


}


$("#MostrarModall").click(function () {

    if (log == false) {
        $("#LoginModal").modal("show");
        $("#txtUsuario1I").val("");
        $("#txtPassI").val("");

    } else {

        if (tiplog == 1) {
            $.ajax({

                url: "/Nota/obtenerNotaVenta",
                data: { },
                type: "GET",
                dataType: "json",

            })
                .done(function (nota, textStatus, jqXHR) {

                    var notas = nota.Data.Data;


                    $.ajax({

                        url: "/Producto/ObtenerProductosMenores",
                        data: {},
                        type: "GET",
                        dataType: "json",

                    })
                        .done(function (Productos, textStatus, jqXHR) {

                            var Productos = Productos.Data.Data;

                            var Entregado = 0;
                            var enProceso = 0;

                            $.each(notas, function (index, elementoss) {
                                if (elementoss.Estado == 1) {
                                    enProceso = enProceso + 1;
                                }
                                else {
                                    if (elementoss.Estado == 2) {
                                        Entregado = Entregado + 1;
                                    }

                                }


                            });
                            var Productosmenore = 0;
                            $.each(Productos, function (index, elementoss) {
                                Productosmenore = Productosmenore + 1;


                            });

                            $("#LogPerfil").modal("show");
                            $("#txtNombUS").empty();
                            $("#txtNombUS").append(Usuario1Log.toUpperCase());




                            $("#aEntregados").empty();
                            var Perfila = $('<a>').attr("href", "/Producto/ListaProductos").append(Productosmenore);
                            var Perfilaspan = $('<span>').append("Proveer producto");
                            $("#aEntregados").append(Perfila).append(Perfilaspan);

                            $("#aEnproceso").empty();
                            if (enProceso > 1) {

                                $("#aEnproceso").append(" Pedidos a entregar <b>" + enProceso + "</b>").attr("href", "/Nota/ListaNotaVentaPorEntregar");
                            } else {
                                $("#aEnproceso").append(" Pedido a entregar <b>" + enProceso + "</b>").attr("href", "/Nota/ListaNotaVentaPorEntregar");
                            }


                            var totalPerfil = enProceso + Productosmenore;
                            $("#ContadorPerfil").empty();
                            $("#ContadorPerfil").append(totalPerfil);

                        })
                        .fail(function (jqXHR, textStatus, errorThrown) {

                            console.log("La solicitud a fallado: " + textStatus);

                        });







                })
                .fail(function (jqXHR, textStatus, errorThrown) {

                    console.log("La solicitud a fallado: " + textStatus);

                });

        } else {
            $.ajax({

                url: "/Nota/obtenerNotasUsuario",
                data: { pIdUsu: IdUsusriolog },
                type: "GET",
                dataType: "json",

            })
                .done(function (data, textStatus, jqXHR) {

                    var notas = data.Data.Data;

                    var Entregado = 0;
                    var enProceso = 0;

                    $.each(notas, function (index, elementoss) {
                        if (elementoss.Estado == 1) {
                            enProceso = enProceso + 1;
                        }
                        else {
                            if (elementoss.Estado == 2) {
                                Entregado = Entregado + 1;
                            }

                        }


                    });

                    $("#LogPerfil").modal("show");
                    $("#txtNombUS").empty();
                    $("#txtNombUS").append(Usuario1Log.toUpperCase());




                    $("#aEntregados").empty();
                    var Perfila = $('<a>').append(Entregado);
                    var Perfilaspan = $('<span>').append("Entregados");
                    $("#aEntregados").append(Perfila).append(Perfilaspan);

                    $("#aEnproceso").empty();
                    if (enProceso > 1) {

                        $("#aEnproceso").append(" Pedidos en proceso <b>" + enProceso + "</b>").attr("onclick", "ListadeVentadeUsuario(" + IdUsusriolog + ")");
                    } else {
                        $("#aEnproceso").append(" Pedido en proceso <b>" + enProceso + "</b>").attr("onclick", "ListadeVentadeUsuario(" + IdUsusriolog + ")");
                    }
                    $("#ContadorPerfil").empty();
                    $("#ContadorPerfil").append(enProceso);


                })
                .fail(function (jqXHR, textStatus, errorThrown) {

                    console.log("La solicitud a fallado: " + textStatus);

                });
        }
    
     

        
      
    }


});

$("#btnIniciarrrr").click(function () {

    if ($("#txtUsuario1I").val().trim() == "") {

        toastr.error("Complete el campo de USUARIO");

    } else {
        if ($("#txtPassI").val().trim() == "") {

            toastr.error("Complete el campo de CONTRASEÑA");

        } else {

            var Usuario = {
                Usuario1: $("#txtUsuario1I").val().trim().toUpperCase(),
                Pass: $("#txtPassI").val().trim(),
            };

            var UsuarioDto = JSON.stringify(Usuario);



            var url = "/Usuario/ObtenerUsuarioDto";

            var datos = { pUsuario: UsuarioDto };
            var JsonDatos = 'JSON';
            $.ajax({

                url: url,
                data: datos,
                type: "GET",
                dataType: "json",

            })
                .done(function (data, textStatus, jqXHR) {

                    ObtenerUsuarioDTOExitoso(data);

                })
                .fail(function (jqXHR, textStatus, errorThrown) {

                    console.log("La solicitud a fallado: " + textStatus);

                });
        }
    } 
   
});

$("#PedirCarrito").click(function () {
 
    window.location.href = "/Nota/NotaVenta";
});

function EliminardeCarrito(Carrito) {

   
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
                    CargarCarritoDatos();


                })
                .fail(function (jqXHR, textStatus, errorThrown) {

                    console.log("La solicitud a fallado: " + textStatus);

                });





 




        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            
            console.log("La solicitud a fallado: " + textStatus);

        });

}

function CargarCarritoDatos() {
    $.ajax({

        url: "/Carrito/obtenerabmCarritoVista",
        data: { idUsuario: IdUsusriolog },
        type: "POST",
        dataType: "json",

    })
        .done(function (data1, textStatus, jqXHR) {



            var Carritovista = data1.Data.Data;


            var Carritos = Carritovista.Carritos;
            var Imagenes = Carritovista.Imagenes;
            var Productos = Carritovista.Productos;




            if (Carritos.length == 0) {
                $("#carritolisPro").empty();
                $("#PedirCarrito").hide();
                var cardivdiv2div1a = $('<a>').attr('href', '#').append("Sin Productos");
                var cardivdiv2div1 = $('<div>').attr('class', 'shp__pro__thumb').append(cardivdiv2div1a);
                var cardivdiv2xx = $('<div>').attr('class', 'shp__single__product').append(cardivdiv2div1);
                $("#carritolisPro").attr('class', 'shp__cart__wrap').append(cardivdiv2xx);


                var cardivdiv2div3aili2 = $('<li>').attr('class', 'total__price');
                var cardivdiv2div3aili1 = $('<li>').attr('class', 'subtotal').append("");


                $("#Subtotalproductocli").empty();
                $("#Subtotalproductocli").append(cardivdiv2div3aili1).append(cardivdiv2div3aili2);

                $("#carritolateral").attr('class', 'shopping__cart shopping__cart__on');

                $("#carritolateral").show();

            }
            else {

                //ImprimirProductosh
                var cardivdiv2 = $('<div>');

                var SubtotalProducto = 0;

                $.each(Carritos, function (index, elemento) {

                    $.each(Productos, function (index2, elementos) {

                        if (elemento.IdProducto == elementos.IdProducto) {

                            var cardivdiv2div3ai = $('<i>').attr('class', 'zmdi zmdi-close');
                            var cardivdiv2div3a = $('<a>').attr('href', '#').attr('title', 'Eliminar los productos').append(cardivdiv2div3ai).attr("onclick", "EliminardeCarrito("+ elemento.IdCarrito + ")");
                            var cardivdiv2div3 = $('<div>').attr('class', 'remove__btn').append(cardivdiv2div3a);


                            var contador = 0;

                            contador = elemento.Cantidad + contador;


                            if (elementos.PrecioOferta != 0) {
                                var total = contador * elementos.PrecioOferta;
                            } else {
                                var total = contador * elementos.Precio;
                            }
                            SubtotalProducto = SubtotalProducto + total;
                            var cardivdiv2div2span2 = $('<span>').attr('class', 'shp__price').append("Bs.: " + total);

                            var cardivdiv2div2span1 = $('<span>').attr('class', 'quantity').append("Cantidad: " + contador);
                            var cardivdiv2div2h2a = $('<a>').attr('href', '#').append(elementos.Nombre);
                            var cardivdiv2div2h2 = $('<h2>').append(cardivdiv2div2h2a);
                            var cardivdiv2div2 = $('<div>').attr('class', 'shp__pro__details').append(cardivdiv2div2h2).append(cardivdiv2div2span1).append(cardivdiv2div2span2);

                            var cardivdiv2div1img;

                            $.each(Imagenes, function (index4, elementoss) {

                                if (elementos.IdProducto == elementoss.Producto) {

                                    cardivdiv2div1img = $('<img>').attr('src', "/FotosProyecto/" + elemento.IdProducto + "/Portada/" + elemento.IdProducto + "_" + elementoss.Nombre);
                                }



                            });
                            var cardivdiv2div1a = $('<a>').attr('href', '#');
                            var cardivdiv2div1 = $('<div>').attr('class', 'shp__pro__thumb').append(cardivdiv2div1a).append(cardivdiv2div1img);
                            var cardivdiv2xx = $('<div>').attr('class', 'shp__single__product').attr('id', 'ListaProduto' + elemento.IdCarrito).append(cardivdiv2div1).append(cardivdiv2div2).append(cardivdiv2div3);
                            cardivdiv2.append(cardivdiv2xx);

                        }



                    });

                });


                //ImprimirProductos


                $("#carritolisPro").empty();

                $("#carritolisPro").attr('class', 'shp__cart__wrap').append(cardivdiv2);


                var cardivdiv2div3aili2 = $('<li>').attr('class', 'total__price').append(SubtotalProducto);
                var cardivdiv2div3aili1 = $('<li>').attr('class', 'subtotal').append("Subtotal: ");


                $("#Subtotalproductocli").empty();
                $("#Subtotalproductocli").append(cardivdiv2div3aili1).append(cardivdiv2div3aili2);

                $("#carritolateral").attr('class', 'shopping__cart shopping__cart__on');

                $("#carritolateral").show();

                $("#PedirCarrito").show();
            }


        })
        .fail(function (jqXHR, textStatus, errorThrown) {

            console.log("La solicitud a fallado: " + textStatus);

        });
}

$("#aMenucaraidiv1").click(function () {
  
    if (IdUsusriolog == null) {
        $("#carritolisPro").empty();
        $("#PedirCarrito").hide();
        var cardivdiv2div1a = $('<a>').attr('href', '#').append("Sin Productos");
        var cardivdiv2div1 = $('<div>').attr('class', 'shp__pro__thumb').append(cardivdiv2div1a);
        var cardivdiv2xx = $('<div>').attr('class', 'shp__single__product').append(cardivdiv2div1);
        $("#carritolisPro").attr('class', 'shp__cart__wrap').append(cardivdiv2xx);


        var cardivdiv2div3aili2 = $('<li>').attr('class', 'total__price');
        var cardivdiv2div3aili1 = $('<li>').attr('class', 'subtotal').append("");


        $("#Subtotalproductocli").empty();
        $("#Subtotalproductocli").append(cardivdiv2div3aili1).append(cardivdiv2div3aili2);

        $("#carritolateral").attr('class', 'shopping__cart shopping__cart__on');

        $("#carritolateral").show();


  
    }
    else {

        CargarCarritoDatos();
     
    }



   
    
});

function redireccionarlista(idTipoProducto) {
    sessionStorage.setItem("listaProducto", idTipoProducto);
    window.location.href = "/Producto/Productos";
}

function Menucliente(tipoProducto) {
   
    TipoProducto = tipoProducto.Data.Data;





    $.each(TipoProducto, function (index, elemento) {


        if (elemento.IdContH == 1) {
            var aMenu = $('<a>').append(elemento.Nombre).attr('onclick', 'redireccionarlista(' + elemento.IdCont+')');
            var liMenu = $('<li>').append(aMenu);
            $("#liMenu1").append(liMenu);

        }
        else if (elemento.IdContH == 2) {
            var aMenu = $('<a>').append(elemento.Nombre).attr('onclick', 'redireccionarlista(' + elemento.IdCont + ')');
            var liMenu = $('<li>').append(aMenu);
            $("#liMenu2").append(liMenu);

        }
        else if (elemento.IdContH == 3) {
            var aMenu = $('<a>').append(elemento.Nombre).attr('onclick', 'redireccionarlista(' + elemento.IdCont + ')');
            var liMenu = $('<li>').append(aMenu);
            $("#liMenu3").append(liMenu);

        }
        else if (elemento.IdContH == 4) {
            var aMenu = $('<a>').append(elemento.Nombre).attr('onclick', 'redireccionarlista(' + elemento.IdCont + ')');
            var liMenu = $('<li>').append(aMenu);
            $("#liMenu4").append(liMenu);

        }
        else if (elemento.IdContH == 5) {
            var aMenu = $('<a>').append(elemento.Nombre).attr('onclick', 'redireccionarlista(' + elemento.IdCont + ')');
            var liMenu = $('<li>').append(aMenu);
            $("#liMenu5").append(liMenu);

        }


    }); 
}

function Menu(tipo) {


    if (tipo == 1) {


        if (log == true) {
            $("#MenuAdmin").show();
            cargarDatosPerfilAdmin();
        } else {
            $("#MenuAdmin").show();
           
        }

  

    }
    else {

        if (log == true) {
            $("#MenuAdmin").hide();
            cargarDatosPerfilCliente();
        } else {
            $("#MenuAdmin").hide();
          
        }
      
    }

    if (log == true) {
        $("#aMenucaraidiv1").empty();
        var aMenucaraspan = $('<span>').attr('class', 'htc__qua').attr('id', 'CantidadCarrito');
        var aMenucara2 = $('<a>').attr('class', 'cart__menu').attr('href', '#').append(aMenucaraspan);
        var aMenucarai = $('<i>').attr('class', 'icon-handbag icons');
        var aMenucara1 = $('<a>').attr('class', 'cart__menu').attr('href', '#').append(aMenucarai);
        
        $("#aMenucaraidiv1").append(aMenucara1).append(aMenucara2);


        $.ajax({

            url: "/Carrito/obtenerCarritosUsuarioInt",
            data: { id: IdUsusriolog },
            type: "POST",
            dataType: "json",

        })
            .done(function (data1, textStatus, jqXHR) {

                var CantidadCarrito = data1.Data.Data;
                $("#CantidadCarrito").empty();
                $("#CantidadCarrito").append(CantidadCarrito);



            })
            .fail(function (jqXHR, textStatus, errorThrown) {

                console.log("La solicitud a fallado: " + textStatus);

            });





    }
    else {
        $("#aMenucaraidiv1").empty();     

        var aMenucarai = $('<i>').attr('class', 'icon-handbag icons');
        var aMenucara1 = $('<a>').attr('class', 'cart__menu').attr('href', '#').append(aMenucarai);        

        $("#aMenucaraidiv1").append(aMenucara1);
    }
 

}

$(document).ready(function () {
    IdUsusriolog = sessionStorage.getItem("IdUsusriolog");
    Usuario1Log = sessionStorage.getItem("Usuario1Log");
    tiplog = sessionStorage.getItem("tiplog");
    $("#carritolateral").hide();

    if (Usuario1Log == null) {

        log = false;
        $("#ContadorICO").hide();
     
        $.ajax({

            url: "/Contenidos/obtenerContenidosMenu",
            data: {},
            type: "GET",
            dataType: "json",

        })
            .done(function (data, textStatus, jqXHR) {

                Menu(tiplog);
             
                Menucliente(data);

            })
            .fail(function (jqXHR, textStatus, errorThrown) {

                console.log("La solicitud a fallado: " + textStatus);

            });

      
       
    } else {
        log = true;     
        $("#ContadorICO").show();
        $.ajax({

            url: "/Contenidos/obtenerContenidosMenu",
            data: {},
            type: "GET",
            dataType: "json",

        })
            .done(function (data, textStatus, jqXHR) {

                Menu(tiplog);
                Menucliente(data);

          

            })
            .fail(function (jqXHR, textStatus, errorThrown) {

                console.log("La solicitud a fallado: " + textStatus);

            });
      
    }

});

