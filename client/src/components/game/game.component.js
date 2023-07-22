import { useState, useEffect } from "react";
import { addAttempt, score } from "../../server/Firebase";
import { db } from "../../server/Firebase";
import { collection, getDoc, doc } from "firebase/firestore";
import Keyboard from "./keyboard.component";
import "./game.css";
import {faker} from "@faker-js/faker";
import Row from "./sub-game/Row.component";
let words = require("an-array-of-english-words");

export default function Game({ kGroup }) {
  //State declartion
  const [activeRow, setActiveRow] = useState(0);
  const [answer, setAnswer] = useState("");
  const [letterColors, setLetterColors] = useState(Array(26).fill("#2c2c2c"));
  const [win, setWin] = useState(false);
  const [rows, setRows] = useState([
    { word: "", id: 0, submitted: false, answer: answer },
  ]);

  const [address, setAddress] = useState("");
  // TODO Add physical keyboard support

  useEffect(() => {
    //Get current word from database
    function handleKeyDown(e) {

      if (e.key === "Enter") {
        keyboardClick("submit");
        return;
      }
      if (e.key === "Backspace") {
        keyboardClick("backspace");
        return;

      } else if (e.key === "Control" || e.key === "Alt" || e.key === "Meta" || e.key === "Shift") {
        e.preventDefault();
        return;
      }
      else {
        keyboardClick(e.key);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [rows, answer]);
  useEffect(() => {
    //Local storage for computers address check 
    if (localStorage.getItem("address") === null) {
      const address = faker.address.streetAddress();
      localStorage.setItem("address", address);
    } 
    setAddress(localStorage.getItem("address"));


    const fetchWord = async () => {
      const docRef = await getDoc(doc(collection(db, "words"), "currentWord"));
      setAnswer(docRef.data().word);
    }
    const getRows = async () => {
      const docRef = doc(collection(db, "leaderboard"), kGroup);
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        // setRows([]);
        let _rows = [];
        let rowNumber = 0;
        if (docSnapshot.get('attempts') == null) {
          return;
        }

        if (docSnapshot.data().attempts.length > 0) {
          docSnapshot.data().attempts.forEach((row, i) => {
            let _row = { word: row, id: i, submitted: true, answer: answer }
            _rows.push(_row);
            rowNumber++;
          });
          console.log("Run")
          setActiveRow(docSnapshot.data().attempts.length);
          _rows.push({ word: "", id: rowNumber, submitted: false, answer: answer });
          setRows(_rows);
          return;
        }

      }
    }

    fetchWord();
    getRows();
  }, []);
  function ColorKeyboard() {

    let word = rows[activeRow].word;
    let newLetterColors = [...letterColors];
    //Go through the whole word per letter and compare to answer
    for (let i = 0; i < word.length; i++) {
      let letterNumber = word.charCodeAt(i) - 97;
      //Only run if the letter isn't already green
      if (newLetterColors[letterNumber] !== "#538d4e") {
        for (let j = 0; j < answer.length; j++) {

          //If the letter is in the exact right spot make it green
          if (word[i] === answer[j]) {
            if (i === j) {
              newLetterColors[letterNumber] = "#538d4e";
              break;
            }
            //Else make it yellow if it's in the wrong spot
            else {
              newLetterColors[letterNumber] = "#b59f3b";
            }
            setLetterColors(newLetterColors);
          } else {
            if (newLetterColors[letterNumber] !== "#b59f3b") {
            newLetterColors[letterNumber] = "#727272";
            setLetterColors(newLetterColors);
            }
          }
        }
      }
    }
  }


  //Handle keyboard click events
  function keyboardClick(e) {
    if (e === "submit") {
      if(rows[activeRow].word.length < 5) {
        alert("Word must be at least 5 letters");
        return;
      }
      ColorKeyboard();
      let prevRows = [...rows];
      prevRows[activeRow].word = rows[activeRow].word.toLowerCase();
      setRows(prevRows);
      addAttempt(rows[activeRow].word, address);
      let newRows = [...rows];
      newRows[activeRow].submitted = true;
      //Create new row
      setActiveRow(activeRow + 1);
      //If it's not the right answer, create a new row
      if (newRows[activeRow].word !== answer) {

        let newRow = {
          word: "",
          id: activeRow,
          submitted: false,
          answer: answer,
        };
        newRows.push(newRow);
      }
      setRows(newRows);
      return;
    } else if (e === "backspace") {
      //Delete last letter
      let newRows = [...rows];
      newRows[activeRow].word = newRows[activeRow].word.slice(0, -1);
      setRows(newRows);
      return;
    }
    if (rows[activeRow].word.length >= 5) {
      return;
    }
    let _rows = [...rows];
    _rows[activeRow].word += e;
    setRows(_rows);
  }

  //Function to render out all the rows
  const RenderRows = () => {
    return rows.map((row, index) => (
      <Row
        word={rows[index].word}
        id={row.id}
        key={index}
        submitted={rows[index].submitted}
        answer={answer}
        WordCorrect={WordCorrect}
      />
    ));
  };
  function WordCorrect() {
    score(activeRow);
    setWin(true);
  }
  const WinPopup = () => {
    if (win) {

      return (
        <div className="popup">

          <h2>You got the word correct and got {Math.max(1, 7 - activeRow)} point{(activeRow > 7) ? "" : "s"}!</h2>
        </div>
      )
    }
    else {
      return null;
    }
  }

  return (
    <div className="game">
      <h1>Number of attemps: {activeRow}</h1>
      <WinPopup />
      <div className="rows">
        <div>
          <RenderRows />
        </div>
      </div>
      <Keyboard keyboardClick={keyboardClick} letterColors={letterColors} />
    </div>
  );
}
