import React from "react";
import { KGroupContext } from "../../KGroupContext";
import { db } from "../../server/Firebase";
import { getDoc, doc, serverTimestamp } from "firebase/firestore";
import "./dropdown.css";

export default class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentHouse: "SelectHouse",
      currentKGroup: "Kgroup",
      dropdownContent: ["Select a house"],
      visible: true,
    };
    // this.changeDropdownContent = this.changeDropdownContent.bind(this);
    this.confirmClicked = this.confirmClicked.bind(this);
    this.confirmClicked = this.confirmClicked.bind(this);
  }
  changeDropdownContent = (house) => {
    this.setState({ currentHouse: house.target.value });
  }

  kgroupDropdown = () => {
    let kgroupDropdownOptions = [];
    switch (this.state.currentHouse) {
      case "Alyward":
        kgroupDropdownOptions = ["Kgroup", "ATMH", "AARD", "AAMS", "AHRS", "AHYP"];
        break;
      case "Brown":
        kgroupDropdownOptions = ["Kgroup", "BARR", "BBLS", "BCKD", "BPYE", "BWHB"];
        break;
      case "Carmichael":
        // kgroup options containing CHMG, CFRL, CVTT, CMPL, CSCK
        kgroupDropdownOptions = ["Kgroup", "CHMG", "CFRL", "CVTT", "CMPL", "CSCK"];
        break;
      case "Hudson-Taylor":
        //KGROUP OPTIONS CONTAING HADK, HBTA, HHOS, HPHS, HWNP
        kgroupDropdownOptions = ["Kgroup", "HADK", "HBTA", "HHOS", "HPHS", "HWNP"];
        break;
      case "Tarore":
        //KGROUP OPTIONS CONTAINING THDR, THTA, TSHC, TPCM, TWLH
        kgroupDropdownOptions = ["Kgroup", "THDR", "THTA", "TSHC", "TPCM", "TWLH"];
        break;
      case "Scott":
        //kGROUP OPTIONS CONTAINING SBTC, SCWS, SDKL, SDNP,SSWK
        kgroupDropdownOptions = ["Kgroup", "SBTC", "SCWS", "SDKL", "SDNP", "SSWK"];
        break;
      default:
        kgroupDropdownOptions = ["Kgroup"];
        break;

    }
    return (
      <select className="dropdown" onChange={(e) => this.setState({ currentKGroup: e.target.value })}>
        {kgroupDropdownOptions.map((house, index) => {
          return (
            <option key={index} value={house}>
              {house}
            </option>
          );
        })}
      </select>
    );
  }
  async confirmClicked() {
    const docQuery = await getDoc(doc(db, "leaderboard", this.state.currentKGroup));
    if (docQuery.exists()) {
      let today = new Date().getTime() / 1000 / 60 / 60;
      let lastAttempt;
      try {

        lastAttempt = docQuery.data().lastAttempt.seconds / 60 / 60;
      }
      catch (e) {
        this.props.CheckAttempted();
      }
      let timeBetween = today - lastAttempt;
      console.log(timeBetween);
      if (timeBetween > 12) {
        this.props.CheckAttempted();
      }

    }
    else {
      this.props.CheckAttempted();
    }
    this.setState({ visible: false });
  }
  // confirmClicked(toggleKGroup) {
  // }
  render() {
    if (this.state.visible) {
      return (
        <KGroupContext.Consumer>
          {({ kgroup, toggleKGroup }) => (
            <div className="dropdown" >
              <select name="sel-house" id="sel-house" onChange={(e) => this.changeDropdownContent(e)}>
                <option value="SelectHouse">House</option>
                <option value="Alyward">Alyward</option>
                <option value="Brown">Brown</option>
                <option value="Carmichael">Carmichael</option>
                <option value="Hudson-Taylor">Hudson-Taylor</option>
                <option value="Tarore">Tarore</option>
                <option value="Scott">Scott</option>
              </select>
              {this.kgroupDropdown()}
              <button onClick={() => {


                if (this.state.currentKGroup === "Kgroup") {
                  alert("Please select a Kgroup");
                }
                else {
                  toggleKGroup(this.state.currentKGroup);
                  this.confirmClicked();
                  this.setState({ visible: false });
                }
              }}>Confirm</button>
            </div>
          )
          }
        </KGroupContext.Consumer >
      );
    }
    else {
      return null;
    }
  }
}
