require('dotenv').config()         //coneccion de firebase con mi backend


const { initializeApp, applicationDefault } = require('firebase-admin/app')
const { getFirestore } = require('firebase-admin/firestore')

initializeApp({
    credential: applicationDefault(),  //intenta cargar la variable del env por nosotros
})

const db = getFirestore();

module.exports = {
    db
}


///---------------docu
// var admin = require("firebase-admin");

// var serviceAccount = require("path/to/serviceAccountKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });