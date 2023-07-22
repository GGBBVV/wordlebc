import {
    initializeApp
} from 'firebase/app';
import {
    getFirestore,
    doc,
    setDoc,
    getDoc,
    getDocs,
    collection,
    serverTimestamp,
    updateDoc
} from 'firebase/firestore';
const firebaseApp = initializeApp({
    apiKey: "AIzaSyBeU8FotF6GAOzLh3U5-XQcfvhFc77wR7A",
    authDomain: "wordle-82dfd.firebaseapp.com",
    projectId: "wordle-82dfd",
    storageBucket: "wordle-82dfd.appspot.com",
    messagingSenderId: "312510779081",
    appId: "1:312510779081:web:956b1246d208b24f0e0718",
    measurementId: "G-MEFKZ0FL3J"
});
let kGroup;
export function setKgroup(k) {
    kGroup = k;
}

export const db = getFirestore(firebaseApp);

export async function score(attempts) {
    let _score = 0;
    const docRef = doc(db, "leaderboard", kGroup);
    const docSnapshot = await getDoc(docRef);
    let dbScore = docSnapshot.get("score");
    if (docSnapshot.exists() && dbScore !== null) {
        let addScore = Math.max(7 - attempts, 1);
        if(!isNaN(dbScore)) {
            _score = dbScore + addScore;
        }
        else {
            _score = addScore;
        }
    } else {
        _score = Math.max(7 - attempts, 1);

    }
    await updateDoc(docRef, {
        name: kGroup,
        score: _score,
        lastAttempt: serverTimestamp()
    });
}

export async function getLeaderboard() {
    const querySnapshot = await getDocs(collection(db, 'leaderboard'));
    let data = [];
    querySnapshot.forEach((doc) => {
        data.push(doc.data());
    })

    return data;
}

export async function addAttempt(attempt,address) {
    const docRef = doc(db, "leaderboard", kGroup);
    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists()) {
        let _attempts;
        //log if the document has the attempts field
        if (docSnapshot.get('attempts') == null) {
            _attempts = [];
        } else {
            _attempts = docSnapshot.data().attempts;

        }
        let _addresses;
        if(docSnapshot.get('addresses') == null) {
            _addresses = [];
        }
        else {
            _addresses = docSnapshot.data().addresses;
        }
        _addresses.push(address);
        _attempts.push(attempt);
        await updateDoc(docRef, {
            attempts: _attempts,
            addresses: _addresses
        });
    } else {
        await setDoc(docRef, {
            name: kGroup,
            attempts: [attempt],
            score: 0,
        })
    }
}

export async function changeWord(_word) {
    const docRef = doc(db, "words", "currentWord");
    await updateDoc(docRef, {
        word: _word
    })
}
export async function SetScores() {
    //Resets all the scores to 0
    const querySnapshot = await getDocs(collection(db, 'leaderboard'));
    querySnapshot.forEach((doc) => {
        updateDoc(doc.ref, {
            score: 0
        })
    });
}