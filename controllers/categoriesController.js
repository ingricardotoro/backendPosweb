const Category = require('../models/category')

//funcion para listar todas las Categorias
const listCategory = async(req, res) => {

    await Category.find({})
        //.populate('personid')
        .exec(function(err, categories) {
            //en caso de obtener un error en la Busqueda
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            res.status(200).json({
                ok: true,
                msg: "Lista de Categorias",
                categories
            })
        });
}

//funcion para crear nuevos categorias
const createCategory = async(req, res) => {

    const {
        codeCategory,
        name,
        description,
        parentId,
        active
    } = req.body

    newCategory = new Category({
        codeCategory,
        name,
        description,
        parentId,
        active
    })

    //creamos un objeto de la instancia Category
    try {

        await newCategory.save()

        res.status(201).json({
            ok: true,
            msg: 'Categoria creada exitosamente',
            newCategory
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Error creating New Category"
        })
    }

}

//funcion para la eliminacion de las Categorias
const deleteCategory = async(req, res) => {

    let id = req.params.id
    await Category.findByIdAndRemove(id, (err, categoryDB) => {

        //en caso de obtener un error en la eliminacion
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        //en caso que el id no exita, y no encuentre ninguna categoria a eliminar
        if (!categoryDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El id de la Categoria no existe'
                }
            })
        }

        //en caso que el Categoria ha sido eliminada
        res.status(200).json({
            ok: true,
            message: "Categoria Eliminada Exitosamente"
        })
    })
}

//funcion para modificar Categorias
const updateCategory = async(req, res) => {

    try {

        let id = req.params.id
        let body = req.body

        let updateCategory = {

            codeCategory: body.codeCategory,
            name: body.name,
            description: body.description,
            parentId: body.parentId,
            active: body.active
        }

        //new : true retorna el nuevo valor actualizado
        await Category.findByIdAndUpdate(id, updateCategory, {
                new: true, //devuelve el objeto actualizado
            },
            (err, categoryDB) => {

                //en caso de tener algun error en save()
                if (err) {
                    console.log("ERRORASO");
                    return res.status(500).json({
                        ok: false,
                        err
                    })
                }

                //evaluaremos si NO se modifico la Categoria
                if (!categoryDB) {
                    res.status(500).json({
                        ok: false,
                        err
                    })
                }

                //en caso de que Si se actualizo la Categoria
                res.status(200).json({
                    ok: true,
                    msj: "Categoria Actualizada Exitosamente",
                    categoriaActualizada: categoryDB,
                })

            })


    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Error Actualizando Categoria"
        })
    }

}

module.exports = { createCategory, listCategory, deleteCategory, updateCategory }