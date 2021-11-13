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
    let bSubtitulada;
    if(formularioAltaArticulo.radiobtnTipoArticuloDVD.checked){
        let dFechaEstreno=formularioAltaArticulo.dFechaEstreno.value;
        if(formularioAltaArticulo.Subtitulada.checked){
            bSubtitulada=true;
        }else {
            bSubtitulada=false;
        }
        let oArticulo= new DVD(iIdArticulo,sTitulo,dFechaEstreno,bSubtitulada);
        alert(oBliblioteca.altaArticulo(oArticulo));
    }else {
        let sAutor =formularioAltaArticulo.sAutor.value;
        let iNumPaginas = formularioAltaArticulo.iNumPaginas.value;
        let oArticulo= new Libro(iIdArticulo,sTitulo,sAutor,iNumPaginas);
        alert(oBliblioteca.altaArticulo(oArticulo));
    }
}
function listadoUsuarios(){
    ocultarTodosLosFormularios();
    document.getElementById("formularioListadoUsuarios").style.display = "Block";

    let tabla=oBliblioteca.listadoUsuarios();


    document.getElementById("tablaUsuarios").innerHTML=tabla;
}
function listadoArticulos(){
    ocultarTodosLosFormularios();
    document.getElementById("formularioListadoArticulos").style.display = "Block";
    let sTabla = oBliblioteca.listadoArticulos();
    document.getElementById('tablaArticulos').innerHTML=sTabla;
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
function mostrarContenido(){
    if(formularioAltaArticulo.radiobtnTipoArticuloDVD.checked){
        document.getElementById('libroElegido').style.display='none';
        document.getElementById('dvdElegido').style.display='Block';
    }else {
        document.getElementById('dvdElegido').style.display='none';
        document.getElementById('libroElegido').style.display='Block';
    }
}

