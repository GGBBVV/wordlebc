import Block from './Block.component';

export default function Row({ word, id, submitted, answer, WordCorrect, WordIncorrect }){
  let str = word.split("");
  let i = 5 - str.length;
  if (submitted) {
    let items = [];
    let noRight = 0;
    for (let i = 0; i < str.length; i++) {
      let color = "white";

      for (let j = 0; j < answer.length; j++) {
        if (str[i] === answer[j]) {
          if (i === j) {
            color = "green";
          
            noRight++;
            break;
          } else {
            color = "yellow";
            
          }
        }
      }
      items.push(<Block text={str[i]} color={color} key={i} />);
    }

    if (noRight === 5) {
      WordCorrect();
    }
    return <div className="row">{items}</div>;
  }

  function renderBlanks() {
    const items = [];
    for (i < 0; i--;) {
      items.push(<Block text="_" key={i} color="white" />);
    }
    return items;
  }
  if (str.length < 0) {
    return <div className="row">{renderBlanks()}</div>;
  }
  return (
    <div className="row">
      {str.map((letter, index) => (
        <Block text={letter} key={index} />
      ))}
      {renderBlanks()}
    </div>
  );
};