//========================
// Definir Puerto
//=======================

process.env.PORT = process.env.PORT || 4000

//========================
// ENTORNO 
//=======================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

//========================
// Vencimiento del Token 60 seg, 60 min, 24 horas, 30 dias 
//=======================
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30

//========================
// SEED de authenticacion
//=======================
process.env.SECRET_JWT = process.env.SECRET_JWT || 'secret-dataplus-inventario'

//========================
// URL de Base de datos
//=======================
let urlDB

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/posweb'
} else {
    // urlDB = 'mongodb+srv://userdb:yi2FFaqAVTGIeINX@cluster0.vrwtp.mongodb.net/cafe'
}

process.env.URL_DB = urlDB

//user = userdb
//password = yi2FFaqAVTGIeINX
//URL=mongodb+srv://<username>:<password>@cluster0.vrwtp.mongodb.net/test
//mongodb+srv://userdb:yi2FFaqAVTGIeINX@cluster0.vrwtp.mongodb.net/test