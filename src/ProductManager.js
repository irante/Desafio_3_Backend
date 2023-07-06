const fs = require ('fs/promises')
const path = require ('path')

class ProductManager {
    constructor(filename) {
      
      this.filename = filename
      this.filepath = path.join(__dirname, this.filename)
      
    }

    async getProducts(){
            const data = await fs.readFile(this.filepath, 'utf-8')
            const productos = JSON.parse(data)
            return productos
        }




  
    async addProduct(producto) {
        const data = await fs.readFile(this.filepath, 'utf-8')
        const productos = JSON.parse(data)
      
        const newId = productos[productos.length - 1]?.id || 0
      
        productos.push({
            ...producto,            //usamos spread para poder agregar una nueva propiedad "id" al objeto recibido por parametro
            id:newId + 1
        })
        await fs.writeFile(this.filepath, JSON.stringify(productos,null,2))
    }


   

    async getProductById(id){
        const data = await fs.readFile(this.filepath, 'utf-8')
        const productos = JSON.parse(data)
        
        const RtadoBusqueda = productos.find((el) => el.id.toString() === id);      // tostring convierte el valor numerico recibido a un string para hacer la comparacion
    
        let respuesta = RtadoBusqueda ??"NOT FOUND"
   
        return respuesta;
        
    }
    async deleteProduct(id){
        const data = await fs.readFile(this.filepath, 'utf-8')          ////
        const productos = JSON.parse(data)
        const indiceObjeto = productos.findIndex(objeto => objeto.id === id);
        productos.splice(indiceObjeto, 1);
        await fs.writeFile(this.filepath, JSON.stringify(productos,null,2))
       
    
    
        
    }

    async updateProduct(id, updatedFields) {
        const data = await fs.readFile(this.filepath, 'utf-8')
        const productos = JSON.parse(data)
        const productoIndex = productos.findIndex((objeto) => objeto.id === id);
    
        if (productoIndex !== -1) {
          const productoActualizado = {
            ...productos[productoIndex],
            ...updatedFields,
            id: productos[productoIndex].id // Mantenemos el mismo ID
          };
    
          productos[productoIndex] = productoActualizado;
          await fs.writeFile(this.filepath, JSON.stringify(productos, null, 2));
        }
      }
    }


  
 

module.exports = ProductManager


