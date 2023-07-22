import {BsBackspaceFill, BsArrowLeftSquare} from 'react-icons/bs';

export default function Keyboard({ keyboardClick, letterColors }) {
  return (
    <div className="keyboard">
      <div className="keyboard-row">
        {/* Upper row of keyboard with background color being array of letterColors index of what number they are alphabet - 1 */}
        <button
          className="keyboard-button"
          onClick={() => keyboardClick("q")}
          style={{ backgroundColor: letterColors[16] }}
        >
          Q
        </button>
        <button
          className="keyboard-button"
          onClick={() => keyboardClick("w")}
          style={{ backgroundColor: letterColors[22] }}
        >
          W
        </button>
        <button
          className="keyboard-button"
          onClick={() => keyboardClick("e")}
          style={{ backgroundColor: letterColors[4] }}
        >
          E
        </button>
        <button
          className="keyboard-button"
          onClick={() => keyboardClick("r")}
          style={{ backgroundColor: letterColors[17] }}
        >
          R
        </button>
        <button
          className="keyboard-button"
          onClick={() => keyboardClick("t")}
          style={{ backgroundColor: letterColors[19] }}
        >
          T
        </button>
        <button
          className="keyboard-button"
          onClick={() => keyboardClick("y")}
          style={{ backgroundColor: letterColors[24] }}
        >
          Y
        </button>
        <button
          className="keyboard-button"
          onClick={() => keyboardClick("u")}
          style={{ backgroundColor: letterColors[20] }}
        >
          U
        </button>
        <button
          className="keyboard-button"
          onClick={() => keyboardClick("i")}
          style={{ backgroundColor: letterColors[8] }}
        >
          I
        </button>
        <button
          className="keyboard-button"
          onClick={() => keyboardClick("o")}
          style={{ backgroundColor: letterColors[14] }}
        >
          O
        </button>
        <button
          className="keyboard-button"
          onClick={() => keyboardClick("p")}
          style={{ backgroundColor: letterColors[15] }}
        >
          P
        </button>
      </div>
      <div className="keyboard-row">
        <button
          className="keyboard-button"
          onClick={() => keyboardClick("a")}
          style={{ backgroundColor: letterColors[0] }}
        >
          A
        </button>
        <button
          className="keyboard-button"
          onClick={() => keyboardClick("s")}
          style={{ backgroundColor: letterColors[18] }}
        >
          S
        </button>
        <button
          className="keyboard-button"
          onClick={() => keyboardClick("d")}
          style={{ backgroundColor: letterColors[3] }}
        >
          D
        </button>
        <button
          className="keyboard-button"
          onClick={() => keyboardClick("f")}
          style={{ backgroundColor: letterColors[5] }}
        >
          F
        </button>
        <button
          className="keyboard-button"
          onClick={() => keyboardClick("g")}
          style={{ backgroundColor: letterColors[6] }}
        >
          G
        </button>
        <button
          className="keyboard-button"
          onClick={() => keyboardClick("h")}
          style={{ backgroundColor: letterColors[7] }}
        >
          H
        </button>
        <button
          className="keyboard-button"
          onClick={() => keyboardClick("j")}
          style={{ backgroundColor: letterColors[9] }}
        >
          J
        </button>
        <button
          className="keyboard-button"
          onClick={() => keyboardClick("k")}
          style={{ backgroundColor: letterColors[10] }}
        >
          K
        </button>
        <button
          className="keyboard-button"
          onClick={() => keyboardClick("l")}
          style={{ backgroundColor: letterColors[11] }}
        >
          L
        </button>
      </div>
        <div className="keyboard-row">
        <button
          className="keyboard-button"
          onClick={() => keyboardClick("submit")}
        >
          ENTER
        </button>
          <button
            className="keyboard-button"
            onClick={() => keyboardClick("z")}
            style={{ backgroundColor: letterColors[25] }}
          >
            Z
          </button>
          <button
            className="keyboard-button"
            onClick={() => keyboardClick("x")}
            style={{ backgroundColor: letterColors[23] }}
          >
            X
          </button>
          <button
            className="keyboard-button"
            onClick={() => keyboardClick("c")}
            style={{ backgroundColor: letterColors[2] }}
          >
            C
          </button>
          <button
            className="keyboard-button"
            onClick={() => keyboardClick("v")}
            style={{ backgroundColor: letterColors[21] }}
          >
            V
          </button>
          <button
            className="keyboard-button"
            onClick={() => keyboardClick("b")}
            style={{ backgroundColor: letterColors[1] }}
          >
            B
          </button>
          <button
            className="keyboard-button"
            onClick={() => keyboardClick("n")}
            style={{ backgroundColor: letterColors[13] }}
          >
            N
          </button>
          <button
            className="keyboard-button"
            onClick={() => keyboardClick("m")}
            style={{ backgroundColor: letterColors[12] }}
          >
            M
          </button>

          {/* Button for backspace */}

          <button
            className="keyboard-button"
            onClick={() => keyboardClick("backspace")}
          >
          <BsBackspaceFill/>
          </button>
        </div>
    </div>
  );
}
