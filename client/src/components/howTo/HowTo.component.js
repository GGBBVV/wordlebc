import Block from "../game/sub-game/Block.component";
import './howTo.css';

export default function HowTo() {
    return (
        <div className="how-to">
            <h2>How to play</h2>
            <div className="how-to-container">
                <Block text={"L"} color={"yellow"} />
                <p>If a block is the color yellow, it means that the letter exists in the word, but is in the wrong spot</p>
            </div>
            <div className="how-to-container">
                <Block text={"O"} color={"green"} />
                <p>If a block is the color green, it means that the letter exists in the word, and is in the right spot</p>
            </div>
            <p>Your goal is to find the 5 letter word in as little attempts as possible</p>
            <h2>Scoring</h2>
            <div >
                <p>Scoring is decided by the 7 minus the number of attempts. <strong>This means how many times you guess matters.</strong></p>
                <p>If you take more than 6 attempts, you will still get at least one point for guessing the word correctly at some point.</p>
            </div>
            <h2>Let's play, select your kgroup in the dropdown above to begin!</h2>
        </div>
    )
}