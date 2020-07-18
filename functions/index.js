const functions = require('firebase-functions');
const admin = require('firebase-admin');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

admin.initializeApp();

exports.createUserAccount = functions.firestore.document('users/{docId}')
    .onCreate((snap, context) => {
        const userData = snap.data();
        console.info('Creating user account.................');

        return admin.auth().createUser({
                uid: context.params.docId,
                email: userData.userEmail,
                displayName: `${userData.userFirstName} ${userData.userMiddleNames} ${userData.userLastName}`,
                // TODO: Generate a password generater and upload password reply to account creater or account email
                password: '123456'
            })
            .then((userRecord)=>{
                // See the UserRecord reference doc for the contents of userRecord.
                console.log('Successfully created new user:....................');
                return 'Successful';
            })
            .catch((error)=>{
                console.error('Error creating new user:', error);
                return error;
            });
    });

// exports.createUserDocument = functions.auth.user()
//     .onCreate((user) => {
//         //  TODO send user greeting email
//         console.info(`Creating user, ${user.displayName} document`);

//         return admin.firestore().doc(`/users/${user.uid}`).set({
//             userEmail: user.email,
//             userFirstName: 'Craig',
//             userLastName: 'Mudzingwa',
//             userMiddleNames: 'Tanaka',
//             userRole: 'Student'
//         });
//     });

// Todo delete waitlist document and then add users document to users
