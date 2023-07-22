
export default function Block({ text, color }) {
  let _color;
  if(color === "green") {
    _color = "#538d4e";
  }
  else if (color === "yellow") { 
    _color = "#b59f3b";
  }
  else if (color === "white") { 
    _color = "#2c2c2c";
  } 
  return (
    <div style={{backgroundColor: _color}} className="block">
      <p>{text}</p>
    </div>
  );
};