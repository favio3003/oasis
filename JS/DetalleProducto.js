var IdProducto;
var IdUsusriolog;

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

function CarritoDetalle(cantidad , id) {


    var cantidadPedido = $("#CantidadPedido").val();
    if (log == false) {
        $("#LoginModal").modal("show");
        $("#txtUsuario1I").val("");
        $("#txtPassI").val("");

    } else {
        if (cantidadPedido < 0) {

            toastr.error("La cantidad debe ser mayor a 0");

        } else {

            IdUsusriolog = sessionStorage.getItem("IdUsusriolog");
            $.ajax({

                url: "/Producto/obtenerProductoDisponibles",
                data: { id: id },
                type: "POST",
                dataType: "json",

            })
                .done(function (productoCantida, textStatus, jqXHR) {


                    var todo = new FormData();
                    todo.append("idUsuario", IdUsusriolog);
                    todo.append("idProducto", id);
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
                          
                            CantidadCarrito = CantidadCarrito + parseInt(cantidadPedido);
                            if (CantidadCarrito <= ProductoCantida) {

                                var Carrito = {
                                    IdCarrito: idCarrito,
                                    Cantidad: CantidadCarrito,
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
                                toastr.error("No es posible añadir a carrito por que solo existen " + ProductoCantida + " Productos Disponibles");
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

}



function ObtenerDetalleProductoDtoExitoso(producto, tipoProductos, imagenes) {
    
    var Producto = producto.Data.Data[0];
    var TipoProducto = tipoProductos.Data.Data;
    
    var Imagen = imagenes.Data.Data;


    var divhtc__product__details__topcontainerrowcol4product__big__imagesportfoliofullimagetab;


    var divhtc__product__details__topcontainerrowcol4product__big__imagesportfoliofullimage = $('<div>').attr("class", "portfolio-full-image tab-content");
    var divhtc__product__details__topcontainerrowcol4product__small__images = $('<ul>').attr("class", "product__small__images").attr("role", "tablist");

    var divhtc__product__details__topcontainerrowcol4product__small__imagesli;

    $.each(Imagen, function (index, elementoss) {
        if (elementoss.Tipo == 1) {
            if (index == 0) {
                var divhtc__product__details__topcontainerrowcol4product__big__imagesportfoliofullimagetabimg = $('<img>').attr("src", "/FotosProyecto/" + IdProducto + "/Catalogo/" + IdProducto + "_" + elementoss.Nombre).attr("alt", "full-image");
                divhtc__product__details__topcontainerrowcol4product__big__imagesportfoliofullimagetab = $('<div>').attr("role", "tabpanel").attr("class", "tab-pane fade in active").attr("id", "img-tab-"+elementoss.IdImagen).append(divhtc__product__details__topcontainerrowcol4product__big__imagesportfoliofullimagetabimg);

                var img = $('<img>').attr("src", "/FotosProyecto/" + IdProducto + "/Catalogo/" + IdProducto + "_Detail_" + elementoss.Nombre).attr("alt", "small-image");
                var divhtc__product__details__topcontainerrowcol4product__small__imageslia = $('<a>').attr("href", "#img-tab-" + elementoss.IdImagen).attr("role", "tab").attr("data-toggle", "tab").append(img);
                divhtc__product__details__topcontainerrowcol4product__small__imagesli = $('<li>').attr("role", "presentation").attr("class", "pot-small-img active").append(divhtc__product__details__topcontainerrowcol4product__small__imageslia);

            }

            else {
                var divhtc__product__details__topcontainerrowcol4product__big__imagesportfoliofullimagetabimg = $('<img>').attr("src", "/FotosProyecto/" + IdProducto + "/Catalogo/" + IdProducto + "_" + elementoss.Nombre).attr("alt", "full-image");
                divhtc__product__details__topcontainerrowcol4product__big__imagesportfoliofullimagetab = $('<div>').attr("role", "tabpanel").attr("class", "tab-pane fade").attr("id", "img-tab-" +elementoss.IdImagen).append(divhtc__product__details__topcontainerrowcol4product__big__imagesportfoliofullimagetabimg);

                var img = $('<img>').attr("src", "/FotosProyecto/" + IdProducto + "/Catalogo/" + IdProducto + "_Detail_" + elementoss.Nombre).attr("alt", "small-image");
                var divhtc__product__details__topcontainerrowcol4product__small__imageslia = $('<a>').attr("href", "#img-tab-" + elementoss.IdImagen).attr("role", "tab").attr("data-toggle", "tab").append(img);
                divhtc__product__details__topcontainerrowcol4product__small__imagesli = $('<li>').attr("role", "presentation").attr("class", "pot-small-img").append(divhtc__product__details__topcontainerrowcol4product__small__imageslia);

            }

            divhtc__product__details__topcontainerrowcol4product__big__imagesportfoliofullimage.append(divhtc__product__details__topcontainerrowcol4product__big__imagesportfoliofullimagetab);

            divhtc__product__details__topcontainerrowcol4product__small__images.append(divhtc__product__details__topcontainerrowcol4product__small__imagesli);


        }

    });
    var divhtc__product__details__topcontainerrowcol4product__big__images = $('<div>').attr("class", "product__big__images").append(divhtc__product__details__topcontainerrowcol4product__big__imagesportfoliofullimage);


 
/*    var divcolmd3 = $('<div>').attr("class", "col-md-3").append(divxpanel);*/

    var cccdivdivbuttoni = $('<i>').attr("class", "fa fa-shopping-cart");
    var cccdivdivbutton = $('<button>').attr("onclick", "CarritoDetalle(" + Producto.Cantidad + " , " + Producto.IdProducto+")").attr("class", "btn btn-secondary btn-sm rounded float-right").append(cccdivdivbuttoni).append(" AÑADIR A CARRITO");

    var cccdivdiv = $('<div>').attr("class", "sin__desc product__share__link").append(cccdivdivbutton);
    var cccdiv = $('<div>').attr("class", "col-md-12 col-lg-12 col-sm-12 col-xs-12").append(cccdivdiv);
    var bbdivinput = $('<input>').attr("class", "form-control").attr("id", "CantidadPedido").attr("value", "1").attr("type", "number").attr("placeholder", "1").attr("min", "1").attr("max", Producto.Cantidad);
    var bbdivlavel = $('<lavel>').append("CANTIDAD PARA PEDIR:");
    var bbdiv = $('<div>').attr("class", "col-md-4 col-lg-4 col-sm-12 col-xs-12").append(bbdivlavel).append(bbdivinput);



    var CaracteristicaDetalle = $('<a>').append(Producto.Cantidad);
    var aacant = $('<li>').append(CaracteristicaDetalle);
    var aacantul = $('<ul>').attr("class", "pro__cat__list").append(aacant);
    var aalisapn = $('<span>').append("CANTIDAD DISPONIBLE:");
    var aalisapnp = $('<p>').append(aalisapn);
    var aalisapnpdiv = $('<div>').attr("class", "sin__desc align--left").append(aalisapnp).append(aacantul);


    var aalii;
    $.each(TipoProducto, function (index, elemento) {
        if (elemento.IdContP == 0) {
            if (Producto.Tipo == elemento.IdCont) {

                var TipoDetalle = $('<a>').attr("href", "#").append(elemento.Nombre);
                aalii = $('<li>').append(TipoDetalle);
            }
        }

    }); 
    var aaliilu = $('<ul>').attr("class", "pro__cat__list").append(aalii);
    var aaliiluspan = $('<span>').append("TIPO: ");
    var aaliiluspanp = $('<p>').append(aaliiluspan);
    var aaliiluspanpdiv = $('<div>').attr("class", "sin__desc align--left").append(aaliiluspanp).append(aaliilu);
    var aap;
    $.each(TipoProducto, function (index, elemento) {
        if (elemento.IdContP == 2) {
            if (Producto.Estado == elemento.IdContH) {
                var aapspan = $('<span>').append("ESTADO: ");
                aap = $('<p>').append(aapspan).append(elemento.Nombre);     
            }
        }
    }); 
    var aadiv = $('<div>').attr("class", "sin__desc").append(aap);



    var zflarfsdLUdivdiv = $('<div>').attr("class", "ht__pro__desc").append(aadiv).append(aaliiluspanpdiv).append(aalisapnpdiv).append($('<br>')).append($('<br>')).append($('<br>')).append($('<br>')).append(bbdiv).append($('<br>')).append(cccdiv);

    var zflarfsdLUdivb = $('<b>').append("DESCRIPCION: ");
    var zflarfsdLUdivbspan = $('<span>').append(zflarfsdLUdivb);
    var zflarfsdLUdivbspanp = $('<p>').append(zflarfsdLUdivbspan).append(Producto.DescripcionCorta);
    var zflarfsdLUdiv = $('<div>').attr("class", "pro__info").append(zflarfsdLUdivbspanp);


    var zflarfsdLU = $('<ul>').attr("class", "pro__prize") ;
    if (Producto.PrecioOferta != 0) {
        var liPrecioD = $('<li>').append(Producto.PrecioOferta + "Bs.");
        var liprecioOfertaD = $('<li>').attr("class", "old__prize").append(Producto.Precio + "Bs.");
        zflarfsdLU.append(liprecioOfertaD).append(liPrecioD);
    }
    else {
        var liPrecioD = $('<li>').append(Producto.Precio + "Bs.");
        zflarfsdLU.append(liPrecioD);
    }
    var spanDetalle = $('<span>').append(Producto.IdProducto);
    var zflarfsdh6 = $('<h6>').append("MODELO: ").append(spanDetalle);
    var zflarfsdh2 = $('<h2>').append(Producto.Nombre);
    var zflarfsd = $('<div>').attr("class", "ht__product__dtl").append(zflarfsdh2).append(zflarfsdh6).append(zflarfsdLU).append(zflarfsdLUdiv).append(zflarfsdLUdivdiv);



    var divhtc__product__details__topcontainerrowcol1 = $('<div>').attr("class", "col-md-1 col-lg-1 col-sm-12 col-xs-12");
    var divhtc__product__details__topcontainerrowcol4 = $('<div>').attr("class", "col-md-4 col-lg-4 col-sm-12 col-xs-12").append(divhtc__product__details__topcontainerrowcol4product__big__images).append(divhtc__product__details__topcontainerrowcol4product__small__images);
    var divhtc__product__details__topcontainerrowcol6 = $('<div>').attr("class", "col-md-6 col-lg-6 col-sm-12 col-xs-12 smt-40 xmt-40").append(zflarfsd);

    var divhtc__product__details__topcontainerrow = $('<div>').attr("class", "row").append(divhtc__product__details__topcontainerrowcol1).append(divhtc__product__details__topcontainerrowcol4).append(divhtc__product__details__topcontainerrowcol6);
    var divhtc__product__details__topcontainer = $('<div>').attr("class", "container").append(divhtc__product__details__topcontainerrow);
    var divhtc__product__details__top = $('<div>').attr("class", "htc__product__details__top").append(divhtc__product__details__topcontainer);

    var sectionhtc__product__details = $('<section>').attr("class", "htc__product__details bg__white ptb--100").append(divhtc__product__details__top);




    var sectiondivdiv1div3 = $('<div>').attr("class", "col-md-1 col-lg-1 col-sm-12 col-xs-12");
    var sectiondivdiv1div2ullia = $('<a>').attr("data-toggle", "tab").attr("role", "tab").append("descripcion Detallada del Producto");
    var sectiondivdiv1div2ulli = $('<li>').attr("class", "description active").attr("role", "presentation").append(sectiondivdiv1div2ullia)
    var sectiondivdiv1div2ul = $('<ul>').attr("class", "pro__details__tab").attr("role", "tablist").append(sectiondivdiv1div2ulli);
    var sectiondivdiv1div2 = $('<div>').attr("class", "col-md-10 col-lg-10 col-sm-12 col-xs-12").append(sectiondivdiv1div2ul);
    var sectiondivdiv1div1 = $('<div>').attr("class", "col-md-1 col-lg-1 col-sm-12 col-xs-12");
    var sectiondivdiv1 = $('<div>').attr("class", "row").append(sectiondivdiv1div1).append(sectiondivdiv1div2).append(sectiondivdiv1div3);

    var sectiondivdiv2div3 = $('<div>').attr("class", "col-md-1 col-lg-1 col-sm-12 col-xs-12");


    var sectiondivdiv2div2divdivdivh5 = $('<h5>').append(Producto.DescripcionLarga);
    var sectiondivdiv2div2divdivdiv = $('<div>').attr("class", "pro__tab__content__inner").append(sectiondivdiv2div2divdivdivh5);
    var sectiondivdiv2div2divdiv = $('<div>').attr("role", "tabpanel").attr("class", "pro__single__content tab-pane fade in active").append(sectiondivdiv2div2divdivdiv);
    var sectiondivdiv2div2div = $('<div>').attr("class", "ht__pro__details__content").append(sectiondivdiv2div2divdiv);
    var sectiondivdiv2div2 = $('<div>').attr("class", "col-md-10 col-lg-10 col-sm-12 col-xs-12").append(sectiondivdiv2div2div);
    var sectiondivdiv2div1 = $('<div>').attr("class", "col-md-1 col-lg-1 col-sm-12 col-xs-12");
    var sectiondivdiv2 = $('<div>').attr("class", "row").append(sectiondivdiv2div1).append(sectiondivdiv2div2).append(sectiondivdiv2div3);
    var sectiondiv = $('<div>').attr("class", "container").append(sectiondivdiv1).append(sectiondivdiv2);

    var sectionhtc__produc__decription = $('<section>').attr("class", "htc__produc__decription bg__white").append(sectiondiv);
    $("#DetalleCompleto").append(sectionhtc__product__details).append(sectionhtc__produc__decription);






       

  

    

 

 







  
   


    





 
}



$(document).ready(function () {




    IdProducto = sessionStorage.getItem("IdProducto");
    parseInt(IdProducto);   


    var url = "/Producto/obtenerProductodetalle";
    var datos = { Producto: IdProducto};
    $.ajax({

        url: url,
        data: datos,
        type: "GET",
        dataType: "json",

    })
        .done(function (data, textStatus, jqXHR) {

            $.ajax({

                url: "/Contenidos/obtenerContenidos",
                data: {},
                type: "GET",
                dataType: "json",

            })
                .done(function (data1, textStatus, jqXHR) {

                  
                    $.ajax({
                        url: "/ImagenProductos/obtenerImagenProductosoloCatalogo",
                        data: { Producto: IdProducto },
                        type: "GET",
                        dataType: "json",

                    })
                        .done(function (data2, textStatus, jqXHR) {


                            ObtenerDetalleProductoDtoExitoso(data, data1, data2);

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

});