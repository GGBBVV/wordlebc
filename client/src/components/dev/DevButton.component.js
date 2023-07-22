import { useState } from "react";
export default function DevButton({ clickEvent, text }) {
    let [size, setSize] = useState("2rem");
    let [clicked, setClicked] = useState(false);
    let[color, setColor] = useState("#999999");
    function click() {
        if (!clicked) {
            setSize("3rem");
            setColor("#de752f");
            setClicked(true);
        }
        else {
            clickEvent();
        }
    }
    return (
        <button style={{ height: size, background : color }} onClick={click}>{text}</button>
    )
}