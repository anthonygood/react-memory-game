import Row from "./row";
import Cell from "./cell";
import Footer from "./footer";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.matrix = this._createMatrix(); // not state, just variable
    this.state = {
      gameState: "ready"
    };
  }

  render() {
    return (
      <div className="game-container">
        <div className="grid">
          {this.matrix.map((row, rid) =>
            <Row key={rid}>
              {row.map((cellid) => <Cell key={cellid} id={cellid} /> )}
            </Row>
          )}
        </div>
        <Footer {...this.state} />
      </div>
    );
  }

  componentDidMount() {
    this._memorizeTimeout(this._recallTimeout.bind(this));
  }

  _createMatrix() {
    let matrix = [],
        row;

    for(let r = 0; r < this.props.rows; r++) {
      row = [];
      for(let c = 0; c < this.props.columns; c++) {
        row.push(`${r}${c}`);
      }
      matrix.push(row);
    }

    window.matrix = matrix;
    return matrix;
  }

  _memorizeTimeout(callbackFn) {
    setTimeout(
      () => this.setState({gameState: "memorize"}, callbackFn),
      this.props.readyTimeout
    );
  }

  _recallTimeout() {
    setTimeout(
      () => { this.setState({gameState: "recall"}) },
      this.props.memorizeTimeout
    )
  }
}

Game.propTypes = {
  rows: React.PropTypes.number.isRequired,
  columns: React.PropTypes.number.isRequired
};

Game.defaultProps = {
  readyTimeout:    2000, // timeout before game state changes to memorize
  memorizeTimeout: 4000  // timeout before game state changes to recall
}

export default Game;
