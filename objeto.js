"use strict";
//Clase Biblioteca
function Biblioteca (){
    this.usuarios=[];
    this.catalogo=[];
    this.prestamos=[];
}
Biblioteca.prototype.altaUsuario = function(idUsu,nombre,apellidos,telefono) 
{
    let alerta;

    if(buscaUsuario(idUsu,this.usuarios))
    {
        alerta = "Ya existia ese usuario.";
    }
    else
    {
        let nuevoUs = new Usuario(idUsu,nombre,apellidos,telefono);
        this.usuarios.push(nuevoUs);
        alerta = "Usuario añadido.";
    }

    return alerta;

}
Biblioteca.prototype.listadoUsuarios = function(){

    let sTabla = '<table class="table table-striped table-hover">';
    sTabla += "<thead><tr><th>Id</th><th>Nombre</th><th>Apellido</th><th>Tlfn</th></thead>";
    sTabla += "<tbody>";
    for(let oUsu of this.usuarios){
        sTabla += oUsu.toHTMLRow();
    }
    sTabla += "</tbody></table>";
  
    return sTabla;
  }
Biblioteca.prototype.altaArticulo = function(oArticulo){
    let alerta;
    if(this.catalogo.filter(arti => arti.iIdArticulo == oArticulo.iIdArticulo).length == 1){
         alerta = "Articulo con un ID igual";
    }else {
         this.catalogo.push(oArticulo);
         alerta = "Articulo Añadido";

    }
    return alerta;
}
Biblioteca.prototype.listadoArticulos= function(){

    let sTabla = '<table class="table table-striped table-hover">';
    sTabla += "<thead><tr><th>ID</th><th>Título</th></tr></thead>";
    sTabla += "<tbody>";
    for(let articulos of this.catalogo){
        sTabla += "<tr><td>"+articulos.iIdArticulo+"</td>";
        sTabla += "<td>"+articulos.sTitulo+"</td></tr>";
    }
    sTabla += "</tbody></table>";

    return sTabla;
}
Biblioteca.prototype.añadePrestamo = function(oPrestamo) {
    let alerta;
    let bExistePrestamo=false;
    for(let i=0;i<this.prestamos.length;i++)
    {
        if(this.prestamos[i].idPrestamo == oPrestamo.idPrestamo)
        {
          bExistePrestamo=true;
          alerta="Ya existe es prestamo.";
        }
    }

    if(buscarUsuarioEnPrestamo(oPrestamo.usuario.idUsuario ,this.prestamos))
    {
        alerta="Este usuario ya tiene un prestamo.";
        bExistePrestamo=true;
    }


    if(!bExistePrestamo){
    this.prestamos.push(oPrestamo);
    alerta="Prestamo añadido.";
    }


    return alerta;


}

//Clase Prestamo
class Prestamo {


    constructor(idPrestamo,articulos,usuario,fechainicio,fechaFin){
        this.idPrestamo=idPrestamo;
        this.articulos=articulos;
        this.usuario=usuario;
        this.fechainicio=fechainicio;
        this.fechaFin=fechaFin;
    }

    toHTMLRow() {
        let sTabla = "<table border='1'>";
        sTabla += "<td>" + this.idPrestamo + "</td>";
        for(let articulos of Articulo){
            sTabla += "<tr><td>" + articulos.idArticulo + "</td>";
            sTabla += "<td>" + articulos.titulo + "</td></tr>";
        }
        sTabla += "<td>" + this.usuario + "</td>";
        sTabla += "<td>" + this.fechainicio+ "</td>";
        sTabla += "<td>" + this.fechaFin + "</td>";

        sTabla += "</table>";

        return sTabla;
    }

}

//Clase Articulo
class Articulo {
    constructor(iIdArticulo,sTitulo){
        this.iIdArticulo=iIdArticulo;
        this.sTitulo=sTitulo;
    }
    toHTMLRow() {
        let sFila = "<tr>";
        sFila += "<td>" + this.iIdArticulo + "</td>";
        sFila += "<td>" + this.sTitulo + "</td>";
        sFila+= "</tr>";
        return sFila;
    }
}

//Clase DVD
class DVD extends Articulo {

    constructor(idArticulo,titulo,fechaEstreno,subtitulada){
        super(idArticulo,titulo);
        this.fechaEstreno=fechaEstreno;
        this.subtitulada=subtitulada;
    }

    toHTMLRow() {
        let sFila = "<tr>";
        sFila += "<td>" + this.iIdArticulo + "</td>";
        sFila += "<td>" + this.sTitulo + "</td>";
        sFila += "<td>" + this.fechaEstreno + "</td>";
        sFila += "<td>" + (this.subtitulada?"Si":"No") + "</td>";
        sFila += "</tr>";
        return sFila;
    }


}
//Clase Libro
class Libro extends Articulo{
    constructor (idArticulo, titulo, autor, paginas) {
        super(idArticulo, titulo);
        this.autor=autor;
        this.paginas=paginas;
    }

    toHTMLRow() {
        let fila="<tr>";
        fila += "<td>" + this.iIdArticulo + "</td>";
        fila += "<td>" + this.sTitulo + "</td>";
        fila+="<td>"+this.autor+"</td>";
        fila+="<td>"+this.paginas+"</td>";
        fila+="</tr>";
        return fila;
    }
}
//Clase Usuario
class Usuario
{
    constructor(idUsu,vNombre,vApellidos,vTelefono){
        this.idUsuario = idUsu;
        this.nombre = vNombre;
        this.apellidos = vApellidos;
        this.telefono = vTelefono;
    }
    toHTMLRow(){
        let sFila = "<tr>";
    sFila += "<td>" + this.idUsuario + "</td>";
    sFila += "<td>" + this.nombre + "</td>";
    sFila += "<td>" + this.apellidos + "</td>";
    sFila += "<td>" + this.telefono + "</td></tr>";

    return sFila;
    }

}
function buscaUsuario(idUsu,tablaUsuarios) //Devuelve true  si ya existe un  usuario.
{
    for(let i=0;i<tablaUsuarios.length;i++)
    {
        if(tablaUsuarios[i].idUsuario == idUsu)
        {
           return true;
        }
    }
    return false;
}


function obtenerUsuario(idUsuario) { //Devuelve true si el usuario no tiene ningun prestamo.
    for(let i=0;i<oBiblioteca.usuarios.length;i++)
    {
        if(oBiblioteca.usuarios[i].idUsuario == idUsuario)
        {
           return oBiblioteca.usuarios[i];
        }
    }
}

function buscarUsuarioEnPrestamo(idUsu,tablaPrestamos)
{
    for(let i=0;i<tablaPrestamos.length;i++)
    {
        if(tablaPrestamos[i].usuario.idUsuario == idUsu)
        {
           return true;
        }
    }
    return false;
}

function obtenerUsuarioEnPrestamo(idUsu,tablaPrestamos)
{
    for(let i=0;i<tablaPrestamos.length;i++)
    {
        if(tablaPrestamos[i].usuario.idUsuario == idUsu)
        {
           return tablaPrestamos[i];
        }
    }
}


function crearComboArticulos()
{
    let cadena = "<option>Seleccione un articulo...</option>";
    for(let i=0;i<oBiblioteca.catalogo.length;i++)
    {
       cadena +=  "<option>"+oBiblioteca.catalogo[i].sTitulo+"</option>";
    }
    return cadena;
}