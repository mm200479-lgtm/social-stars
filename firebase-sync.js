/**
 * Social Stars — Firebase Cloud Sync
 * Syncs profiles across devices using a family code.
 */

// Firebase config
var FIREBASE_CONFIG = {
    apiKey: "AIzaSyBaJmUr1X2qERlzF4Lkl_9vHC3WqDFHu3U",
    authDomain: "social-stars-368b4.firebaseapp.com",
    projectId: "social-stars-368b4",
    storageBucket: "social-stars-368b4.firebasestorage.app",
    messagingSenderId: "443135313430",
    appId: "1:443135313430:web:336e928376703354af1737"
};

// Firebase state
var firebaseApp = null;
var firebaseDb = null;
var familyCode = null;
var syncEnabled = false;
var syncListener = null;

// Initialize Firebase (loaded via CDN in index.html)
function initFirebase() {
    try {
        if (typeof firebase !== "undefined" && firebase.initializeApp) {
            firebaseApp = firebase.initializeApp(FIREBASE_CONFIG);
            firebaseDb = firebase.firestore();
            syncEnabled = true;
            console.log("Firebase initialized");
        }
    } catch (e) {
        console.log("Firebase init failed, using local storage only", e);
        syncEnabled = false;
    }
}

// Get/set family code from localStorage
function getFamilyCode() {
    try { return localStorage.getItem("socialStarsFamilyCode") || null; }
    catch (e) { return null; }
}

function setFamilyCode(code) {
    try { localStorage.setItem("socialStarsFamilyCode", code); }
    catch (e) {}
    familyCode = code;
}

// Generate a random family code
function generateFamilyCode() {
    var chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    var code = "";
    for (var i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

// ===== Cloud CRUD =====

// Save all profiles to cloud
function cloudSaveProfiles(profiles) {
    if (!syncEnabled || !familyCode || !firebaseDb) return;
    try {
        firebaseDb.collection("families").doc(familyCode).set({
            profiles: JSON.parse(JSON.stringify(profiles)),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true }).catch(function (e) {
            console.log("Cloud save error:", e);
        });
    } catch (e) {
        console.log("Cloud save error:", e);
    }
}

// Load profiles from cloud (returns a Promise)
function cloudLoadProfiles() {
    if (!syncEnabled || !familyCode || !firebaseDb) {
        return Promise.resolve(null);
    }
    return firebaseDb.collection("families").doc(familyCode).get()
        .then(function (doc) {
            if (doc.exists && doc.data().profiles) {
                return doc.data().profiles;
            }
            return null;
        })
        .catch(function (e) {
            console.log("Cloud load error:", e);
            return null;
        });
}

// Check if a family code exists in the cloud
function cloudCheckCode(code) {
    if (!syncEnabled || !firebaseDb) return Promise.resolve(false);
    return firebaseDb.collection("families").doc(code).get()
        .then(function (doc) { return doc.exists; })
        .catch(function () { return false; });
}

// Listen for real-time changes
function cloudListen(callback) {
    if (!syncEnabled || !familyCode || !firebaseDb) return;
    // Remove old listener
    if (syncListener) { syncListener(); syncListener = null; }
    syncListener = firebaseDb.collection("families").doc(familyCode)
        .onSnapshot(function (doc) {
            if (doc.exists && doc.data().profiles) {
                callback(doc.data().profiles);
            }
        }, function (e) {
            console.log("Cloud listen error:", e);
        });
}

// ===== Merge logic =====
// Merge cloud profiles with local, keeping the one with more stars for each profile
function mergeProfiles(local, cloud) {
    if (!cloud) return local;
    if (!local || Object.keys(local).length === 0) return cloud;

    var merged = JSON.parse(JSON.stringify(local));

    // Add cloud profiles that don't exist locally (match by playerName)
    var localNames = {};
    Object.keys(merged).forEach(function (id) {
        localNames[merged[id].playerName] = id;
    });

    Object.keys(cloud).forEach(function (cloudId) {
        var cp = cloud[cloudId];
        var localId = localNames[cp.playerName];
        if (localId) {
            // Same player exists — keep the one with more stars
            if ((cp.totalStars || 0) > (merged[localId].totalStars || 0)) {
                merged[localId] = JSON.parse(JSON.stringify(cp));
            }
        } else {
            // New player from cloud — add them
            merged[cloudId] = JSON.parse(JSON.stringify(cp));
        }
    });

    return merged;
}
