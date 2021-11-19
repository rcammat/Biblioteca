"use strict";
let oBiblioteca =  new Biblioteca();
añadeDatos();
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
    document.getElementById(sNombreFormulario).reset();
    document.getElementById(sNombreFormulario).style.display = "Block";
    fechaHoy();
}

function añadeUsuario(){
    let iIdUsuario=formularioAltaUsuario.idUsuario.value;
    let sNombre=formularioAltaUsuario.nombreUsuario.value;
    let sApellidos=formularioAltaUsuario.apellidosUsuario.value;
    let iTelefono=formularioAltaUsuario.telefonoUsuario.value;
    if(iIdUsuario =="" || sNombre == "" || sApellidos == "" || iTelefono == ""){
        mostrarMensaje("Debe rellenar todos los campos");
    }else{
        mostrarMensaje(oBiblioteca.altaUsuario(iIdUsuario,sNombre,sApellidos,iTelefono));
        ocultarTodosLosFormularios();
    }
 
}
function añadeArticulo(){
    let iIdArticulo = formularioAltaArticulo.idArticulo.value;
    let sTitulo = formularioAltaArticulo.sTitulo.value;
    let bSubtitulada;
    if(iIdArticulo == "" || sTitulo == "" ){
        mostrarMensaje("Debes rellenar todos los campos");
    }else {
        if(formularioAltaArticulo.radiobtnTipoArticuloDVD.checked){
            let dFechaEstreno=formularioAltaArticulo.dFechaEstreno.value;
            if(formularioAltaArticulo.Subtitulada.checked){
                bSubtitulada=true;
            }else {
                bSubtitulada=false;
            }
            if(dFechaEstreno == ""){
                mostrarMensaje("Indique la fecha de estreno");
            }else {
            let oArticulo= new DVD(iIdArticulo,sTitulo,dFechaEstreno,bSubtitulada);
            mostrarMensaje(oBiblioteca.altaArticulo(oArticulo));
            document.getElementById("comboArti").innerHTML=crearComboArticulos();
            ocultarTodosLosFormularios();
            }
        }else {
            let sAutor =formularioAltaArticulo.sAutor.value;
            let iNumPaginas = formularioAltaArticulo.iNumPaginas.value;
            if(sAutor == "" || iNumPaginas == ""){
                mostrarMensaje("Debe rellenar todos los campos");
            }else {
            let oArticulo= new Libro(iIdArticulo,sTitulo,sAutor,iNumPaginas);
            mostrarMensaje(oBiblioteca.altaArticulo(oArticulo));
            document.getElementById("comboArti").innerHTML=crearComboArticulos();
            ocultarTodosLosFormularios();
            }
        }
    }
    
}
function listadoUsuarios(){
    var oVentanaUsuarios = window.open("ListadoDeUsuarios.html","nuevaVentana1"); 
    ocultarTodosLosFormularios();
}
function listadoArticulos(){
    var oVentanaArticulos = window.open("ListadoDeArticulos.html","nuevaVentana2");
    ocultarTodosLosFormularios();
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
    document.getElementById("tablaPrestamos").innerHTML="";
    document.getElementById("tablaPrestamosUsuarios").innerHTML="";
    document.getElementById("tablaTipoArticulos").innerHTML="";

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
    let arrayTituloArticulos = formularioAltaPrestamo.textAreaArticulos.value.split("\n");
    let arrayArticulos=new Array();
    let iIdUsuario = formularioAltaPrestamo.idUsuario.value;
    let dFechaInicio = new Date().toISOString().slice(0, 10);
    let dFechaFin = formularioAltaPrestamo.fechaFin.value;

    if(iIdPrestamo =="" || formularioAltaPrestamo.textAreaArticulos.value == "" || iIdUsuario == "" || dFechaFin == ""){
        mostrarMensaje("Debe rellenar todos los campos");
    }
    else if(dFechaFin < dFechaInicio)
    {
        mostrarMensaje("La fecha final no puede ser menor que la inicial");
    }
    else{
        for( let sTitulo of arrayTituloArticulos){
            if(sTitulo!="")
            arrayArticulos.push((buscarArticuloPorTitulo(sTitulo)));
        }
        if (buscaUsuario(iIdUsuario,oBiblioteca.usuarios)) {
            let usuarioSinPrestamos = obtenerUsuario(iIdUsuario);
            let oPrestamo = new Prestamo(iIdPrestamo,arrayArticulos,usuarioSinPrestamos,dFechaInicio,dFechaFin);
            mostrarMensaje(oBiblioteca.añadePrestamo(oPrestamo));
            ocultarTodosLosFormularios();
            document.getElementById("textAreaArticulos").textContent="";
        }
        else{
            mostrarMensaje("No existe ese usuario.");
        }
    }
}

function listarPrestamosUsuarios(){
    let usuarioId = formularioListadoPrestamosUsuarios.idUsuario.value;
    buscarUsuarioEnPrestamo(usuarioId,oBiblioteca.prestamos);
    document.getElementById("tablaPrestamosUsuarios").innerHTML=oBiblioteca.listarPrestamosUsuarios(usuarioId);
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
            mostrarMensaje("No se puede añadir mas DVDs");
        } 
        if (arrayLibros.length<2 && buscarArticuloPorTitulo(sArticulo) instanceof Libro) {
                document.getElementById('textAreaArticulos').innerHTML+=sArticulo+"\n";
        }else if ( arrayLibros.length==2 && buscarArticuloPorTitulo(sArticulo) instanceof Libro)  {
            mostrarMensaje("No se puede añadir mas Libros");
        }
        }else{
            mostrarMensaje("Ya esta añadido ese articulo");
    }

    
}
function fechaHoy() {
    document.getElementById('fechaInicio').value = new Date().toISOString().slice(0, 10);
}

function devuelvePrestamo(){
    let idPrestamo = formularioDevolverPrestamo.idPrestamo.value;

    mostrarMensaje(finalizarPrestamo(idPrestamo));
} 


function listarTiposArticulos(){
    let seleccion = formularioListadoTipoArticulos.articulo.value;
    let cadena ="";
    if(seleccion == "libro")
    {
      let arrayLibros = arrayLibro(oBiblioteca.catalogo);
        cadena += "<th>Id Articulo</th><th>Titulo</th><th>Autor</th><th>Num Paginas</th><tr>";
      for(let libro of arrayLibros)
      {
        cadena += libro.toHTMLRow();
      }

    }
    else{
        let Dvds = arrayDVD(oBiblioteca.catalogo);
        cadena += "<th>Id Articulo</th><th>Titulo</th><th>Fecha estreno</th><th>Subtitulada</th><tr>";
        for(let dvd of Dvds)
        {
          cadena += dvd.toHTMLRow();
        }
    }

    document.getElementById("tablaTipoArticulos").innerHTML=cadena;
}
function listarPrestamosUsuarios(){
    let idUsuario=formularioListadoPrestamosUsuarios.idUsuario.value;
    document.getElementById("tablaPrestamosUsuarios").innerHTML=oBiblioteca.listadoPrestamosUsuarios(idUsuario);
}

function listarPrestamosFecha(){
    let fechaInicio = formularioListadoPrestamos.fechaInicio.value;
    let fechaFin = formularioListadoPrestamos.fechaFin.value;
    if(fechaFin < fechaInicio)
    {
        mostrarMensaje("La fecha final no puede ser menor que la inicial.");
    }
    else{
    let cadena = "<tr><th>ID</th><th>Artículos</th><th>Usuario</th><th>Fecha de Inicio</th><th>Fecha de Fin</th></tr>";
    cadena += oBiblioteca.listadoPrestamosPorFecha(fechaInicio,fechaFin);

    document.getElementById("tablaPrestamos").innerHTML=cadena;
    }
}

function mostrarMensaje(mensaje){
    document.getElementById("capaMensajes").innerHTML="<p>"+mensaje+"</p>"+'<button onclick="cierraMensaje()">Cerrar</button>';
    document.getElementById("capaMensajes").style.display="block";
    document.getElementById("capaMensajes").style.zIndex="2";
}
function cierraMensaje(){
    document.getElementById("capaMensajes").style.display="none";
}
