import react from "react";
import { getLeaderboard, db } from "../../server/Firebase";
import { getDocs, collection, query, orderBy, onSnapshot, doc } from "firebase/firestore";
import "./leaderboard.css";
export default class Leaderboard extends react.Component {
  constructor() {
    super();
    this.state = {
      leaderboard: [],
    };
  }

  async componentDidMount() {
    const q = query(collection(db, "leaderboard"), orderBy("score", "desc"));
    const leaderboardSub = onSnapshot(q, (querySnapshot) => {
      this.setState({ leaderboard: [] });
      querySnapshot.forEach((doc) => {
        let _leaderboard = [...this.state.leaderboard];
        _leaderboard.push(doc.data());
        this.setState({ leaderboard: _leaderboard });
      });
    });
  }
  async componentWillUnmount() {
  }
  renderPlacings() {
    if (this.state.leaderboard.length === undefined) {
      return null;
    }
    return this.state.leaderboard.map((kgroup, index) => {
      return (
       <tr key = {index}>
          <td>{index + 1}.</td>
          <td>{kgroup.name}</td>
          <td className="td-score">{kgroup.score}</td>
       </tr> 
      );
    });
  }
  render() {
    return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <table>
        <tbody>
          {this.renderPlacings()}
        </tbody>

      </table>
      </div>
    );
  }
}
