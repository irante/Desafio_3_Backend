const express = require ('express')
const ProductManager = require ('./ProductManager')
const path = require ('path')

const app = express()

const productManager = new ProductManager("productos.json")    // se hace una nueva instancia de la clase ProductManager

app.use(express.urlencoded({extended:true}))

app.get('/products', async (req,res) =>{
    const products = await productManager.getProducts()
    let limite = req.query.limit

    if (limite) {
        products.splice(Number(limite));
      }
      
      res.send(products);

})


app.get('/products/:pid', async (req,res) =>{
    let parametro = req.params.pid
    const products = await productManager.getProductById(parametro)
      
      
      res.send(products);

})




app.listen(3000, ()=>{
    console.log('express server listining')
})



