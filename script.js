import { initializeApp } from
    "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp
} from
    "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";


// ==========================================
// FIREBASE CONFIG
// ==========================================

const firebaseConfig = {
    apiKey: "AIzaSyD_DZXrtrfsL8a2KEUoZbMKslUxZUPKJJ0",
    authDomain: "moneymarket-3f3bd.firebaseapp.com",
    projectId: "moneymarket-3f3bd",
    storageBucket: "moneymarket-3f3bd.firebasestorage.app",
    messagingSenderId: "355673733007",
    appId: "1:355673733007:web:5e4225f68d6844134c3dfa"
};


// ==========================================
// INITIALIZE FIREBASE
// ==========================================

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


// ==========================================
// FIRESTORE COLLECTION
// ==========================================

const clientsCollection =
    collection(db, "clients");


// ==========================================
// HTML ELEMENTS
// ==========================================

const clientForm =
    document.getElementById("clientForm");

const status =
    document.getElementById("status");


// ==========================================
// SAVE CLIENT
// ==========================================

clientForm.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();


        // ==========================================
        // SHOW STATUS
        // ==========================================



        try {

            // ==========================================
            // GET FORM VALUES
            // ==========================================

            const clientId =
                document
                    .getElementById("clientId")
                    .value
                    .trim();

            const phoneNumber =
                document
                    .getElementById("phoneNumber")
                    .value
                    .trim();

            const accessCode =
                document
                    .getElementById("accessCode")
                    .value
                    .trim();


            // ==========================================
            // VALIDATE
            // ==========================================

            if (
                !clientId ||
                !phoneNumber ||
                !accessCode
            ) {

                status.textContent =
                    "Please fill in all fields.";

                return;
            }


            // ==========================================
            // SAVE TO FIRESTORE
            // ==========================================

            await addDoc(
                clientsCollection,
                {
                    clientId: clientId,

                    phoneNumber: phoneNumber,

                    accessCode: accessCode,

                    createdAt: serverTimestamp()
                }
            );


            // ==========================================
            // SUCCESS
            // ==========================================

            status.textContent =
                "Client saved successfully.";


            // ==========================================
            // RESET FORM
            // ==========================================

            clientForm.reset();


        } catch (error) {

            console.error(
                "Error saving client:",
                error
            );


            status.textContent =
                "Could not save client.";

        }

    }
);
