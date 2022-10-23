// // let number = 1

// // //Objetos 
// // let persona = { name: 'John' }

// // let persona2 = persona

// // persona2.name = 'Juan'

// // console.log(persona)

// // //Arrays



// // // let array2 = array

// // // array2.push(8)

// // //JSON PARSE
// // //OBJECT.assign

// // let array = [2]

// // let array3 = [ 4 ]

// // array3 = [...array]

// // // Object.assign(array3, array)

// // array3.push(8)

// // console.log(array)
// // console.log(array3)


// const persona = { name: 'John' }

// persona.name = 'juan'

// persona = 2

// console.log(persona)

//Declaracion de funcion
// function nombre(param) {
//     console.log(2)
// }
// //llamada a funcion
// nombre(1)

//IIFE
// (function(){
//     let a = 3
//     console.log(3)
// })()

//IIFE con parametros
// (function(uno, dos, tres) {
//     console.log(uno)
//     console.log(dos)
//     console.log(tres)
// })(1,2,3)

// let i = 0
// let b = 2

// function a() {
//  function c(){
//     let c = 8
//     console.log(b)
//     console.log(c)
//  }
 
// }

// console.log(a().b)


//Closures

// function iniciar(){
//     let nombre = 'John'
//     function mostrarNombre()
//     {
//         console.log(nombre)
//     }
//     mostrarNombre()
// }

// iniciar()

// function iniciar(){
//     let nombre = 'John'

//     function mostrarNombre()
//     {
//         console.log(nombre)
//     }

//     return mostrarNombre
// }

// iniciar()()
// let otrafuncion = iniciar()

// otrafuncion()

//Closure

// function crearSumador(x) {
//     return function(y) {
//         return x + y
//     }
// }

// let suma5 = crearSumador(5)

// console.log(crearSumador(1)(2))

// console.log(suma5(2))


//CLOSURE PRACTICO
// var Counter = (function() {

//     var privateCounter = 0;

//     function changeBy(val) {
//       privateCounter += val;
//     }

//     return {
//       increment: function() {
//         changeBy(1);
//       },
//       decrement: function() {
//         changeBy(-1);
//       },
//       value: function() {
//         return privateCounter;
//       }
//     }
//   })();

//   Counter.increment()


//TEMPLATE string
// let o = 1
// let  vara = `SELECT *
// FROM 
// DATA
// WHEW
// ${o}
//  aaa`


// function mostrarLista (datos = []) {
//     if(datos.length < 1) {
//         console.log('lista vacia')
//     }
// }

// mostrarLista([])

// (function (datos = []) {

//     if(datos.length < 1) {
//         console.log('lista vacia')
//         return 
//     }

//     console.table(datos)

// })([1])


// const crearMultiplicador = (n) => {
//     //console.log(n)
//     return function(m) {
        
//         //console.log(m*n)
//     }
// }


// //crearMultiplicador(3)(9)

// const triplicar = crearMultiplicador(3)
// // const duplicar = crearMultiplicador(2)


//  triplicar(9)
// // duplicar(100)


// class Persona {
//     constructor(nombre, apellido){
//         this.nombre = nombre
//         this.apellido = apellido
//     }

//     static saludoCorto = 'Hola'

//     saludoCompleto()
//     {
//         console.log(`buenas soy ${this.nombre}`)
//     }

//     decirNombre(){
//         let self = this 
//         setTimeout(function() {
//             console.log(self.nombre) // <<<<<=============
//         },3000)
//     }

//     decirNombreConArrows(){
//         setTimeout(() => {
//             console.log(this.nombre) // <<<<<=============
//         },3000)
//     }
// }

// let persona = new Persona('Juan', 'Diaz')

// persona.decirNombreConArrows()


//c i / c g

class Usuario {
    static contadorGlobal = 0 

    constructor(nombre, apellido, libros, mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = [libros];
        this.mascotas = [mascotas];
    }



    getFullname(){
        console.log(`El nombre del Responsable es ${this.nombre} ${this.apellido}`)
    }


    agregarLibro(nombreLibro){
        this.libros.push(nombreLibro)
    }

    listarLibros() {
        return this.libros
    }

    obtenerResponsable() {
        console.log(`El nombre del Responsable es ${this.nombre}`)
    }

    obtenerCuentaIndividual(){
        console.log(`Cuenta individual de  ${this.nombre} :  ${this.contadorIndividual}`)
    }

    obtenerCuentaGlobal(){
        console.log(`Cuenta global: ${this.constructor.contadorGlobal}`)
    }

    contar() {
        this.contadorIndividual = this.contadorIndividual + 1
        this.constructor.contadorGlobal = this.constructor.contadorGlobal + 1
    }
}

const franco = new Contador('Franco')
const agustin = new Contador('Agustin')

franco.contar() // G 1 / F 1

agustin.contar() // G 2 / A 1
agustin.contar() // G 3 / A 2
agustin.contar() // G 4 / A 3

franco.contar() // G 5 / F 2

console.log(`${franco.nombre} : ${franco.contadorIndividual}`)
console.log(`${agustin.nombre} : ${agustin.contadorIndividual}`)

console.log(Contador.contadorGlobal)

// let contador1 = new Contador("franco", 0);

// contador1.obtenerResponsable()
