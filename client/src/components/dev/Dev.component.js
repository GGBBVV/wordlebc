import { useState, useEffect } from "react";
import { collection, getDoc, doc, updateDoc, deleteField, getDocs } from "firebase/firestore";
import { changeWord, db, SetScores, updateWord } from "../../server/Firebase";
import DevButton from "./DevButton.component";
export default function Dev() {
    const [answer, setAnswer] = useState("");
    const [word, setWord] = useState("");

    useEffect(() => {

        const fetchWord = async () => {
            const docRef = await getDoc(doc(collection(db, "words"), "currentWord"));
            setAnswer(docRef.data().word);
        }
        fetchWord();
    })
    async function removeAttempts() {
        //go through whole leaderboard collection and delete the attempts field
       const querySnapshot = await getDocs(collection(db, "leaderboard"));
         querySnapshot.forEach(doc => {
                updateDoc(doc.ref, {
                    attempts: deleteField()
                })
            }
        );
    }

    return (
        <div className="dev">
            <h1>Dev panel</h1>
            <h2>Version: 1.1</h2>
            <h2>Current word: {answer}</h2>
            <button onClick={removeAttempts}>Clear previous attempts</button>
            <DevButton text={"something"}/>
            <button onClick={SetScores}>Reset all scores</button>
            <div className="change-word-container">

                <input type="text" onChange={e => setWord(e.target.value)}/>
                <button onClick= {() => changeWord(word)}>Change Word</button>
            </div>
        </div>
    )
} 