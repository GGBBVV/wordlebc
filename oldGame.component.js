
  function ColorKeyboard() {

    let word = rows[activeRow].word;
    let newLetterColors = [...letterColors];
    //Go through the whole word per letter and compare to answer
    for (let i = 0; i < word.length; i++) {
      let letterNumber = word.charCodeAt(i) - 97;
      for (let j = 0; j < answer.length; j++) {
        //If the letter is already green, keep it green
        if (newLetterColors[letterNumber] === "#538d4e") {
          break;
        }
        //If the letter is in the exact right spot make it green
        if (word[i] === answer[j]) {
          if (i === j) {
            newLetterColors[letterNumber] = "#538d4e";
            
          }
          //Else make it yellow if it's in the wrong spot
          else {
            newLetterColors[letterNumber] = "#b59f3b";
          }
          setLetterColors(newLetterColors);
        } else {
          newLetterColors[letterNumber] = "#727272";
          setLetterColors(newLetterColors);
        }
      }
    }
  }