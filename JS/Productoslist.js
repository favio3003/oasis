
var tipoProductoMenu;

var IdUsusriolog;

function ProductoDetalle(IdProducto) {

    sessionStorage.setItem("IdProducto", IdProducto);
    window.location.href = "/Producto/DetalleProducto";

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
                            var cardivdiv2div3a = $('<a>').attr('href', '#').attr('title', 'Eliminar los productos').append(cardivdiv2div3ai).attr("onclick", "EliminardeCarrito(" + elemento.IdCarrito + ")");
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

function AñadirCarroExitoso(IdCarrito) {

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
         
            var esVisible = $("#carritolateral").is(":visible");
            if (esVisible == false) {


            }
            else {
                CargarCarritoDatos();
            }
 


            toastr.success("Producto Añadido a Carrito");  
          

        })
        .fail(function (jqXHR, textStatus, errorThrown) {

            console.log("La solicitud a fallado: " + textStatus);

        });

}

function AñadirCarro(IdProducto) {

    if (log == false) {
        $("#LoginModal").modal("show");
        $("#txtUsuario1I").val("");
        $("#txtPassI").val("");

    } else {
        IdUsusriolog = sessionStorage.getItem("IdUsusriolog");
      
        $.ajax({

            url: "/Producto/obtenerProductoDisponibles",
            data: {id: IdProducto},
            type: "POST",
            dataType: "json",

        })
            .done(function (productoCantida, textStatus, jqXHR) {
                
              
                var todo = new FormData();
                todo.append("idUsuario", IdUsusriolog);
                todo.append("idProducto", IdProducto);
                $.ajax({

                    url: "/Carrito/obtenerCarritosUsuarioProducto",
                    data: todo,
                    type: "POST",
                    contentType: false,
                    processData: false,

                })
                    .done(function (carritoCant, textStatus, jqXHR) {

                        var ProductoCantida = productoCantida.Data.Data[0].Cantidad;
                        var CarritoCantida = carritoCant.Data.Data;
                        var CantidadCarrito = 0;
                        var idCarrito = 0;

                        $.each(CarritoCantida, function (index, elementoss) {

                            CantidadCarrito = elementoss.Cantidad + CantidadCarrito;
                            idCarrito = elementoss.IdCarrito;

                        });

                        if (CantidadCarrito < ProductoCantida) {
                           
                            var Carrito = {
                                IdCarrito: idCarrito,
                                Cantidad: CantidadCarrito + 1,
                                IdProducto: IdProducto,
                                IdUsuario: IdUsusriolog,
                                Estado: 1

                            };
                            var Carritodto = JSON.stringify(Carrito);

                            $.ajax({

                                url: "/Carrito/GuardarCarrito",
                                data: { pCarrito: Carritodto },
                                type: "POST",
                                dataType: "json",

                            })
                                .done(function (data1, textStatus, jqXHR) {

                                    AñadirCarroExitoso(data1);

                                })
                                .fail(function (jqXHR, textStatus, errorThrown) {

                                    console.log("La solicitud a fallado: " + textStatus);

                                });
                        } else {
                            toastr.error("No es posible añadir a carrito por que solo existen " + ProductoCantida+ " Productos Disponibles");
                        }


                 

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

function ObtenerProductosDtoExitoso(Producto, tipo) {
    var listaProducto = Producto.Data.Data;
    var TipoProducto = tipo.Data.Data; 




            if (tipoProductoMenu == "a1") {
                $.each(TipoProducto, function (index, elementos) {
                    $.each(listaProducto, function (index, elemento) {
                        if (elementos.IdContH == 1) {
                            if (elementos.IdCont == elemento.Tipo) {


                                $.ajax({

                                    url: "/ImagenProductos/obtenerImagenProductosolo",
                                    data: { Producto: elemento.IdProducto },
                                    type: "GET",
                                    dataType: "json",

                                })
                                    .done(function (data, textStatus, jqXHR) {


                                        var ImagenesProductos = data.Data.Data;

                                        var NombreProductos = "";
                                        $.each(ImagenesProductos, function (index, elementoss) {
                                            if (elementoss.Tipo == 2) {


                                                NombreProductos = "/FotosProyecto/" + elemento.IdProducto + "/Portada/" + elemento.IdProducto + "_" + elementoss.Nombre


                                            }

                                        });



                                        if (elemento.PrecioOferta != 0) {
                                            var liPrice1 = $('<li>').append(elemento.PrecioOferta + " Bs.");
                                            var lioldPrice1 = $('<li>').attr("class", "old__prize").append(elemento.Precio + " Bs.");
                                            var ulprice = $('<ul>').attr("class", "fr__pro__prize").append(lioldPrice1).append(liPrice1);
                                        } else {
                                            var liPrice1 = $('<li>').append(elemento.Precio + " Bs.");
                                            var ulprice = $('<ul>').attr("class", "fr__pro__prize").append(liPrice1);
                                        }

                                        var ahrefpro = $('<a>').attr("onclick", "ProductoDetalle(" + elemento.IdProducto + ")").append(elemento.Nombre);
                                        var h4title = $('<h4>').append(ahrefpro);
                                        var divfr__product__inner = $('<div>').attr("class", "fr__product__inner").append(h4title).append(ulprice);

                                        var i1 = $('<i>').attr("class", "icon-heart icons");
                                        var a1 = $('<a>').attr("href", "#").append(i1);
                                        var li1 = $('<li>').append(a1);

                                        var i2 = $('<i>').attr("class", "icon-handbag icons");
                                        var a2 = $('<a>').attr("onclick", "AñadirCarro(" + elemento.IdProducto + ")").append(i2);
                                        var li2 = $('<li>').append(a2);

                                        var ulproduct__action = $('<ul>').attr("class", "product__action").append(li1).append(li2);
                                        var divfr__hover__info = $('<div>').attr("class", "fr__hover__info").append(ulproduct__action);

                                        var imghref = $('<img>').attr("src", NombreProductos).attr("alt", "product images");
                                        var ahref = $('<a>').attr("class", "objetfit").attr("onclick", "ProductoDetalle(" + elemento.IdProducto + ")").append(imghref);
                                        var divht__cat__thumb = $('<div>').attr("class", "ht__cat__thumb").append(ahref);

                                        var divcategory = $('<div>').attr("class", "category").append(divht__cat__thumb).append(divfr__hover__info).append(divfr__product__inner);
                                        var divxcontent = $('<div>').attr("class", "x_content").append(divcategory);
                                        var divxpanel = $('<div>').attr("class", "x_panel").append(divxcontent);
                                        var divcolmd3 = $('<div>').attr("class", "col-md-3").append(divxpanel);

                                        $("#Producto").append(divcolmd3);
                                    })
                                    .fail(function (Mensaje, textStatus, errorThrown) {

                                        console.log("La solicitud a fallado: " + textStatus);

                                    });


   




                            }
                        }






                    });

                });
            }
            else if (tipoProductoMenu == "a2") {
                $.each(TipoProducto, function (index, elementos) {
                    $.each(listaProducto, function (index, elemento) {
                        if (elementos.IdContH == 2) {
                            if (elementos.IdCont == elemento.Tipo) {



                                $.ajax({

                                    url: "/ImagenProductos/obtenerImagenProductosolo",
                                    data: { Producto: elemento.IdProducto },
                                    type: "GET",
                                    dataType: "json",

                                })
                                    .done(function (data, textStatus, jqXHR) {


                                        var ImagenesProductos = data.Data.Data;

                                        var NombreProductos = "";
                                        $.each(ImagenesProductos, function (index, elementoss) {
                                            if (elementoss.Tipo == 2) {


                                                NombreProductos = "/FotosProyecto/" + elemento.IdProducto + "/Portada/" + elemento.IdProducto + "_" + elementoss.Nombre


                                            }

                                        });



                                        if (elemento.PrecioOferta != 0) {
                                            var liPrice1 = $('<li>').append(elemento.PrecioOferta + " Bs.");
                                            var lioldPrice1 = $('<li>').attr("class", "old__prize").append(elemento.Precio + " Bs.");
                                            var ulprice = $('<ul>').attr("class", "fr__pro__prize").append(lioldPrice1).append(liPrice1);
                                        } else {
                                            var liPrice1 = $('<li>').append(elemento.Precio + " Bs.");
                                            var ulprice = $('<ul>').attr("class", "fr__pro__prize").append(liPrice1);
                                        }

                                        var ahrefpro = $('<a>').attr("onclick", "ProductoDetalle(" + elemento.IdProducto + ")").append(elemento.Nombre);
                                        var h4title = $('<h4>').append(ahrefpro);
                                        var divfr__product__inner = $('<div>').attr("class", "fr__product__inner").append(h4title).append(ulprice);

                                        var i1 = $('<i>').attr("class", "icon-heart icons");
                                        var a1 = $('<a>').attr("href", "#").append(i1);
                                        var li1 = $('<li>').append(a1);

                                        var i2 = $('<i>').attr("class", "icon-handbag icons");
                                        var a2 = $('<a>').attr("onclick", "AñadirCarro(" + elemento.IdProducto + ")").append(i2);
                                        var li2 = $('<li>').append(a2);

                                        var ulproduct__action = $('<ul>').attr("class", "product__action").append(li1).append(li2);
                                        var divfr__hover__info = $('<div>').attr("class", "fr__hover__info").append(ulproduct__action);

                                        var imghref = $('<img>').attr("src", NombreProductos).attr("alt", "product images");
                                        var ahref = $('<a>').attr("class", "objetfit").attr("onclick", "ProductoDetalle(" + elemento.IdProducto + ")").append(imghref);
                                        var divht__cat__thumb = $('<div>').attr("class", "ht__cat__thumb").append(ahref);

                                        var divcategory = $('<div>').attr("class", "category").append(divht__cat__thumb).append(divfr__hover__info).append(divfr__product__inner);
                                        var divxcontent = $('<div>').attr("class", "x_content").append(divcategory);
                                        var divxpanel = $('<div>').attr("class", "x_panel").append(divxcontent);
                                        var divcolmd3 = $('<div>').attr("class", "col-md-3").append(divxpanel);

                                        $("#Producto").append(divcolmd3);
                                    })
                                    .fail(function (Mensaje, textStatus, errorThrown) {

                                        console.log("La solicitud a fallado: " + textStatus);

                                    });



                            }
                        }






                    });

                });
            }
            else if (tipoProductoMenu == "a3") {
                $.each(TipoProducto, function (index, elementos) {
                    $.each(listaProducto, function (index, elemento) {
                        if (elementos.IdContH == 3) {
                            if (elementos.IdCont == elemento.Tipo) {

                                $.ajax({

                                    url: "/ImagenProductos/obtenerImagenProductosolo",
                                    data: { Producto: elemento.IdProducto },
                                    type: "GET",
                                    dataType: "json",

                                })
                                    .done(function (data, textStatus, jqXHR) {


                                        var ImagenesProductos = data.Data.Data;

                                        var NombreProductos = "";
                                        $.each(ImagenesProductos, function (index, elementoss) {
                                            if (elementoss.Tipo == 2) {


                                                NombreProductos = "/FotosProyecto/" + elemento.IdProducto + "/Portada/" + elemento.IdProducto + "_" + elementoss.Nombre


                                            }

                                        });



                                        if (elemento.PrecioOferta != 0) {
                                            var liPrice1 = $('<li>').append(elemento.PrecioOferta + " Bs.");
                                            var lioldPrice1 = $('<li>').attr("class", "old__prize").append(elemento.Precio + " Bs.");
                                            var ulprice = $('<ul>').attr("class", "fr__pro__prize").append(lioldPrice1).append(liPrice1);
                                        } else {
                                            var liPrice1 = $('<li>').append(elemento.Precio + " Bs.");
                                            var ulprice = $('<ul>').attr("class", "fr__pro__prize").append(liPrice1);
                                        }

                                        var ahrefpro = $('<a>').attr("onclick", "ProductoDetalle(" + elemento.IdProducto + ")").append(elemento.Nombre);
                                        var h4title = $('<h4>').append(ahrefpro);
                                        var divfr__product__inner = $('<div>').attr("class", "fr__product__inner").append(h4title).append(ulprice);

                                        var i1 = $('<i>').attr("class", "icon-heart icons");
                                        var a1 = $('<a>').attr("href", "#").append(i1);
                                        var li1 = $('<li>').append(a1);

                                        var i2 = $('<i>').attr("class", "icon-handbag icons");
                                        var a2 = $('<a>').attr("onclick", "AñadirCarro(" + elemento.IdProducto + ")").append(i2);
                                        var li2 = $('<li>').append(a2);

                                        var ulproduct__action = $('<ul>').attr("class", "product__action").append(li1).append(li2);
                                        var divfr__hover__info = $('<div>').attr("class", "fr__hover__info").append(ulproduct__action);

                                        var imghref = $('<img>').attr("src", NombreProductos).attr("alt", "product images");
                                        var ahref = $('<a>').attr("class", "objetfit").attr("onclick", "ProductoDetalle(" + elemento.IdProducto + ")").append(imghref);
                                        var divht__cat__thumb = $('<div>').attr("class", "ht__cat__thumb").append(ahref);

                                        var divcategory = $('<div>').attr("class", "category").append(divht__cat__thumb).append(divfr__hover__info).append(divfr__product__inner);
                                        var divxcontent = $('<div>').attr("class", "x_content").append(divcategory);
                                        var divxpanel = $('<div>').attr("class", "x_panel").append(divxcontent);
                                        var divcolmd3 = $('<div>').attr("class", "col-md-3").append(divxpanel);

                                        $("#Producto").append(divcolmd3);
                                    })
                                    .fail(function (Mensaje, textStatus, errorThrown) {

                                        console.log("La solicitud a fallado: " + textStatus);

                                    });



                            }
                        }






                    });

                });
            }
            else if (tipoProductoMenu == "a4") {
                $.each(TipoProducto, function (index, elementos) {
                    $.each(listaProducto, function (index, elemento) {
                        if (elementos.IdContH == 4) {
                            if (elementos.IdCont == elemento.Tipo) {

                                $.ajax({

                                    url: "/ImagenProductos/obtenerImagenProductosolo",
                                    data: { Producto: elemento.IdProducto },
                                    type: "GET",
                                    dataType: "json",

                                })
                                    .done(function (data, textStatus, jqXHR) {


                                        var ImagenesProductos = data.Data.Data;

                                        var NombreProductos = "";
                                        $.each(ImagenesProductos, function (index, elementoss) {
                                            if (elementoss.Tipo == 2) {


                                                NombreProductos = "/FotosProyecto/" + elemento.IdProducto + "/Portada/" + elemento.IdProducto + "_" + elementoss.Nombre


                                            }

                                        });



                                        if (elemento.PrecioOferta != 0) {
                                            var liPrice1 = $('<li>').append(elemento.PrecioOferta + " Bs.");
                                            var lioldPrice1 = $('<li>').attr("class", "old__prize").append(elemento.Precio + " Bs.");
                                            var ulprice = $('<ul>').attr("class", "fr__pro__prize").append(lioldPrice1).append(liPrice1);
                                        } else {
                                            var liPrice1 = $('<li>').append(elemento.Precio + " Bs.");
                                            var ulprice = $('<ul>').attr("class", "fr__pro__prize").append(liPrice1);
                                        }

                                        var ahrefpro = $('<a>').attr("onclick", "ProductoDetalle(" + elemento.IdProducto + ")").append(elemento.Nombre);
                                        var h4title = $('<h4>').append(ahrefpro);
                                        var divfr__product__inner = $('<div>').attr("class", "fr__product__inner").append(h4title).append(ulprice);

                                        var i1 = $('<i>').attr("class", "icon-heart icons");
                                        var a1 = $('<a>').attr("href", "#").append(i1);
                                        var li1 = $('<li>').append(a1);

                                        var i2 = $('<i>').attr("class", "icon-handbag icons");
                                        var a2 = $('<a>').attr("onclick", "AñadirCarro(" + elemento.IdProducto + ")").append(i2);
                                        var li2 = $('<li>').append(a2);

                                        var ulproduct__action = $('<ul>').attr("class", "product__action").append(li1).append(li2);
                                        var divfr__hover__info = $('<div>').attr("class", "fr__hover__info").append(ulproduct__action);

                                        var imghref = $('<img>').attr("src", NombreProductos).attr("alt", "product images");
                                        var ahref = $('<a>').attr("class", "objetfit").attr("onclick", "ProductoDetalle(" + elemento.IdProducto + ")").append(imghref);
                                        var divht__cat__thumb = $('<div>').attr("class", "ht__cat__thumb").append(ahref);

                                        var divcategory = $('<div>').attr("class", "category").append(divht__cat__thumb).append(divfr__hover__info).append(divfr__product__inner);
                                        var divxcontent = $('<div>').attr("class", "x_content").append(divcategory);
                                        var divxpanel = $('<div>').attr("class", "x_panel").append(divxcontent);
                                        var divcolmd3 = $('<div>').attr("class", "col-md-3").append(divxpanel);

                                        $("#Producto").append(divcolmd3);
                                    })
                                    .fail(function (Mensaje, textStatus, errorThrown) {

                                        console.log("La solicitud a fallado: " + textStatus);

                                    });



                            }
                        }






                    });

                });
            }
            else if (tipoProductoMenu == "a5") {
                $.each(TipoProducto, function (index, elementos) {
                    $.each(listaProducto, function (index, elemento) {
                        if (elementos.IdContH == 5) {
                            if (elementos.IdCont == elemento.Tipo) {

                                $.ajax({

                                    url: "/ImagenProductos/obtenerImagenProductosolo",
                                    data: { Producto: elemento.IdProducto },
                                    type: "GET",
                                    dataType: "json",

                                })
                                    .done(function (data, textStatus, jqXHR) {


                                        var ImagenesProductos = data.Data.Data;

                                        var NombreProductos = "";
                                        $.each(ImagenesProductos, function (index, elementoss) {
                                            if (elementoss.Tipo == 2) {


                                                NombreProductos = "/FotosProyecto/" + elemento.IdProducto + "/Portada/" + elemento.IdProducto + "_" + elementoss.Nombre


                                            }

                                        });



                                        if (elemento.PrecioOferta != 0) {
                                            var liPrice1 = $('<li>').append(elemento.PrecioOferta + " Bs.");
                                            var lioldPrice1 = $('<li>').attr("class", "old__prize").append(elemento.Precio + " Bs.");
                                            var ulprice = $('<ul>').attr("class", "fr__pro__prize").append(lioldPrice1).append(liPrice1);
                                        } else {
                                            var liPrice1 = $('<li>').append(elemento.Precio + " Bs.");
                                            var ulprice = $('<ul>').attr("class", "fr__pro__prize").append(liPrice1);
                                        }

                                        var ahrefpro = $('<a>').attr("onclick", "ProductoDetalle(" + elemento.IdProducto + ")").append(elemento.Nombre);
                                        var h4title = $('<h4>').append(ahrefpro);
                                        var divfr__product__inner = $('<div>').attr("class", "fr__product__inner").append(h4title).append(ulprice);

                                        var i1 = $('<i>').attr("class", "icon-heart icons");
                                        var a1 = $('<a>').attr("href", "#").append(i1);
                                        var li1 = $('<li>').append(a1);

                                        var i2 = $('<i>').attr("class", "icon-handbag icons");
                                        var a2 = $('<a>').attr("onclick", "AñadirCarro(" + elemento.IdProducto + ")").append(i2);
                                        var li2 = $('<li>').append(a2);

                                        var ulproduct__action = $('<ul>').attr("class", "product__action").append(li1).append(li2);
                                        var divfr__hover__info = $('<div>').attr("class", "fr__hover__info").append(ulproduct__action);

                                        var imghref = $('<img>').attr("src", NombreProductos).attr("alt", "product images");
                                        var ahref = $('<a>').attr("class", "objetfit").attr("onclick", "ProductoDetalle(" + elemento.IdProducto + ")").append(imghref);
                                        var divht__cat__thumb = $('<div>').attr("class", "ht__cat__thumb").append(ahref);

                                        var divcategory = $('<div>').attr("class", "category").append(divht__cat__thumb).append(divfr__hover__info).append(divfr__product__inner);
                                        var divxcontent = $('<div>').attr("class", "x_content").append(divcategory);
                                        var divxpanel = $('<div>').attr("class", "x_panel").append(divxcontent);
                                        var divcolmd3 = $('<div>').attr("class", "col-md-3").append(divxpanel);

                                        $("#Producto").append(divcolmd3);
                                    })
                                    .fail(function (Mensaje, textStatus, errorThrown) {

                                        console.log("La solicitud a fallado: " + textStatus);

                                    });



                            }
                        }






                    });

                });
            }
            else {

                $.each(listaProducto, function (index, elemento) {

                    if (tipoProductoMenu == elemento.Tipo) {

                        $.ajax({

                            url: "/ImagenProductos/obtenerImagenProductosolo",
                            data: { Producto: elemento.IdProducto },
                            type: "GET",
                            dataType: "json",

                        })
                            .done(function (data, textStatus, jqXHR) {


                                var ImagenesProductos = data.Data.Data;

                                var NombreProductos = "";
                                $.each(ImagenesProductos, function (index, elementoss) {
                                    if (elementoss.Tipo == 2) {


                                        NombreProductos = "/FotosProyecto/" + elemento.IdProducto + "/Portada/" + elemento.IdProducto + "_" + elementoss.Nombre


                                    }

                                });



                                if (elemento.PrecioOferta != 0) {
                                    var liPrice1 = $('<li>').append(elemento.PrecioOferta + " Bs.");
                                    var lioldPrice1 = $('<li>').attr("class", "old__prize").append(elemento.Precio + " Bs.");
                                    var ulprice = $('<ul>').attr("class", "fr__pro__prize").append(lioldPrice1).append(liPrice1);
                                } else {
                                    var liPrice1 = $('<li>').append(elemento.Precio + " Bs.");
                                    var ulprice = $('<ul>').attr("class", "fr__pro__prize").append(liPrice1);
                                }

                                var ahrefpro = $('<a>').attr("onclick", "ProductoDetalle(" + elemento.IdProducto + ")").append(elemento.Nombre);
                                var h4title = $('<h4>').append(ahrefpro);
                                var divfr__product__inner = $('<div>').attr("class", "fr__product__inner").append(h4title).append(ulprice);

                                var i1 = $('<i>').attr("class", "icon-heart icons");
                                var a1 = $('<a>').attr("href", "#").append(i1);
                                var li1 = $('<li>').append(a1);

                                var i2 = $('<i>').attr("class", "icon-handbag icons");
                                var a2 = $('<a>').attr("onclick", "AñadirCarro(" + elemento.IdProducto + ")").append(i2);
                                var li2 = $('<li>').append(a2);

                                var ulproduct__action = $('<ul>').attr("class", "product__action").append(li1).append(li2);
                                var divfr__hover__info = $('<div>').attr("class", "fr__hover__info").append(ulproduct__action);

                                var imghref = $('<img>').attr("src", NombreProductos).attr("alt", "product images");
                                var ahref = $('<a>').attr("class", "objetfit").attr("onclick", "ProductoDetalle(" + elemento.IdProducto + ")").append(imghref);
                                var divht__cat__thumb = $('<div>').attr("class", "ht__cat__thumb").append(ahref);

                                var divcategory = $('<div>').attr("class", "category").append(divht__cat__thumb).append(divfr__hover__info).append(divfr__product__inner);
                                var divxcontent = $('<div>').attr("class", "x_content").append(divcategory);
                                var divxpanel = $('<div>').attr("class", "x_panel").append(divxcontent);
                                var divcolmd3 = $('<div>').attr("class", "col-md-3").append(divxpanel);

                                $("#Producto").append(divcolmd3);
                            })
                            .fail(function (Mensaje, textStatus, errorThrown) {

                                console.log("La solicitud a fallado: " + textStatus);

                            });



                    }

                });



            }
           




    







}

$(document).ready(function () {

    tipoProductoMenu = sessionStorage.getItem("listaProducto");
    var url = "/Producto/obtenerProductosDisponibles";
    var datos = {};
    $.ajax({

        url: url,
        data: datos,
        type: "GET",
        dataType: "json",

    })
        .done(function (data, textStatus, jqXHR) {

            $.ajax({

                url: "/Contenidos/obtenerContenidosMenu",
                data: {},
                type: "GET",
                dataType: "json",

            })
                .done(function (data1, textStatus, jqXHR) {                  
                 
                    ObtenerProductosDtoExitoso(data, data1);

                })
                .fail(function (jqXHR, textStatus, errorThrown) {

                    console.log("La solicitud a fallado: " + textStatus);

                });

        })
        .fail(function (jqXHR, textStatus, errorThrown) {

            console.log("La solicitud a fallado: " + textStatus);

        });

});