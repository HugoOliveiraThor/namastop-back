const firebase = require('firebase')
const firestore = require('firebase/firestore')
const config = require('../../config/default')

const firebaseApp = firebase.initializeApp(config)
firebaseApp.firestore().settings({ timestampsInSnapshots: true })
const begin = firebaseApp.firestore()
// export default firebaseApp.firestore()
module.exports = firebaseApp.firestore()