const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
//const { getAuth } = require('firebase-admin/auth');

const serviceAccount = require('../serviceAccountKey.json');

initializeApp({
    credential: cert(serviceAccount)
});

const firestore = getFirestore();
//const auth = getAuth();

module.exports = { firestore };