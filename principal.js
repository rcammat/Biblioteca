"use strict";
let oBliblioteca =  new Biblioteca();

function gestionFormularios(sNombreFormulario){
    ocultarTodosLosFormularios();
    document.getElementById(sNombreFormulario).style.display = "Block";
}

function añadeUsuario(){
    let iIdUsuario=formularioAltaUsuario.idUsuario.value;
    let sNombre=formularioAltaUsuario.nombreUsuario.value;
    let sApellidos=formularioAltaUsuario.apellidosUsuario.value;
    let iTelefono=formularioAltaUsuario.telefonoUsuario.value;
    alert(oBliblioteca.altaUsuario(iIdUsuario,sNombre,sApellidos,iTelefono));
}
function añadeArticulo(){
    let iIdArticulo = formularioAltaArticulo.idArticulo.value;
    let sTitulo = formularioAltaArticulo.sTitulo.value;

    if(formularioAltaArticulo.radiobtnTipoArticuloDVD.checked){
        let oArticulo= new DVD(iIdArticulo,sTitulo,dFechaEstreno,bSubtitulada);
        oBliblioteca.añadeArticulo(oArticulo);
    }else {
        let oArticulo= new Libro(iIdArticulo,sTitulo,sAutor,iNumPaginas);
        oBliblioteca.añadeArticulo(oArticulo);
    }
}

function ocultarTodosLosFormularios(){
    document.getElementById('formularioAltaUsuario').style.display='none';
    document.getElementById('formularioAltaArticulo').style.display='none';
    document.getElementById('formularioAltaPrestamo').style.display='none';
    document.getElementById('formularioDevolverPrestamo').style.display='none';
    document.getElementById('formularioListadoUsuarios').style.display='none';
    document.getElementById('formularioListadoArticulos').style.display='none';
    document.getElementById('formularioListadoPrestamos').style.display='none';
    document.getElementById('formularioListadoPrestamosUsuarios').style.display='none';
    document.getElementById('formularioListadoTiposArticulos').style.display='none';
}
