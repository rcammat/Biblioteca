"use strict";
let oBiblioteca =  new Biblioteca();
añadeDatos();
fechaHoy();
function añadeDatos(){
    oBiblioteca.altaUsuario(1,"Juan","Perez","112");
    oBiblioteca.altaUsuario(2,"Pepe","Montoya","016");
    oBiblioteca.altaUsuario(3,"Messi","Chuiquito","069");
    oBiblioteca.altaArticulo(new Libro("1","El quijote","Juan",450));
    oBiblioteca.altaArticulo(new Libro("2","Blancanieve","Pepe",177));
    oBiblioteca.altaArticulo(new Libro("3","Pinocho","Ibai",217));
    oBiblioteca.altaArticulo(new DVD("4","AnuelPrr",new Date(2020/10/18),true));
    oBiblioteca.altaArticulo(new DVD("5","Bandolera",new Date(1970/8/1),false));
    oBiblioteca.altaArticulo(new DVD("6","BadBunny",new Date(1970/8/1),false));
    document.getElementById("comboArti").innerHTML=crearComboArticulos();
}
function gestionFormularios(sNombreFormulario){
    ocultarTodosLosFormularios();
    document.getElementById(sNombreFormulario).style.display = "Block";
}

function añadeUsuario(){
    let iIdUsuario=formularioAltaUsuario.idUsuario.value;
    let sNombre=formularioAltaUsuario.nombreUsuario.value;
    let sApellidos=formularioAltaUsuario.apellidosUsuario.value;
    let iTelefono=formularioAltaUsuario.telefonoUsuario.value;
    alert(oBiblioteca.altaUsuario(iIdUsuario,sNombre,sApellidos,iTelefono));
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
        alert(oBiblioteca.altaArticulo(oArticulo));
        document.getElementById("comboArti").innerHTML=crearComboArticulos();
    }else {
        let sAutor =formularioAltaArticulo.sAutor.value;
        let iNumPaginas = formularioAltaArticulo.iNumPaginas.value;
        let oArticulo= new Libro(iIdArticulo,sTitulo,sAutor,iNumPaginas);
        alert(oBiblioteca.altaArticulo(oArticulo));
        document.getElementById("comboArti").innerHTML=crearComboArticulos();
    }
}
function listadoUsuarios(){
    ocultarTodosLosFormularios();
    document.getElementById("formularioListadoUsuarios").style.display = "Block";

    let tabla=oBiblioteca.listadoUsuarios();


    document.getElementById("tablaUsuarios").innerHTML=tabla;
}
function listadoArticulos(){
    ocultarTodosLosFormularios();
    document.getElementById("formularioListadoArticulos").style.display = "Block";
    let sTabla = oBiblioteca.listadoArticulos();
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
    document.getElementById('formularioListadoTipoArticulos').style.display='none';
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

function creaPrestamo() {
    
    let iIdPrestamo = formularioAltaPrestamo.idPrestamo.value;
    let arrayArticulos = formularioAltaPrestamo.textAreaArticulos.value.split("\n");
    let iIdUsuario = formularioAltaPrestamo.idUsuario.value;
    let dFechaInicio = formularioAltaPrestamo.fechaInicio.value;
    let dFechaFin = formularioAltaPrestamo.fechaFin.value;
    if (buscaUsuario(iIdUsuario,oBiblioteca.usuarios)) {
        let usuarioSinPrestamos = obtenerUsuario(iIdUsuario);
        let oPrestamo = new Prestamo(iIdPrestamo,arrayArticulos,usuarioSinPrestamos,dFechaInicio,dFechaFin);
        alert(oBiblioteca.añadePrestamo(oPrestamo));
    }
    else{
        alert("No existe ese usuario.");
    }

}

function listarPrestamosUsuarios(){
    let usuarioId = formularioListadoPrestamosUsuarios.idUsuario.value;
    buscarUsuarioEnPrestamo(usuarioId,oBiblioteca.prestamos);
}


function añadirArticulo(){
    let sArticulo =document.getElementById('comboArti').value;
    let arrayTituloArticulos =formularioAltaPrestamo.textAreaArticulos.value.split("\n");
    let arrayArticulos=new Array();
    let bEstaAñadido=false;

    for(let i in arrayTituloArticulos){
        if(arrayTituloArticulos[i]==sArticulo){
            bEstaAñadido=true;
        }
        arrayArticulos.push(buscarArticuloPorTitulo(arrayTituloArticulos[i]));
    }
    
    let arrayDVDs=arrayDVD(arrayArticulos);
    let arrayLibros=arrayLibro(arrayArticulos);

    if ( bEstaAñadido==false ){
        if(arrayDVDs.length <2 && buscarArticuloPorTitulo(sArticulo) instanceof DVD  ){
            document.getElementById('textAreaArticulos').innerHTML+=sArticulo+"\n";
            
        }else if (arrayDVDs.length ==2 && buscarArticuloPorTitulo(sArticulo) instanceof DVD){
            alert("No se puede añadir mas DVDs");
        } 
        if (arrayLibros.length<2 && buscarArticuloPorTitulo(sArticulo) instanceof Libro) {
                document.getElementById('textAreaArticulos').innerHTML+=sArticulo+"\n";
        }else if ( arrayLibros.length==2 && buscarArticuloPorTitulo(sArticulo) instanceof Libro)  {
            alert("No se puede añadir mas Libros");
        }
        }else{
            alert("Ya esta añadido ese articulo");
    }
}
function fechaHoy() {
    document.getElementById('fechaInicio').value = new Date().toISOString().slice(0, 10)
}