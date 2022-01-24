var _NotaVentas;
var _Contenido;
var _Productos;
var _Usuarios;
var IDDetalleVolatil;
var Detallevolatil = [];
var IdUsusriolog;

function CancelarPedido(id) {

    $("#EliminarModal").modal("hide");
    toastr.success("Pedido Cancelado Correctamente.");

    $.each(_NotaVentas, function (index, elemento) {
        if (elemento.IdNota == id) {

            var nota = {
                IdNota: id,
                NroNota: elemento.NroNota,
                Fecha: elemento.Fecha,
                RazonSocial: elemento.RazonSocial,
                NIT: elemento.NIT,
                Direccion1: elemento.Direccion1,
                Direccion2: elemento.Direccion2,
                Direccion3: elemento.Direccion3,
                DireccionCorreo: elemento.DireccionCorreo,
                Telefono: elemento.Telefono,
                Descripcion: elemento.Descripcion,
                Total: elemento.Total,
                Entrega: elemento.Entrega,
                Tipo: elemento.Tipo,
                IdUsuario: elemento.IdUsuario,
                Estado: 3
            };


            var notadto = JSON.stringify(nota);

            $.ajax({

                url: "/Nota/GuardarNota",
                data: { pNota: notadto },
                type: "POST",
                dataType: "json",

            })
                .done(function (data, textStatus, jqXHR) {

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

                              
                                    for (var i = 0; i < detalle.length; i += 1) {

                                        bol = detalle[i];
                                        $.each(Productos, function (index, elemento) {
                                            if (elemento.IdProducto == bol.IdProducto) {


                                                var Producto = {
                                                    IdProducto: elemento.IdProducto,
                                                    Nombre: elemento.Nombre,
                                                    DescripcionCorta: elemento.DescripcionCorta,
                                                    DescripcionLarga: elemento.DescripcionLarga,
                                                    Precio: elemento.Precio,
                                                    PrecioOferta: elemento.PrecioOferta,
                                                    DireccionImagen: elemento.DireccionImagen,
                                                    Cantidad: elemento.Cantidad + bol.Cantidad,
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

    });




}

function CanceladoNotaadm(id) {
    $.each(_NotaVentas, function (index, elemento) {
        if (elemento.IdNota == id) {
            var modal = '#EliminarModal';
            $(modal).find(".modal-title").html('Cancelar Pedido');
            $(modal).find(".text-mensaje-modal").html('El Pedido  Nro '
                + "'" + elemento.NroNota + "' ha sido Cancelado?");
            $(modal).find(".modal-body").css({ 'min-height': 100 + "px" });
            $(modal).modal({ backdrop: 'static', keyboard: false });
            $("#btnEliminar").unbind('click').click(function () {
                CancelarPedido(id);
            });
        }

    });



}

function PedidoEntregado(id) {
    $("#EliminarModal").modal("hide");
    toastr.success("Pedido Entregado Correctamente.");

    $.each(_NotaVentas, function (index, elemento) {
        if (elemento.IdNota == id) {

            var nota = {
                IdNota: id,
                NroNota: elemento.NroNota,
                Fecha: elemento.Fecha,
                RazonSocial: elemento.RazonSocial,
                NIT: elemento.NIT,
                Direccion1: elemento.Direccion1,
                Direccion2: elemento.Direccion2,
                Direccion3: elemento.Direccion3,
                DireccionCorreo: elemento.DireccionCorreo,
                Telefono: elemento.Telefono,
                Descripcion: elemento.Descripcion,
                Total: elemento.Total,
                Entrega: elemento.Entrega,
                Tipo: elemento.Tipo,
                IdUsuario: elemento.IdUsuario,
                Estado: 2
            };


            var notadto = JSON.stringify(nota);

            $.ajax({

                url: "/Nota/GuardarNota",
                data: { pNota: notadto },
                type: "POST",
                dataType: "json",

            })
                .done(function (IdnotaCreado, textStatus, jqXHR) {
          
                    ListaNota();
                })
                .fail(function (jqXHR, textStatus, errorThrown) {

                    console.log("La solicitud a fallado: " + textStatus);

                });

        }

    });



}

function entregadoNotaadm(id) {



    $.each(_NotaVentas, function (index, elemento) {
        if (elemento.IdNota == id) {
            var modal = '#EliminarModal';
            $(modal).find(".modal-title").html('Entrega de Pedido');
            $(modal).find(".text-mensaje-modal").html('El Pedido  Nro '
                + "'" + elemento.NroNota + "' ha sido Entregado?");
            $(modal).find(".modal-body").css({ 'min-height': 100 + "px" });
            $(modal).modal({ backdrop: 'static', keyboard: false });
            $("#btnEliminar").unbind('click').click(function () {
                PedidoEntregado(id);
            });
        }

    });





}

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
        var trTablatd6a = "<a onclick='CanceladoNotaadm(" + Productolis.IdNota + ")'><i class='fa fa-close'></i></a>";

        var trTablatd6ax = "<a onclick='entregadoNotaadm(" + Productolis.IdNota + ")'><i class='fa fa-check'></i></a>";
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
            Entregado: trTablatd6ax,
            Cancelado: trTablatd6a,
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

                {
                    type: 'buttons',
                    width: 100,
                    alignment: 'center',

                },
                {
                    type: 'buttons',
                    width: 100,
                    alignment: 'center',

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
                + `<td class='alinearcentro'>${data.Entregado}</td>`
                + `<td class='alinearcentro'>${data.Cancelado}</td>`
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

        url: "/Producto/obtenerProductosDisponibles",
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

        url: "/Nota/obtenerNotaVentaPorEntregar",
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