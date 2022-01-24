var _ProductosLisDTO;
var _ContenidosLisDTO;
var IdProductoEditar;

function LimpiarModalNuevo() {

    $('#PortadadeProducto').empty();;
    $('#Productos').empty();

    $('#PortadadeProducto').fileinput('clear');
    $('#Productos').fileinput('clear');

    $('#PortadadeProducto').fileinput('reset');
    $('#Productos').fileinput('reset');

    $('#PortadadeProducto').fileinput('destroy');
    $('#Productos').fileinput('destroy');

    $('#PortadadeProducto').fileinput({
        theme: 'fas',
        language: 'es',
        maxFileCount: 1,
        allowedFileExtensions: ['jpg', 'png']
    });
    $('#Productos').fileinput({
        theme: 'fas',
        language: 'es',
        maxFileCount: 10,
        allowedFileExtensions: ['jpg', 'png'],
    });

    $('#PortadadeProducto').fileinput('reset');
    $('#Productos').fileinput('reset');

    $('#PortadadeProducto').fileinput('enable');
    $('#Productos').fileinput('enable');

    $('#PortadadeProducto').fileinput('refresh');
    $('#Productos').fileinput('refresh');


    $('#PortadadeProducto').fileinput('clear');
    $('#Productos').fileinput('clear');



    $("#txtNombre").val("");
    $("#txtDescripcionCorta").val("");
    $("#txtDescripcionLarga").val("");
    $("#txtPrecio").val("0");
    $("#txtPrecioOferta").val("0");
    $("#txtPrecioOfertafor").hide();
    $("#txtCantidad").val("0");
    $("#txtCantidad").prop('disabled', 'disabled');
    $("#txtTipo").val(1);
    $("#txtTipo").prop('disabled', 'disabled');
    $("#txtCaracteristica").val(0);
    $("#txtEstado").val(0);
    $("#txtEstado").prop('disabled', 'disabled');
    $("#btnEditar").hide();
    $("#ImagenesSubidas").hide();
    $("#btnGuardar").show();
}

function GuardarFotos(id) {

    var IdImagen = id.Data.Data;
    var Archivo = document.getElementById("Productos");
    var Archivo1 = document.getElementById("PortadadeProducto");
    var filesinputval = Archivo.files; 
    var filesinputval1 = Archivo1.files; 


    for (var i = 0; i < filesinputval.length; i += 1) {

        var formData = new FormData();



        var ImagenProductos = {
            IdImagen: 0,
            Nombre: filesinputval[i].name,
            Producto: IdImagen,
            Cantidad: filesinputval[i].size,
            Tipo: 1,
            Estado: 1
        };
        var ImagenProductodto = JSON.stringify(ImagenProductos);

        formData.append("fileUpload", filesinputval[i]);
        formData.append("ID", IdImagen);     
        formData.append("ImagenProducto", ImagenProductodto);   

        var url1 = "/Producto/SubirCatalogo";
        var datos1 = formData;
        $.ajax({

            url: url1,
            data: datos1,
            type: "POST",
            contentType: false,
            processData: false,

        })
            .done(function (data, textStatus, jqXHR) {

               
                var x = data;


            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                debugger
                debugger
                console.log("La solicitud a fallado: " + textStatus);

            });



    }

    for (var i = 0; i < filesinputval1.length; i += 1) {

        var formData = new FormData();



        var ImagenProductos = {
            IdImagen: 0,
            Nombre: filesinputval1[i].name,
            Producto: IdImagen,
            Cantidad: filesinputval1[i].size,
            Tipo: 2,
            Estado: 1
        };
        var ImagenProductodto = JSON.stringify(ImagenProductos);


        formData.append("fileUpload", filesinputval1[i]);
        formData.append("ID", IdImagen);
        formData.append("ImagenProducto", ImagenProductodto);   

        var url1 = "/Producto/SubirPortada";
        var datos1 = formData;
        $.ajax({

            url: url1,
            data: datos1,
            type: "POST",
            contentType: false,
            processData: false,

        })
            .done(function (data, textStatus, jqXHR) {


                var x = data;


            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                debugger
                debugger
                console.log("La solicitud a fallado: " + textStatus);

            });



    }
}

$("#btnGuardar").click(function () {
    
    var Portada = $('#PortadadeProducto').fileinput('getFilesCount');
    var Productos = $('#Productos').fileinput('getFilesCount');

    if ($("#txtNombre").val().trim() == "") {
        toastr.error("Complete el campo Nombre");
    }
    else {
        if ($("#txtDescripcionCorta").val().trim() == "") {
            toastr.error("Complete el campo Descripcion Corta");
        }
        else {
            if ($("#txtDescripcionLarga").val().trim() == "") {
                toastr.error("Complete el campo Descripcion Larga");
            }
            else {
                if ($("#txtPrecio").val() == "") {
                    toastr.error("Complete el campo Precio");
                }
                else {
                    if ($("#txtPrecio").val() <= 0 ) {
                        toastr.error("Colocar un Precio Mayor a '0'");
                    }
                    else {
                        if ($("#txtCaracteristica").val() == 0) {
                            toastr.error("Seleccione una Categoria");
                        }
                        else {
                            if ($("#txtTipo").val()== 0) {
                                toastr.error("Seleccione un Tipo");
                            }
                            else {
                                if (Portada <= 0) {
                                    toastr.error("Porfavor Inserte una imagen para la portada");
                                }
                                else {
                                    if (Productos <= 0) {
                                        toastr.error("Porfavor Inserte una imagen para el catalogo");
                                    }
                                    else {
                                        GuardarProducto();
                                    }
                                }
                            }
                        }
                    }
                }

            }
        }
    } 


 
});

$("#txtCaracteristica").change(function () {
    if ($("#txtCaracteristica").val() != 0) {
        $('#txtTipo').prop('disabled', false);
        $("#txtTipo").empty();
        var Tipo = [];
        $.each(_ContenidosLisDTO, function (index, elementoss) {
            if (elementoss.IdContP == 0) {
                if (elementoss.IdContH == $("#txtCaracteristica").val()) {
                    Tipo.push(elementoss);
                }
               
            }
        });
        var prop1 = { id: "IdCont", value: "Nombre" };
        adicionarOpcionesCombo($("#txtTipo"), Tipo, '', prop1, false);


    } else {
        $('#txtTipo').prop('disabled', 'disabled');    
        $("#txtTipo").empty();
        var Tipo = [];
        $.each(_ContenidosLisDTO, function (index, elementoss) {
            if (elementoss.IdContP == 0) {
                Tipo.push(elementoss);
            }
        });
        var prop1 = { id: "IdCont", value: "Nombre" };
        adicionarOpcionesCombo($("#txtTipo"), Tipo, '', prop1, false);
        $("#txtTipo").val(1);
    }
});

function GuardarExitoso(data) {
    GuardarFotos(data);  
    CargarProductos();   
  

}

function GuardarProducto() {
 
    var txtDescripcionLarga = (document.getElementById("txtDescripcionLarga").value).replace(/\n/gi, "<br/>");
   

    var Producto = {
        IdProducto: 0,
        Nombre: $("#txtNombre").val().trim(),
        DescripcionCorta: $("#txtDescripcionCorta").val().trim(),
        DescripcionLarga: txtDescripcionLarga.trim(),
        Precio: $("#txtPrecio").val(),
        PrecioOferta: $("#txtPrecioOferta").val(),
        DireccionImagen: $("#txtDireccionImagen").val(),
        Cantidad: $("#txtCantidad").val(),
        Carcteristica: $("#txtCaracteristica").val(),
        Tipo: $("#txtTipo").val(),     
        Estado: 1,
        Usuario: 1
    };
 
    var Productodto = JSON.stringify(Producto);
    
    $.ajax({

        url: "/Producto/GuardarProducto",
        data: {Producto: Productodto },
        type: "GET",
        dataType: "json",
    

    })
        .done(function (data, textStatus, jqXHR) {

            toastr.success("Producto Guardado con Exito!");  
            $("#AgregarProducto").modal("hide");
            GuardarExitoso(data);


        })
        .fail(function (jqXHR, textStatus, errorThrown) {

            debugger
         

        });

    

    
}

$("#btnNuevo").click(function () {

    LimpiarModalNuevo();
    $("#AgregarProducto").modal("show");
 

});

function EditarExitoso(data) {
    /*GuardarFotos(data);*/
    CargarProductos();


}

function EditarProductoExi() {
    
    var txtDescripcionLarga = (document.getElementById("txtDescripcionLarga").value).replace(/\n/gi, "<br/>");


    var Producto = { 
        IdProducto: IdProductoEditar,
        Nombre: $("#txtNombre").val().trim(),
        DescripcionCorta: $("#txtDescripcionCorta").val().trim(),
        DescripcionLarga: txtDescripcionLarga.trim(),
        Precio: $("#txtPrecio").val(),
        PrecioOferta: $("#txtPrecioOferta").val(),
        DireccionImagen: $("#txtDireccionImagen").val(),
        Cantidad: $("#txtCantidad").val(),
        Carcteristica: $("#txtCaracteristica").val(),
        Tipo: $("#txtTipo").val(),
        Estado: 1,
        Usuario: 1
    };
  

    var Productodto = JSON.stringify(Producto);





    $.ajax({

        url: "/Producto/GuardarProducto",
        data: { Producto: Productodto },
        type: "POST",
        dataType: "json",


    })
        .done(function (data, textStatus, jqXHR) {
            toastr.success("Producto Editado con Exito!");
            $("#AgregarProducto").modal("hide");
            EditarExitoso(data);


        })
        .fail(function (jqXHR, textStatus, errorThrown) {

            debugger


        });
}

$("#btnEditar").click(function () {

 
    EditarProductoExi();

});

function EditarProducto(IdProductos) {

    IdProductoEditar = IdProductos;

    $.ajax({

        url: "/ImagenProductos/obtenerImagenProductosolo",
        data: { Producto: IdProductos},
        type: "GET",
        dataType: "json",

    })
        .done(function (data, textStatus, jqXHR) {


            var ImagenesProductos = data.Data.Data;


            $("#AgregarProducto").modal("show");
            $.each(_ProductosLisDTO, function (index, elemento) {
                if (elemento.IdProducto == IdProductos) {
                    $("#txtNombre").val(elemento.Nombre);

                    var txtDescripcionLarga = elemento.DescripcionLarga.replace(new RegExp("<br/>", "gi"), "\n");

                    $("#txtDescripcionCorta").val(elemento.DescripcionCorta);
                    $("#txtDescripcionLarga").val(txtDescripcionLarga);
                    $("#txtPrecio").val(elemento.Precio);
                    $("#txtPrecioOferta").val(elemento.PrecioOferta);
                    $("#txtPrecioOfertafor").show();
                    $("#txtCantidad").val(elemento.Cantidad);
                    $("#txtCantidad").prop('disabled', false);
                    $("#txtTipo").val(elemento.Tipo);
                    $("#txtTipo").prop('disabled', false);
                    $("#txtCaracteristica").val(elemento.Carcteristica);
                    $("#txtEstado").val(elemento.Estado);
                    $("#txtEstado").prop('disabled', 'disabled');

                  
             
                    $("#btnEditar").show();
                    $("#ImagenesSubidas").show();
                    $("#btnGuardar").hide();


                    $('#PortadadeProducto').fileinput('clear');
                    $('#Productos').fileinput('clear');

                    $('#PortadadeProducto').fileinput('destroy');
                    $('#Productos').fileinput('destroy');
                    var NombreProductos = [];
                    var TipoProductos = [];
                    var initialPreview = [];
                    var initialPreviewConfig =[];


                 
                    $.each(ImagenesProductos, function (index, elementoss) {
                        if (elementoss.Tipo == 1) {


                       
                            NombreProductos= [
                                "/FotosProyecto/" + IdProductos + "/Catalogo/" + IdProductos + "_" + elementoss.Nombre
                            ]
                            initialPreview.push(NombreProductos);

                            TipoProductos = { type: 'image', size: elementoss.Cantidad , caption: elementoss.Nombre, key: 1 }
                            
                 
                            initialPreviewConfig.push(TipoProductos);
                        }

                    }); 

                    $('#Productos').fileinput({
                        theme: 'fas',
                        language: 'es',
                        maxFileCount: 10,               
                        initialPreview,
                        initialPreviewAsData: true, // defaults markup
                        initialPreviewFileType: 'image',
                        initialPreviewConfig,
                        allowedFileExtensions: ['jpg', 'png'],

                    }); 




                    var NombreProductos = [];
                    var TipoProductos = [];
                    var initialPreview = [];
                    var initialPreviewConfig = [];
                    
                    $.each(ImagenesProductos, function (index, elementoss) {
                        if (elementoss.Tipo == 2) {


                            NombreProductos = [
                                "/FotosProyecto/" + IdProductos + "/Portada/" + IdProductos + "_" + elementoss.Nombre
                            ]
                            initialPreview.push(NombreProductos);

                            TipoProductos = { type: 'image', size: elementoss.Cantidad, caption: elementoss.Nombre, key: 1 }


                            initialPreviewConfig.push(TipoProductos);
                        }

                    }); 


                              


                  
                    $('#PortadadeProducto').fileinput({
                        theme: 'fas',
                        language: 'es',
                        maxFileCount: 1,
                        initialPreview,
                        initialPreviewAsData: true, // defaults markup
                        initialPreviewFileType: 'image',
                        initialPreviewConfig,
                        allowedFileExtensions: ['jpg', 'png'],
                
                    });

               

                    

                    

                 


             

                }
            });
            


        })
        .fail(function (Mensaje, textStatus, errorThrown) {

            console.log("La solicitud a fallado: " + textStatus);

        });





  




    

}

function MostarTablaProductos() {      

    var Producto = []; 
    for (var i = 0; i < _ProductosLisDTO.length; i += 1) {

        var Productolis = _ProductosLisDTO[i];

        var tipo;
        var categoria;
        var estado;
        $.each(_ContenidosLisDTO, function (index, elemento) { 
            if (elemento.IdContP == 0) {
                if (Productolis.Tipo == elemento.IdCont) {
                    tipo = elemento.Nombre;
                } 
            }
             
        }); 

        $.each(_ContenidosLisDTO, function (index, elemento) {
            if (elemento.IdContP == 1) {
                if (Productolis.Carcteristica == elemento.IdContH) {
                    categoria = elemento.Nombre;
                }
            }
         
        }); 

        $.each(_ContenidosLisDTO, function (index, elemento) {
            if (elemento.IdContP == 2) {
                if (Productolis.Estado == elemento.IdContH) {
                    estado = elemento.Nombre;
                }
            }
           
        }); 

        Producto[i] = {
            IdProducto: Productolis.IdProducto,
            Nombre: Productolis.Nombre,
            Cantidad: Productolis.Cantidad,
            Precio: Productolis.Precio,
            PrecioOferta: Productolis.PrecioOferta,
            Categoria: categoria,
            Tipo: tipo,
            Estado: estado,

        }
    

    }

        $('#grid').dxDataGrid({
            dataSource: Producto,
            columns: ["Codigo",'Nombre','Cantidad', 'Precio', 'PrecioOferta', 'Categoria', 'Tipo', 'Estado'],
            headerFilter: {
                visible: true,
                allowSearch: true,
            },
   
            filterRow: {
                visible: true,
                applyFilter: 'auto',
            },
            showBorders: true,

            dataRowTemplate(container, item) {
                const { data } = item;
                const markup = '<tr class=' + 'TablaCompleta' + ' onclick = "EditarProducto(' + data.IdProducto + ')" >'                   
                    + `<td>${data.IdProducto}</td>`
                    + `<td>${data.Nombre}</td>`
                    + `<td class='alinearderecha'>${data.Cantidad}</td>`
                    + `<td class='alinearderecha'>${data.Precio}</td>`
                    + `<td class='alinearderecha'>${data.PrecioOferta}</td>`
                    + `<td>${data.Categoria}</td>`
                    + `<td>${data.Tipo}</td>`
                    + `<td>${data.Estado}</td>`
                    + '</tr>'
                 

                container.append(markup);
            },
        });

}

function CargarDatosDePagina() {

    $("#txtCaracteristica").empty();
    var Caracteristica = [];
    $.each(_ContenidosLisDTO, function (index, elementoss) {
        if (elementoss.IdContP == 1) {
            Caracteristica.push(elementoss);
        }       
    });
    var prop = { id: "IdContH", value: "Nombre" };
    adicionarOpcionesCombo($("#txtCaracteristica"), Caracteristica, '', prop, false);


    $("#txtTipo").empty();
    var Tipo = [];  
    $.each(_ContenidosLisDTO, function (index, elementoss) {
        if (elementoss.IdContP == 0) {
            Tipo.push(elementoss);
        }
    });
    var prop1 = { id: "IdCont", value: "Nombre" };
    adicionarOpcionesCombo($("#txtTipo"), Tipo, '', prop1, false);

    $("#txtEstado").empty();
    var Estado = [];
    $.each(_ContenidosLisDTO, function (index, elementoss) {
        if (elementoss.IdContP == 2) {
            Estado.push(elementoss);
        }
    });
    var prop1 = { id: "IdContH", value: "Nombre" };
    adicionarOpcionesCombo($("#txtEstado"), Estado, '', prop1, false);
   
}

function CargarContenidos() {

    $.ajax({

        url: "/Contenidos/obtenerContenidos",
        data: {},
        type: "GET",
        dataType: "json",

    })
        .done(function (data, textStatus, jqXHR) {


            _ContenidosLisDTO = data.Data.Data;
            MostarTablaProductos();
            CargarDatosDePagina();


        })
        .fail(function (Mensaje, textStatus, errorThrown) {

            console.log("La solicitud a fallado: " + textStatus);

        });
}

function CargarProductos() {

    $.ajax({

        url: "/Producto/obtenerProductos",
        data: {},
        type: "GET",
        dataType: "json",

    })
        .done(function (data, textStatus, jqXHR) {
        
            _ProductosLisDTO = data.Data.Data;
            CargarContenidos();


        })
        .fail(function (jqXHR, textStatus, errorThrown) {

            console.log("La solicitud a fallado: " + textStatus);

        });
}



$(document).ready(function () {  

    CargarProductos();
  

});

