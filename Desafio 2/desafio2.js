const fs = require('fs');

class Contenedor{
    constructor(file){
        this.file = file;
    }
    writeFile= async data=>{
        try{
            await fs.promises.writeFile(
                this.file, JSON.stringify(data, null, 2)
            )

        }catch(err){
            console.log(`error:${err}`);
        }
    }

    getAll = async() =>{
        try{
            const productos = await fs.promises.readFile(this.file, 'utf-8')
            return JSON.parse(productos);
        }catch(err){
            if(err.message.includes('no such file or directory')) return [];
            console.log(`error:${err}`);
        }
    }
    save = async obj => {
        let productos = this.getAll();
        try{
            let newId;
            productos.length === 0 ? newId = 1 : newId = productos[productos.length-1].id + 1;
            let newObj = {...obj, id: newId};
            productos.push(newObj)
            return newObj.id;
        }catch(err){
            console.log(`error:${err}`);
        }
    }
    
    getById= async id =>{
        let productos = await this.getAll();
        try{
            const obj = productos.find(id => productos.id === id);
            return obj ? obj : null;
        }catch(err){
            console.log(`error:${err}`);
        }
    }

    
	deleteById = async id => {
		let objs = await this.getAll();
		try {
			objs = objs.filter(obj => obj.id != id);
			await this.writeFile(objs);
		} catch (error) {
			console.log(error.message);
		}
	};


    deleteAll = async() =>{
        this.writeFile([]);
    }

}

module.exports = Contenedor;