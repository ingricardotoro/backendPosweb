const Product = require('../models/product')

//funcion para listar todos los Productos
const listProduct = async(req, res) => {

    await Product.find({})
        //.populate('personid')
        .exec(function(err, products) {
            //en caso de obtener un error en la Busqueda
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            res.status(200).json({
                ok: true,
                msg: "Lista de Productos",
                products
            })
        });
}

//funcion para crear nuevos categorias
const createProduct = async(req, res) => {

    const {
        codeProduct,
        name,
        description,
        categoryId,
        supplierId,
        price1,
        price2,
        price3,
        price4,
        inStock,
        cost,
        brand,
        serie,
        color,
        year,
        weight,
        size,
        minCount,
        expiredDate,
        expiredSaleDate,
        isConsumible,
        active
    } = req.body

    newProduct = new Product({
        codeProduct,
        name,
        description,
        categoryId,
        supplierId,
        price1,
        price2,
        price3,
        price4,
        inStock,
        cost,
        brand,
        serie,
        color,
        year,
        weight,
        size,
        minCount,
        expiredDate,
        expiredSaleDate,
        isConsumible,
        active
    })

    //creamos un objeto de la instancia Product
    try {

        await newProduct.save()

        res.status(201).json({
            ok: true,
            msg: 'Producto creado exitosamente',
            newProduct
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Error creating New Product"
        })
    }

}

//funcion para la eliminacion de Productos
const deleteProduct = async(req, res) => {

    let id = req.params.id
    await Product.findByIdAndRemove(id, (err, ProductDB) => {

        //en caso de obtener un error en la eliminacion
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        //en caso que el id no exita, y no encuentre ningun producto a eliminar
        if (!ProductDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El id del Producto no existe'
                }
            })
        }

        //en caso que el Categoria ha sido eliminada
        res.status(200).json({
            ok: true,
            message: "Producto Eliminado Exitosamente"
        })
    })
}

//funcion para modificar Productos
const updateProduct = async(req, res) => {

    try {

        let id = req.params.id
        let body = req.body

        let updateProduct = {

            codeProduct: body.codeProduct,
            name: body.name,
            description: body.description,
            categoryId: body.categoryId,
            supplierId: body.supplierId,
            price: body.price1,
            price2: body.price2,
            price3: body.price3,
            price4: body.price4,
            inStock: body.inStock,
            cost: body.cost,
            brand: body.brand,
            serie: body.serie,
            color: body.color,
            year: body.year,
            weight: body.weight,
            size: body.size,
            minCount: body.minCount,
            expiredDate: body.expiredDate,
            expiredSaleDate: body.expiredSaleDate,
            isConsumible: body.isConsumible,
            active: body.active
        }

        //new : true retorna el nuevo valor actualizado
        await Product.findByIdAndUpdate(id, updateProduct, {
                new: true, //devuelve el objeto actualizado
            },
            (err, ProductDB) => {

                //en caso de tener algun error en save()
                if (err) {
                    console.log("ERRORASO");
                    return res.status(500).json({
                        ok: false,
                        err
                    })
                }

                //evaluaremos si NO se modifico ekl Producto
                if (!ProductDB) {
                    res.status(500).json({
                        ok: false,
                        err
                    })
                }

                //en caso de que Si se actualizo el Producto
                res.status(200).json({
                    ok: true,
                    msj: "Producto Actualizada Exitosamente",
                    productoActualizado: ProductDB,
                })

            })


    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Error Actualizando Producto"
        })
    }

}

module.exports = { listProduct, createProduct, deleteProduct, updateProduct }