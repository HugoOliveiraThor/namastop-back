const db = require('./firebase/init')

exports.addUser = function () {
  db.collection('namastop').add(user)
  .then(() => {
     console.log('Sucesso!') 
  }).catch(err => {
    console.log('Something get wrong', err)
})
}

// const addToCollection = (user) => {
//   db.collection('namastop').add(user)
//     .then(() => {
//        console.log('Sucesso!') 
//     }).catch(err => {
//       console.log('Something get wrong', err)
//   })
// }