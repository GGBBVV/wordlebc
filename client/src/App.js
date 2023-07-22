import React from "react";
import { db } from "./server/Firebase";
import { getDoc, doc, collection } from "firebase/firestore";
import Dropdown from "./components/dropdown/dropdown.component";
import Header from "./components/header/header.component";

import { setKgroup } from "./server/Firebase";
import { KGroupContext } from "./KGroupContext";
import "./App.css";


import react from "react";
import Game from "./components/game/game.component";
import Leaderboard from "./components/leaderboard/leaderboard.component";
import HowTo from "./components/howTo/HowTo.component";
import Dev from "./components/dev/Dev.component";
import Modal from "./components/Modal/Modal";

export default class App extends react.Component {
  constructor(props) {
    super(props);
    this.toggleKGroup = (res) => {
      setKgroup(res);
      this.setState({
        kGroup: res,

      });
    };
    //CHANGE ATTEMPTED TO TRUE
    this.state = {
      kGroup: "",
      toggleKGroup: this.toggleKGroup,
      attempted: true,
      devMenu : false,
    };
    this.CheckAttempted = this.CheckAttempted.bind(this);
    this.GetAttempts = this.GetAttempts.bind(this);
  }
  RenderGame = () => {
    if(this.state.devMenu) {
      return <Dev/>
    }
    if (this.state.kGroup !== "" && this.state.attempted === false) {
      return <Game attempts = {this.GetAttempts()} kGroup = {this.state.kGroup}/>;
    } else if (this.state.kGroup === "") {
      return (
        <>
          <h1>Please select a kgroup and press confirm</h1>
          <HowTo/>
        </>)
    }
    else {
      return <h1>You have already attempted the wordle of the week</h1>;
    }
  };
  CheckAttempted() {
    this.setState({ attempted: false });
  }

  async GetAttempts() {
    if(this.state.kGroup == ""){

      return null;
    }
    const docRef = doc(db, "leaderboard", this.state.kGroup);
    const docSnapshot = await getDoc(docRef);
    if(docSnapshot.exists()) {
      return docSnapshot.data().attempts;
    }
  }
  render() {
    return (
      <KGroupContext.Provider
        value={{
          kgroup: this.state.kGroup,
          toggleKGroup: this.state.toggleKGroup,
        }}
      >
        <div className="App">
         <button className="dev-button" onClick={() => this.setState({devMenu: true})}></button>
          <Header />
          <main>
            <div className="main-content">
              <h1>{this.state.kGroup}</h1>
              <Dropdown CheckAttempted={this.CheckAttempted} />
              <this.RenderGame />
            </div>
            <Leaderboard />
          </main>
        </div>
      </KGroupContext.Provider>
    );
  }
}