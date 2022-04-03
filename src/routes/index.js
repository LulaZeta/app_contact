const { Router }  = require('express')
const { db } = require('../firebase')


const router = Router();

router.get('/', async (req, res) => {

    const querySnapshot = await db.collection('contacts').get()
    //console.log(querySnapshot.docs[0].data())
    const contacts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()                       //con esta línea me evito tener q escribir las propiedades de la db
        // firstname: doc.data().firstname,
        // lastname: doc.data().lastname,
        // email: doc.data().email,
        // phone: doc.data().phone,
    }))
   // console.log(contacts)
    res.render('index', { contacts })
 })

 router.post('/new-contact', async (req, res) => {
    const { firstname, lastname, email, phone} = req.body
    //console.log(firstname, lastname, email, phone)
   await db.collection('contacts').add({firstname, lastname, email, phone})
     res.redirect('/')
 })

 router.get('/edit-contact/:id', async (req, res) => {
     const { id } = req.params

    const doc = await db.collection('contacts').doc(id).get()


    // console.log({
    //     id: doc.id,
    //     ...doc.data()
    // })
    //res.send('edit contact')
    res.render('index', { contact: {id: doc.id, ...doc.data()}})
 })

 router.get('/delete-contact/:id', async (req, res) => {

    await db.collection('contacts').doc(req.params.id).delete()
    res.redirect('/')
 })


 router.post('/update-contact/:id', async (req, res) => {
   
   await  db.collection('contacts').doc(req.params.id).update(req.body)

   res.redirect('/')
 })
 module.exports = router;