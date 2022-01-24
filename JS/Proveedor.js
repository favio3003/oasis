var _Proveedor;
var IdPro;

function GuardarProveedorExitoso() {

    $("#AgregarProveedor").modal("hide");
    toastr.success("Proveedor registrado Correctamente.");

    var Proveedor = {
        IdProveedor: 0,
        Nombre: $("#txtNombre").val().trim(),
        Direccion: $("#txtDireccion").val().trim(),
        Descripcion: $("#txtDescripcion").val().trim(),
        Contacto: $("#txtContacto").val().trim(),
        Telefono: $("#txtTelefono").val().trim(),
        Celular: $("#txtCelular").val().trim(),
        Correo: $("#txtCorreo").val().trim(),
        Estado: 1,
      
    };


    var Proveedordto = JSON.stringify(Proveedor);

    $.ajax({

        url: "/Proveedor/GuardarProveedor",
        data: { pProveedor: Proveedordto },
        type: "POST",
        dataType: "json",

    })
        .done(function (IdProveedorCreado, textStatus, jqXHR) {

 
            ListaProveedor();

        })
        .fail(function (jqXHR, textStatus, errorThrown) {

            console.log("La solicitud a fallado: " + textStatus);

        });







}

$("#btnGuardarProveedor").click(function () {

    var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var correo = $("#txtCorreo").val();

    if ($("#txtNombre").val() == "") {
        toastr.error("Complete el campo de Nombre");
    } else {
        if ($("#txtDescripcion").val() == "") {
            toastr.error("Complete el campo de Descripcion ");
        } else {
            if ($("#txtCorreo").val() == "") {

                toastr.error("Complete el campo de Dirección de correo electrónico ");
            } else {
                if (!regex.test(correo)) {
                    toastr.error("El campo de Dirección de correo electrónico Incorrecto");
                } else {
                    GuardarProveedorExitoso();
                }
                
            }
        }
    }

});

function LimpiarModalProveedor() {

    $("#txtNombre").val("");
    $("#txtDireccion").val("");
    $("#txtDescripcion").val("");
    $("#txtContacto").val("");
    $("#txtTelefono").val("");
    $("#txtCelular").val("");
    $("#txtCorreo").val("");

    $("#btnGuardarProveedor").show();
    $("#btnEditarProveedor").hide();
    $("#btnImprimirProveedor").hide();
}

$("#btnNuevo").click(function () {

    $("#AgregarProveedor").modal("show");
    LimpiarModalProveedor();

});

function EditarProveedorExitoso() {

    $("#AgregarProveedor").modal("hide");
    toastr.success("Proveedor Editado Correctamente.");

    var Proveedor = {
        IdProveedor: IdPro,
        Nombre: $("#txtNombre").val().trim(),
        Direccion: $("#txtDireccion").val().trim(),
        Descripcion: $("#txtDescripcion").val().trim(),
        Contacto: $("#txtContacto").val().trim(),
        Telefono: $("#txtTelefono").val().trim(),
        Celular: $("#txtCelular").val().trim(),
        Correo: $("#txtCorreo").val().trim(),
        Estado: 1,

    };


    var Proveedordto = JSON.stringify(Proveedor);

    $.ajax({

        url: "/Proveedor/GuardarProveedor",
        data: { pProveedor: Proveedordto },
        type: "POST",
        dataType: "json",

    })
        .done(function (IdProveedorCreado, textStatus, jqXHR) {


            ListaProveedor();

        })
        .fail(function (jqXHR, textStatus, errorThrown) {

            console.log("La solicitud a fallado: " + textStatus);

        });







}

$("#btnEditarProveedor").click(function () {

    IdPro
    var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var correo = $("#txtCorreo").val();

    $.each(_Proveedor, function (index, elementos) {
        if (IdPro == elementos.IdProveedor) {
            if ($("#txtNombre").val() == elementos.Nombre &&
                $("#txtDireccion").val() == elementos.Direccion &&
                $("#txtDescripcion").val() == elementos.Descripcion &&
                $("#txtContacto").val() == elementos.Contacto &&
                $("#txtTelefono").val() == elementos.Telefono &&
                $("#txtCelular").val() == elementos.Celular &&
                $("#txtCorreo").val() == elementos.Correo 
            
            ) {
                toastr.error("Es necesario que modifique algo para poder editar");

            } else {
                if ($("#txtNombre").val() == "") {
                    toastr.error("Complete el campo de Nombre");
                } else {
                    if ($("#txtDescripcion").val() == "") {
                        toastr.error("Complete el campo de Descripcion ");
                    } else {
                        if ($("#txtCorreo").val() == "") {

                            toastr.error("Complete el campo de Dirección de correo electrónico ");
                        } else {
                            if (!regex.test(correo)) {
                                toastr.error("El campo de Dirección de correo electrónico Incorrecto");
                            } else {
                                EditarProveedorExitoso();
                            }

                        }
                    }
                }
            }
      

        }

    });



});

function EditarProveedor(id) {
    IdPro = id;
    $("#AgregarProveedor").modal("show");
    $("#btnGuardarProveedor").hide();
    $("#btnEditarProveedor").show();
    $("#btnImprimirProveedor").show();

    $.each(_Proveedor, function (index, elementos) {
        if (id == elementos.IdProveedor) {
            $("#txtNombre").val(elementos.Nombre);
            $("#txtDireccion").val(elementos.Direccion);
            $("#txtDescripcion").val(elementos.Descripcion);
            $("#txtContacto").val(elementos.Contacto);
            $("#txtTelefono").val(elementos.Telefono);
            $("#txtCelular").val(elementos.Celular);
            $("#txtCorreo").val(elementos.Correo);

        }

    });








}

function Cargardatos() {

 

    $('#gridProveedor').dxDataGrid({
        dataSource: _Proveedor,
        columns:

            [
                {
                    dataField: 'Nombre',
                    caption: 'Nombre',
                    alignment: 'left',
                },
                {
                    dataField: 'Direccion',
                    caption: 'Direccion',
                    alignment: 'left',
                },
                {
                    dataField: 'Descripcion',
                    caption: 'Descripcion',
                    alignment: 'left',
                },
                {
                    dataField: 'Contacto',
                    caption: 'Contacto',

                    alignment: 'right',
                },

                {
                    dataField: 'Telefono',
                    caption: 'Telefono',
                    alignment: 'left',
                },
                {
                    dataField: 'Celular',
                    caption: 'Celular',
                    alignment: 'left',
                },
                {
                    dataField: 'Correo',
                    caption: 'Correo',
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
                + `<td class='alinearcentro' onclick = "EditarProveedor(` + data.IdProveedor + `)">${data.Nombre}</td>`
                + `<td class='alinearcentro' onclick = "EditarProveedor(` + data.IdProveedor + `)">${data.Direccion}</td>`
                + `<td class='alinearcentro' onclick = "EditarProveedor(` + data.IdProveedor + `)">${data.Descripcion}</td>`
                + `<td class='alinearcentro' onclick = "EditarProveedor(` + data.IdProveedor + `)">${data.Contacto}</td>`
                + `<td class='alinearcentro' onclick = "EditarProveedor(` + data.IdProveedor + `)">${data.Telefono}</td>`
                + `<td class='alinearcentro' onclick = "EditarProveedor(` + data.IdProveedor + `)">${data.Celular}</td>`
                + `<td class='alinearderecha' onclick = "EditarProveedor(` + data.IdProveedor + `)">${data.Correo}</td>`
         
                + '</tr>'


            container.append(markup);
        },
    });

}

function ListaProveedor() {

    $.ajax({

        url: "/Proveedor/obtenerProveedors",
        data: {},
        type: "GET",
        dataType: "json",

    })
        .done(function (data, textStatus, jqXHR) {


            _Proveedor = data.Data.Data;
            Cargardatos();


        })
        .fail(function (jqXHR, textStatus, errorThrown) {

            console.log("La solicitud a fallado: " + textStatus);

        });
}

$(document).ready(function () {
    IdUsusriolog = sessionStorage.getItem("IdUsusriolog");
    ListaProveedor();
    $('.js-example-basic-single').select2();

});