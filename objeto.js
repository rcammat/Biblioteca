"use strict";
//Clase Biblioteca
function Biblioteca (){
    this.usuarios=[];
    this.catalogo=[];
    this.prestamos=[];
}
Biblioteca.prototype.altaUsuario = function(idUsu,nombre,apellidos,telefono) 
{
    let nuevoUs = new Usuario(idUsu,nombre,apellidos,telefono);
    let alerta;
    let bExiste=false;
    for(let i=0;i<this.usuarios.length;i++)
    {
        if(this.usuarios[i].idUsuario == nuevoUs.idUsuario)
        {
            alerta = "Ya existe ese usuario";
            bExiste = true;
        }
    }
    if(!bExiste)
    {
        this.usuarios.push(nuevoUs);
        alerta = "Usuario añadido."
    }

    return alerta;

}
Biblioteca.prototype.altaArticulo = function(oArticulo){
    let bArticuloCreado=(this.catalogo.filter(arti => arti.iIdArticulo == oArticulo.iIdArticulo).length == 1);
    if(bArticuloCreado==false){
        this.catalogo.push(oArticulo);
        let alerta = "Articulo Añadido";
    }else {
        let alerta = "Articulo con un ID igual";
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

    constructor(fechaEstreno,subtitulada){
        this.fechaEstreno=fechaEstreno;
        this.subtitulada=subtitulada;
    }

    toHTMLRow() {
        let sFila = "<tr>";
        sFila += "<td>" + this.fechaEstreno + "</td>";
        sFila += "<td>" + this.subtitulada + "</td>";
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