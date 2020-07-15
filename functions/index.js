const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.createUser = functions.firestore.document('users-waitlist/{docId}')
    .onCreate((snap, context) => {
        const userData = snap.data();

        console.log(userData);

        // admin.auth().createUser({
        //         uid: 'some-uid',
        //         email: 'user@example.com',
        //         phoneNumber: '+11234567890'
        //     })
        //     .then(function (userRecord) {
        //         // See the UserRecord reference doc for the contents of userRecord.
        //         console.log('Successfully created new user:', userRecord.uid);
        //     })
        //     .catch(function (error) {
        //         console.log('Error creating new user:', error);
        //     });
    });
