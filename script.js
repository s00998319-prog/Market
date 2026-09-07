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

const mobileInput =
    document.getElementById("mobile");

const pinInput =
    document.getElementById("pin");

const message =
    document.getElementById("message");

const togglePin =
    document.getElementById("togglePin");

const registerButton =
    document.querySelector(".secondary-button");


// ==========================================
// SAFETY CHECK
// ==========================================

if (!clientForm) {
    console.error("clientForm was not found.");
}


// ==========================================
// SHOW / HIDE PIN
// ==========================================

if (togglePin && pinInput) {

    togglePin.addEventListener(
        "click",
        () => {

            if (pinInput.type === "password") {

                pinInput.type = "text";

                togglePin.setAttribute(
                    "aria-label",
                    "Hide PIN"
                );

            } else {

                pinInput.type = "password";

                togglePin.setAttribute(
                    "aria-label",
                    "Show PIN"
                );

            }

        }
    );

}


// ==========================================
// LOGIN / DEMO CLIENT SAVE
// ==========================================

if (clientForm) {

    clientForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            // ==========================================
            // CLEAR MESSAGE
            // ==========================================

            message.textContent = "";


            // ==========================================
            // GET VALUES
            // ==========================================

            const mobile =
                mobileInput.value.trim();


            // ==========================================
            // VALIDATE MOBILE
            // ==========================================

            if (!/^\d{10}$/.test(mobile)) {

                message.textContent =
                    "Please enter a valid 10-digit mobile number.";

                return;
            }


            // ==========================================
            // DEMO RECORD
            // ==========================================
            //
            // We intentionally don't store the PIN.
            // The PIN can still be used locally for
            // testing the UI/login flow.
            //
            // ==========================================

            message.textContent =
                "Saving demo client...";


            try {

                await addDoc(
                    clientsCollection,
                    {
                        clientId: crypto.randomUUID(),

                        phoneNumber: mobile,

                        accountType: "demo",

                        createdAt: serverTimestamp()
                    }
                );


                // ==========================================
                // SUCCESS
                // ==========================================

                message.textContent =
                    "Demo client saved successfully.";


                // ==========================================
                // RESET
                // ==========================================

                clientForm.reset();


            } catch (error) {

                console.error(
                    "Error saving client:",
                    error
                );


                message.textContent =
                    "Could not save client.";

            }

        }
    );

}


// ==========================================
// REGISTER BUTTON
// ==========================================

if (registerButton) {

    registerButton.addEventListener(
        "click",
        () => {

            message.textContent =
                "Demo registration selected.";

        }
    );

}
