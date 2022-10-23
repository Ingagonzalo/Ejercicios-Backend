class Usuario {
  

    constructor(nombre, apellido, libros, mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }


    
    getFullName() {
        return `El nombre del usuario es ${this.nombre} ${this.apellido}`;
    }
    
    addMascota(mascota){ // Recibe un nombre de mascota y lo agrega al array de mascotas.
        this.mascotas.push(mascota);
    }
    
    countMascotas(){ //Retorna la cantidad de mascotas que tiene el usuario.
        
        return this.mascotas.length;
    }

    addBook(nombre, autor){ //. Recibe un string 'nombre' y un string 'autor' y debe agregar un objeto: { nombre: String, autor: String } al array de libros.
        this.libros.push({nombre, autor});

    }

    getBookNames(){ //Retorna un array con sólo los nombres del array de libros del usuario.
        return this.libros.map(libro => libro.nombre);

    }

 
}

const usuario01 = new Usuario("Gonzalo", "Inga", [], []);

console.log(usuario01.getFullName());

usuario01.addMascota("Perro");
usuario01.addMascota("Gato");
usuario01.addMascota("Loro");


console.log(usuario01.countMascotas());

usuario01.addBook("Harry Potter", "JK Rowling");
usuario01.addBook("Historias de Horror", "H.P Lovecraft");

console.log(usuario01.getBookNames());