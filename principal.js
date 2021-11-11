"use strict";
let oBliblioteca =  new Biblioteca();

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

    if(formularioAltaArticulo.radiobtnTipoArticulo.value == "DVD"){
        let oArticulo= new DVD(idArticulo,sTitulo,dFechaEstreno,bSubtitulada);
        oBliblioteca.añadeArticulo(oArticulo);
    }else {
        let oArticulo= new DVD(idArticulo,sTitulo,sAutor,iNumPaginas);
        oBliblioteca.añadeArticulo(oArticulo);
    }
}
