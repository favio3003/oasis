var _NotaVentas;
var _Contenido;
var _Productos;
var _Usuarios;
var IDDetalleVolatil;
var Detallevolatil = [];
var IdUsusriolog;





function notadetalleGuardado() {



    for (var i = 0; i < Detallevolatil.length; i += 1) {

        var bol = Detallevolatil[i];

        $.each(_Productos, function (index, elemento) {
            if (bol.IdProducto == elemento.IdProducto) {

                var Producto = {
                    IdProducto: elemento.IdProducto,
                    Nombre: elemento.Nombre,
                    DescripcionCorta: elemento.DescripcionCorta,
                    DescripcionLarga: elemento.DescripcionLarga,
                    Precio: elemento.Precio,
                    PrecioOferta: elemento.PrecioOferta,
                    DireccionImagen: elemento.DireccionImagen,
                    Cantidad: elemento.Cantidad - bol.Cantidad,
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


                        ListaNota();


                    })
                    .fail(function (jqXHR, textStatus, errorThrown) {

                        console.log("La solicitud a fallado: " + textStatus);

                    });



            }

        });
    };








}

function GuardarNotaExitoso() {

    $("#AgregarVenta").modal("hide");
    toastr.success("Nota Realizada Correctamente.");

    $.ajax({

        url: "/Nota/obtenerNotacompra",
        data: {},
        type: "POST",
        dataType: "json",

    })
        .done(function (NotaVenta, textStatus, jqXHR) {



            var notalist = NotaVenta.Data.Data





            var fechaSplit = $("#txtFecha").val().split("-");
            var fecha = new Date(Number(fechaSplit[0]), Number(fechaSplit[1]) - 1,
                Number(fechaSplit[2]), 0, 0, 0);
            fechaJson = "/Date(" + fecha.getTime() + ")/";


            if ($("#ENVIO").val() != 4) {
                var totalnota = 0;
                for (var i = 0; i < Detallevolatil.length; i += 1) {

                    bol = Detallevolatil[i];
                    totalnota = totalnota + bol.Total;

                }
                var totalmenvio = totalnota + 30;


            } else {

                var totalnota = 0;
                for (var i = 0; i < Detallevolatil.length; i += 1) {

                    bol = Detallevolatil[i];
                    totalnota = totalnota + bol.Total;

                }
                var totalmenvio = totalnota;

            }

            if ($("#ENVIO").val() != 4) {
                var nota = {
                    IdNota: 0,
                    NroNota: notalist.length + 1,
                    Fecha: $("#txtFecha").val().trim() == "" ? null : fechaJson,
                    RazonSocial: $("#txtRazonSocial").val().trim(),
                    NIT: $("#txtNIT").val().trim(),
                    Direccion1: $("#txtDireccion1").val().trim(),
                    Direccion2: null,
                    Direccion3: null,
                    DireccionCorreo: null,
                    Telefono: $("#txtTelefono").val().trim(),
                    Descripcion: null,
                    Total: totalmenvio,
                    Entrega: $("#ENVIO").val(),
                    Tipo: 1,
                    IdUsuario: parseInt(IdUsusriolog),
                    Estado: 1
                };
            } else {
                var nota = {
                    IdNota: 0,
                    NroNota: notalist.length + 1,
                    Fecha: $("#txtFecha").val().trim() == "" ? null : fechaJson,
                    RazonSocial: $("#txtRazonSocial").val().trim(),
                    NIT: $("#txtNIT").val().trim(),
                    Direccion1: $("#txtDireccion1").val().trim(),
                    Direccion2: null,
                    Direccion3: null,
                    DireccionCorreo: null,
                    Telefono: $("#txtTelefono").val().trim(),
                    Descripcion: null,
                    Total: totalmenvio,
                    Entrega: $("#ENVIO").val(),
                    Tipo: 1,
                    IdUsuario: parseInt(IdUsusriolog),
                    Estado: 2
                };
            }





            var notadto = JSON.stringify(nota);

            $.ajax({

                url: "/Nota/GuardarNota",
                data: { pNota: notadto },
                type: "POST",
                dataType: "json",

            })
                .done(function (IdnotaCreado, textStatus, jqXHR) {

                    var NotaCreada = IdnotaCreado.Data.Data;





                    for (var i = 0; i < Detallevolatil.length; i += 1) {

                        bol = Detallevolatil[i];
                        $.each(_Productos, function (index, elemento) {
                            if (bol.IdProducto == elemento.IdProducto) {

                                if (elemento.PrecioOferta != 0) {
                                    Precio = elemento.PrecioOferta;
                                }
                                else {
                                    Precio = elemento.Precio;
                                }

                            }

                        });
                        var total = Precio * bol.Cantidad;

                        var Detalle = {
                            IdDetalle: 0,
                            IdProducto: bol.IdProducto,
                            IdNota: parseInt(NotaCreada),
                            Cantidad: bol.Cantidad,
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

$("#btnGuardarNota").click(function () {


    if ($("#txtRazonSocial").val() == "") {
        toastr.error("Complete el campo de Nombre / Razon Social");
    } else {
        if ($("#txtNIT").val() == "") {
            toastr.error("Complete el campo de NIT ");
        } else {
            if ($("#txtFecha").val() == "") {

                toastr.error("Complete el campo de Fecha ");
            } else {
                if (Detallevolatil.length < 1) {
                    toastr.error("No se puede agregar si no tiene ningun detalle ");
                } else {
                    GuardarNotaExitoso();
                }
            }
        }
    }

});

function Envio() {


    if ($("#ENVIO").val() == 1 || $("#ENVIO").val() == 2) {


        var totalnota = 0;
        for (var i = 0; i < Detallevolatil.length; i += 1) {

            bol = Detallevolatil[i];
            totalnota = totalnota + bol.Total;


        }
        var totalmenvio = totalnota + 30;
        $("#txtTotalPedido").empty();

        $("#txtTotalPedido").append("Bs. " + totalmenvio);

        $("#Envio30").empty();

        $("#Envio30").append("Bs. " + 30);


        $("#txtsubtotalPedido").empty();

        $("#txtsubtotalPedido").append("Bs. " + totalnota);

    } else {

        var totalnota = 0;
        for (var i = 0; i < Detallevolatil.length; i += 1) {

            bol = Detallevolatil[i];
            totalnota = totalnota + bol.Total;


        }
        var totalmenvio = totalnota;
        $("#txtTotalPedido").empty();

        $("#txtTotalPedido").append("Bs. " + totalmenvio);

        $("#Envio30").empty();

        $("#Envio30").append("Bs. " + 0);


        $("#txtsubtotalPedido").empty();

        $("#txtsubtotalPedido").append("Bs. " + totalnota);
    }

}

function eliminardelistavolatilexitosa(IdDetalle) {

    var contador = 0;


    var detallevol = [];
    for (var i = 0; i < Detallevolatil.length; i += 1) {

        var bol = Detallevolatil[i];

        if (bol.IdDetalle == IdDetalle) {


        }
        else {
            detallevol[contador] = bol;
            contador++;
        }


    }

    Detallevolatil = detallevol;
    $("#EliminarModal").modal("hide");

    toastr.success("Detalle eliminado correctamente");
    mostrardetalleVolatil();

}

function Eliminardelistavolatil(IdDetalle) {



    for (var i = 0; i < Detallevolatil.length; i += 1) {

        bol = Detallevolatil[i];


        if (bol.IdDetalle == IdDetalle) {


            $.each(_Productos, function (index, elemento) {
                if (bol.IdProducto == elemento.IdProducto) {

                    var modal = '#EliminarModal';
                    $(modal).find(".modal-title").html('Eliminar Detalle');
                    $(modal).find(".text-mensaje-modal").html('Esta seguro que desea eliminar el Producto '
                        + "'" + elemento.Nombre + "'    ?");
                    $(modal).find(".modal-body").css({ 'min-height': 100 + "px" });
                    $(modal).modal({ backdrop: 'static', keyboard: false });
                    $("#btnEliminar").unbind('click').click(function () {
                        eliminardelistavolatilexitosa(IdDetalle);
                    });

                }
            });

        }

    }






}

function LimpiarModalVenta() {


    $("#btnNuevoDetalle").show();
    $("#btnGuardarNota").show();
    $("#btnImprimirNota").hide();

    $("#lENVIO").show();
    $("#lEstado").hide();
    $("#lEntrega").hide();

    $("#lDireccionCorreo").hide();
    $("#ltxtDireccion2").hide();
    $("#ltxtDireccion3").hide();
    $("#ltxtDescripcion").hide();


    $("#txtFecha").prop('disabled', false);
    $("#txtRazonSocial").prop('disabled', false);
    $("#txtNIT").prop('disabled', false);
    $("#ENVIO").prop('disabled', false);
    $("#txtTelefono").prop('disabled', false);
    $("#txtDireccion1").prop('disabled', false);


    let date = new Date();
    let output = date.toISOString().split('T')[0];

    $("#txtFecha").val(output);

    $("#txtRazonSocial").val("SIN NOMBRE");
    $("#txtNIT").val("0");
    $("#ENVIO").val("1");
    $("#txtTelefono").val("");
    $("#txtDireccion1").val("");

    Detallevolatil = [];
    mostrardetalleVolatil();



    var totalnota = 0;
    for (var i = 0; i < Detallevolatil.length; i += 1) {

        bol = Detallevolatil[i];
        totalnota = totalnota + bol.Total;


    }
    var totalmenvio = totalnota + 30;
    $("#txtTotalPedido").empty();

    $("#txtTotalPedido").append("Bs. " + totalmenvio);


    $("#txtsubtotalPedido").empty();

    $("#txtsubtotalPedido").append("Bs. " + totalnota);





}

function EditardetalleBolatil(id) {

    $("#AgregarDetalle").modal("show");

    IDDetalleVolatil = id;
    $("#btnGuardarDetalle").hide();
    $("#btneditarDetalle").show();


    $("#IdProductoSelect").empty();

    var Productosdis = [];


    Productosdis[0] = {
        IdProducto: 0,
        Nombre: 'SELECCIONE PRODUCTO'
    };
    for (var i = 0; i < _Productos.length; i += 1) {

        bol = _Productos[i];
        Productosdis[i + 1] = {
            IdProducto: bol.IdProducto,
            Nombre: bol.IdProducto + ' - ' + bol.Nombre
        };


    }


    var prop = { id: "IdProducto", value: "Nombre" };
    adicionarOpcionesCombo($("#IdProductoSelect"), Productosdis, '', prop, false);



    for (var i = 0; i < Detallevolatil.length; i += 1) {

        bol = Detallevolatil[i];
        if (bol.IdDetalle == id) {

            $("#IdProductoSelect").val(bol.IdProducto);
            $("#CantidaDetalle").empty();
            $("#PrecioDetalle").empty();
            $("#txtTotal").empty();

            $("#CantidaDetalle").val(bol.Cantidad);
            $("#PrecioDetalle").append("Bs. " + bol.PrecioProducto);
            $("#txtTotal").append("Bs. " + bol.Total);

            $("#CantidaDetalle").prop('disabled', false);
            $("#IdProductoSelect").prop('disabled', "disabled");
        }


    }







}

function mostrardetalleVolatil() {


    if ($("#ENVIO").val() == 1 || $("#ENVIO").val() == 2) {


        var totalnota = 0;
        for (var i = 0; i < Detallevolatil.length; i += 1) {

            bol = Detallevolatil[i];
            totalnota = totalnota + bol.Total;


        }
        var totalmenvio = totalnota + 30;
        $("#txtTotalPedido").empty();

        $("#txtTotalPedido").append("Bs. " + totalmenvio);


        $("#txtsubtotalPedido").empty();

        $("#txtsubtotalPedido").append("Bs. " + totalnota);

    } else {

        var totalnota = 0;
        for (var i = 0; i < Detallevolatil.length; i += 1) {

            bol = Detallevolatil[i];
            totalnota = totalnota + bol.Total;


        }
        var totalmenvio = totalnota;
        $("#txtTotalPedido").empty();

        $("#txtTotalPedido").append("Bs. " + totalmenvio);


        $("#txtsubtotalPedido").empty();

        $("#txtsubtotalPedido").append("Bs. " + totalnota);
    }



    $('#gridDetalle').dxDataGrid({
        dataSource: Detallevolatil,
        columns:

            [
                {
                    dataField: 'NombreProducto',
                    caption: 'Nombre Producto',
                    alignment: 'left',


                },
                {
                    dataField: 'Cantidad',
                    caption: 'Cantidad',

                    alignment: 'left',
                },

                {
                    dataField: 'PrecioProducto',
                    caption: 'Precio Producto',
                    alignment: 'left',
                },
                {
                    dataField: 'Total',
                    caption: 'Sub Total',
                    alignment: 'left',
                },

                {
                    type: 'buttons',
                    width: 100,
                    alignment: 'left',

                },

            ],

        headerFilter: {
            visible: true,
            allowSearch: true,
        },

        filterRow: {
            visible: true,
            applyFilter: 'auto',
        },

        paging: {
            pageSize: 5,
        },
        pager: {
            visible: true,


            showNavigationButtons: true,
        },


        showRowLines: true,

        showBorders: true,

        dataRowTemplate(container, item) {
            const { data } = item;
            const markup = `<tr class= 'TablaCompleta' >`
                + `<td   onclick = "EditardetalleBolatil(` + data.IdDetalle + `)" >${data.NombreProducto}</td>`
                + `<td class='alinearderecha' onclick = "EditardetalleBolatil(` + data.IdDetalle + `)" >${data.Cantidad}</td>`
                + `<td class='alinearderecha' onclick = "EditardetalleBolatil(` + data.IdDetalle + `)" >${data.PrecioProducto}</td>`
                + `<td class='alinearderecha' onclick = "EditardetalleBolatil(` + data.IdDetalle + `)" >${data.Total}</td>`

                + `<td class='alinearcentro' onclick = "Eliminardelistavolatil(` + data.IdDetalle + `)"  ><i class='icon-trash icons'></i></td>`
                + '</tr>'




            container.append(markup);
        },
    });

}

function GuardarDetallevolatil(Precio, Nombre) {

    toastr.success("Producto Añadido a la venta");
    $("#AgregarDetalle").modal("hide");

    var total = Precio * $("#CantidaDetalle").val();

    var id = Detallevolatil.length;

    Detallevolatil[id] = {
        IdDetalle: parseInt($("#IdProductoSelect").val()),
        IdProducto: parseInt($("#IdProductoSelect").val()),
        NombreProducto: Nombre,
        IdNota: 0,
        Cantidad: $("#CantidaDetalle").val(),
        PrecioProducto: Precio,
        Total: total,
        Tipo: 1,
        Estado: 1,


    };


    mostrardetalleVolatil();

}

$("#btneditarDetalle").click(function () {

    if ($("#CantidaDetalle").val() <= 0) {
        toastr.error("La Cantidad debe ser mayor a 0");
    }
    else {

        for (var i = 0; i < Detallevolatil.length; i += 1) {

            bol = Detallevolatil[i];


            if (bol.IdDetalle == IDDetalleVolatil) {


                $.each(_Productos, function (index, elemento) {
                    if (bol.IdProducto == elemento.IdProducto) {

                        if ($("#CantidaDetalle").val() > elemento.Cantidad) {

                            toastr.error("No existe esa cantidad de productos la Cantidad existente es de " + elemento.Cantidad);
                        } else {

                            var total = Detallevolatil[i].PrecioProducto * $("#CantidaDetalle").val();
                            Detallevolatil[i].Cantidad = $("#CantidaDetalle").val();
                            Detallevolatil[i].Total = total;

                            toastr.success("Detalle Editado Correcatmante");
                            $("#AgregarDetalle").modal("hide");
                            mostrardetalleVolatil();

                        }

                    }
                });



            }





        }



    }

});

$("#btnGuardarDetalle").click(function () {


    var idProducto = parseInt($("#IdProductoSelect").val());


    if (idProducto == 0) {

        toastr.error("Seleccione un Producto");


    } else {

        if ($("#CantidaDetalle").val() <= 0) {
            toastr.error("La Cantidad debe ser mayor a 0");
        }
        else {

            $.each(_Productos, function (index, elemento) {
                if (elemento.IdProducto == idProducto) {

                    var boll = false;
                    $.each(Detallevolatil, function (index, elementos) {

                        if (elemento.IdProducto == elementos.IdProducto) {
                            boll = true;
                        }


                    });

                    if (boll == true) {

                        toastr.error("No se puede agregar dos veces el mismo producto al detalle");
                    } else {

                        if ($("#CantidaDetalle").val() > elemento.Cantidad) {

                            toastr.error("No existe esa cantidad de productos la Cantidad existente es de " + elemento.Cantidad);
                        }
                        else {


                            var PrecioProducto;
                            if (elemento.PrecioOferta == 0) {
                                PrecioProducto = elemento.Precio;
                            } else {
                                PrecioProducto = elemento.PrecioOferta;
                            }


                            GuardarDetallevolatil(PrecioProducto, elemento.Nombre);
                        }

                    }




                }

            });
        }


    }


});

function valorTotal() {

    $("#CantidaDetalle").val();
    $("#PrecioDetalle").append();

    if ($("#CantidaDetalle").val() == "") {
        $("#CantidaDetalle").val(0);
    } else {
        if ($("#PrecioDetalle").val() == "") {
            $("#PrecioDetalle").val(0);
        } else {
            var cantid = parseInt($("#CantidaDetalle").val());
            var Precio = parseFloat($("#PrecioDetalle").val());
            debugger
            var total = cantid * Precio;
            total = total.toFixed(2);

            $("#txtTotal").empty();
            $("#txtTotal").append(total);
        }
    }

}


function LimpiarModalDetalle() {

    $("#btnGuardarDetalle").show();
    $("#btneditarDetalle").hide();

    $("#IdProductoSelect").empty();

    var Productosdis = [];


    Productosdis[0] = {
        IdProducto: 0,
        Nombre: 'SELECCIONE PRODUCTO'
    };
    for (var i = 0; i < _Productos.length; i += 1) {

        bol = _Productos[i];
        Productosdis[i + 1] = {
            IdProducto: bol.IdProducto,
            Nombre: bol.IdProducto + ' - ' + bol.Nombre
        };


    }


    var prop = { id: "IdProducto", value: "Nombre" };
    adicionarOpcionesCombo($("#IdProductoSelect"), Productosdis, '', prop, false);

    $("#IdProductoSelect").val(0);
    $("#CantidaDetalle").empty();
    $("#PrecioDetalle").empty();
    $("#txtTotal").empty();

    $("#CantidaDetalle").val(0);
    $("#PrecioDetalle").append(0);
    $("#txtTotal").append(0);

    $("#CantidaDetalle").prop('disabled', false);

    $("#IdProductoSelect").prop('disabled', false);

}


$("#btnNuevo").click(function () {

    $("#AgregarVenta").modal("show");
    LimpiarModalVenta();

});

$("#btnNuevoDetalle").click(function () {

    $("#AgregarDetalle").modal("show");
    LimpiarModalDetalle();

});

function EditarNota(id) {

    $("#btnImprimirNota").show();
    $("#AgregarVenta").modal("show");
    $("#btnNuevoDetalle").hide();
    $("#lENVIO").hide();
    $("#lEstado").show();
    $("#lEntrega").show();
    $("#lDireccionCorreo").show();
    $("#ltxtDireccion2").show();
    $("#ltxtDireccion3").show();
    $("#ltxtDescripcion").show();
    $("#btnGuardarNota").hide();

    $("#txtNIT").prop('disabled', 'disabled');
    $("#txtFecha").prop('disabled', 'disabled');
    $("#txtRazonSocial").prop('disabled', 'disabled');

    $("#txtTelefono").prop('disabled', 'disabled');
    $("#txtDireccion1").prop('disabled', 'disabled');
    $("#Estado").prop('disabled', 'disabled');
    $("#Entrega").prop('disabled', 'disabled');
    $("#txtDireccion2").prop('disabled', 'disabled');
    $("#txtDireccion3").prop('disabled', 'disabled');
    $("#txtDescripcion").prop('disabled', 'disabled');
    $("#DireccionCorreo").prop('disabled', 'disabled');

    for (var i = 0; i < _NotaVentas.length; i += 1) {

        var bol = _NotaVentas[i];

        if (bol.IdNota == id) {

            var fecha = ponerFormatoFecha(bol.Fecha);
            var fechaInicial = fecha.split("/");
            fechaInicial = fechaInicial[2] + "-" + fechaInicial[1] + "-" + fechaInicial[0];


            $("#txtNIT").val(bol.NIT);
            $("#txtFecha").val(fechaInicial);
            $("#txtRazonSocial").val(bol.RazonSocial);
            $("#DireccionCorreo").val(bol.DireccionCorreo);
            $("#txtTelefono").val(bol.Telefono);
            $("#txtDireccion1").val(bol.Direccion1);
            $("#Estado").val(bol.Estado);
            $("#Entrega").val(bol.Entrega);
            $("#txtDireccion2").val(bol.Direccion2);
            $("#txtDireccion3").val(bol.Direccion3);
            $("#txtDescripcion").val(bol.Descripcion);





            if (bol.Entrega == 4) {

                $("#txtTotalPedido").empty();

                $("#txtTotalPedido").append("Bs. " + bol.Total);

                $("#Envio30").empty();

                $("#Envio30").append("Bs. " + 0);

                $("#txtsubtotalPedido").empty();

                $("#txtsubtotalPedido").append("Bs. " + bol.Total);
            } else {

                $("#txtTotalPedido").empty();

                $("#txtTotalPedido").append("Bs. " + bol.Total);

                $("#Envio30").empty();

                $("#Envio30").append("Bs. " + 30);

                $("#txtsubtotalPedido").empty();

                var subtoa = parseInt(bol.Total) - 30;
                $("#txtsubtotalPedido").append("Bs. " + subtoa);
            }



        }


    };



    $.ajax({

        url: "/Detalle/MostrarDetalleNota",
        data: { Detallenota: id },
        type: "GET",
        dataType: "json",

    })
        .done(function (detalle, textStatus, jqXHR) {

            var detalle = detalle.Data.Data;

            $.ajax({

                url: "/Producto/obtenerProductos",
                data: {},
                type: "GET",
                dataType: "json",

            })
                .done(function (Producto, textStatus, jqXHR) {
                    var Productos = Producto.Data.Data;

                    var Detalledto = [];
                    for (var i = 0; i < detalle.length; i += 1) {

                        bol = detalle[i];
                        $.each(Productos, function (index, elemento) {
                            if (elemento.IdProducto == bol.IdProducto) {
                                var precio = 0;
                                if (elemento.PrecioOferta != 0) {
                                    precio = elemento.PrecioOferta;
                                } else {
                                    precio = elemento.Precio;
                                }

                                var Preciovendido = bol.Total / bol.Cantidad;

                                Detalledto[i] = {
                                    IdDetalle: bol.IdDetalle,
                                    IdProducto: bol.IdProducto,
                                    NombreProducto: elemento.Nombre,
                                    IdNota: bol.IdNota,
                                    Cantidad: bol.Cantidad,
                                    PrecioProducto: Preciovendido,
                                    Total: bol.Total,
                                    Tipo: bol.Tipo,
                                    Estado: bol.Estado,


                                };



                            }

                        });


                    }

                    $('#gridDetalle').dxDataGrid({
                        dataSource: Detalledto,
                        columns:

                            [
                                {
                                    dataField: 'NombreProducto',
                                    caption: 'Nombre Producto',
                                    alignment: 'left',


                                },
                                {
                                    dataField: 'Cantidad',
                                    caption: 'Cantidad',

                                    alignment: 'left',
                                },

                                {
                                    dataField: 'PrecioProducto',
                                    caption: 'Precio Producto',
                                    alignment: 'left',
                                },
                                {
                                    dataField: 'Total',
                                    caption: 'Sub Total',
                                    alignment: 'left',
                                },



                            ],

                        headerFilter: {
                            visible: true,
                            allowSearch: true,
                        },

                        filterRow: {
                            visible: true,
                            applyFilter: 'auto',
                        },

                        paging: {
                            pageSize: 5,
                        },
                        pager: {
                            visible: true,


                            showNavigationButtons: true,
                        },


                        showRowLines: true,

                        showBorders: true,

                        dataRowTemplate(container, item) {
                            const { data } = item;
                            const markup = `<tr class= 'TablaCompleta' >`
                                + `<td>${data.NombreProducto}</td>`
                                + `<td class='alinearderecha'>${data.Cantidad}</td>`
                                + `<td class='alinearderecha'>${data.PrecioProducto}</td>`
                                + `<td class='alinearderecha'>${data.Total}</td>`


                                + '</tr>'




                            container.append(markup);
                        },
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

function Cargardatos() {

    var notaVentadto = [];

    for (var i = 0; i < _NotaVentas.length; i += 1) {

        var Productolis = _NotaVentas[i];

        var estado;

        $.each(_Contenido, function (index, elemento) {
            if (elemento.IdContP == 3) {
                if (Productolis.Estado == elemento.IdContH) {
                    estado = elemento.Nombre;
                }
            }

        });
        var entrega;
        $.each(_Contenido, function (index, elemento) {
            if (elemento.IdContP == 4) {
                if (Productolis.Entrega == elemento.IdContH) {
                    entrega = elemento.Nombre;
                }
            }

        });

        var NombreUsuario;
        $.each(_Usuarios, function (index, elemento) {

            if (Productolis.IdUsuario == elemento.IdUsuario) {
                NombreUsuario = elemento.IdUsuario + " - " + elemento.Usuario1;
            }


        });

        var fechaInicioFormato = ponerFormatoFecha(Productolis.Fecha);
        notaVentadto[i] = {
            IdNota: Productolis.IdNota,
            NroNota: Productolis.NroNota,
            RazonSocial: Productolis.RazonSocial,
            NIT: Productolis.NIT,
            Fecha: fechaInicioFormato,
            Total: Productolis.Total,
            Entrega: entrega,
            Estado: estado,
            IdUsuario: NombreUsuario,

        }



    }
    $("#Estado").empty();
    var Estado = [];
    $.each(_Contenido, function (index, elementoss) {
        if (elementoss.IdContP == 3) {
            Estado.push(elementoss);
        }
    });
    var prop = { id: "IdContH", value: "Nombre" };
    adicionarOpcionesCombo($("#Estado"), Estado, '', prop, false);

    $("#Entrega").empty();
    var Entrega = [];
    $.each(_Contenido, function (index, elementoss) {
        if (elementoss.IdContP == 4) {
            Entrega.push(elementoss);
        }
    });
    var prop = { id: "IdContH", value: "Nombre" };
    adicionarOpcionesCombo($("#Entrega"), Entrega, '', prop, false);

    $('#gridVenta').dxDataGrid({
        dataSource: notaVentadto,
        columns:

            [
                {
                    dataField: 'NroNota',
                    caption: 'NroNota',
                    alignment: 'left',
                },
                {
                    dataField: 'RazonSocial',
                    caption: 'RazonSocial',
                    alignment: 'left',
                },
                {
                    dataField: 'NIT',
                    caption: 'NIT',
                    alignment: 'left',
                },
                {
                    dataField: 'Fecha',
                    caption: 'Fecha',

                    alignment: 'right',
                },

                {
                    dataField: 'Entrega',
                    caption: 'Entrega',
                    alignment: 'left',
                },
                {
                    dataField: 'Estado',
                    caption: 'Estado',
                    alignment: 'left',
                },
                {
                    dataField: 'Total',
                    caption: 'Total',
                    alignment: 'right',
                },

                {
                    dataField: 'IdUsuario',
                    caption: 'Usuario',
                    alignment: 'right',
                },


            ],

        headerFilter: {
            visible: true,
            allowSearch: true,
        },

        paging: {
            pageSize: 20,
        },
        pager: {
            visible: true,


            showNavigationButtons: true,
        },
        filterRow: {
            visible: true,
            applyFilter: 'auto',
        },




        showRowLines: true,

        showBorders: true,

        dataRowTemplate(container, item) {
            const { data } = item;
            const markup = '<tr class=' + 'TablaCompleta  >'
                + `<td class='alinearcentro' onclick = "EditarNota(` + data.IdNota + `)">${data.NroNota}</td>`
                + `<td class='alinearcentro' onclick = "EditarNota(` + data.IdNota + `)">${data.RazonSocial}</td>`
                + `<td class='alinearcentro' onclick = "EditarNota(` + data.IdNota + `)">${data.NIT}</td>`
                + `<td class='alinearcentro' onclick = "EditarNota(` + data.IdNota + `)">${data.Fecha}</td>`
                + `<td class='alinearcentro' onclick = "EditarNota(` + data.IdNota + `)">${data.Entrega}</td>`
                + `<td class='alinearcentro' onclick = "EditarNota(` + data.IdNota + `)">${data.Estado}</td>`
                + `<td class='alinearderecha' onclick = "EditarNota(` + data.IdNota + `)">${data.Total}</td>`
                + `<td class='alinearderecha' onclick = "EditarNota(` + data.IdNota + `)">${data.IdUsuario}</td>`
                + '</tr>'


            container.append(markup);
        },
    });


    $("#IdProductoSelect").empty();

    var Productosdis = [];


    Productosdis[0] = {
        IdProducto: 0,
        Nombre: 'SELECCIONE PRODUCTO'
    };
    for (var i = 0; i < _Productos.length; i += 1) {

        bol = _Productos[i];
        Productosdis[i + 1] = {
            IdProducto: bol.IdProducto,
            Nombre: bol.IdProducto + ' - ' + bol.Nombre
        };


    }


    var prop = { id: "IdProducto", value: "Nombre" };
    adicionarOpcionesCombo($("#IdProductoSelect"), Productosdis, '', prop, false);

    $("#IdProductoSelect").val(0);


    $("#CantidaDetalle").val(0);
    $("#PrecioDetalle").append(0);
    $("#txtTotal").append(0);

    $("#CantidaDetalle").prop('disabled', 'disabled');

}

function listaUsuario() {


    $.ajax({

        url: "/Usuario/ObtenerNombreUsuarioDto",
        data: {},
        type: "GET",
        dataType: "json",

    })
        .done(function (Usuario, textStatus, jqXHR) {


            _Usuarios = Usuario.Data.Data;

            Cargardatos();




        })
        .fail(function (jqXHR, textStatus, errorThrown) {

            console.log("La solicitud a fallado: " + textStatus);

        });
}

function ListaProductos() {


    $.ajax({

        url: "/Producto/obtenerProductos",
        data: {},
        type: "GET",
        dataType: "json",

    })
        .done(function (data, textStatus, jqXHR) {

            _Productos = data.Data.Data;

            listaUsuario();



        })
        .fail(function (jqXHR, textStatus, errorThrown) {

            console.log("La solicitud a fallado: " + textStatus);

        });


}

function ListaContenido() {


    $.ajax({

        url: "/Contenidos/obtenerContenidos",
        data: {},
        type: "GET",
        dataType: "json",

    })
        .done(function (data, textStatus, jqXHR) {

            _Contenido = data.Data.Data;

            ListaProductos();


        })
        .fail(function (jqXHR, textStatus, errorThrown) {

            console.log("La solicitud a fallado: " + textStatus);

        });


}

function ListaNota() {

    $.ajax({

        url: "/Nota/obtenerNotacompra",
        data: {},
        type: "GET",
        dataType: "json",

    })
        .done(function (data, textStatus, jqXHR) {


            _NotaVentas = data.Data.Data;
            ListaContenido();


        })
        .fail(function (jqXHR, textStatus, errorThrown) {

            console.log("La solicitud a fallado: " + textStatus);

        });
}

$(document).ready(function () {
    IdUsusriolog = sessionStorage.getItem("IdUsusriolog");
    ListaNota();
    $('.js-example-basic-single').select2();

});