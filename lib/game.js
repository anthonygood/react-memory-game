import _ from "lodash";
import Row from "./row";
import Cell from "./cell";
import Footer from "./footer";

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.matrix      = this._createMatrix();
    this.activeCells = this._selectCells(this.matrix, this.props.activeCellsCount);
    this.state       = {
      gameState:        "ready",
      correctGuesses:   [],
      incorrectGuesses: []
    };
  }

  render() {
    return (
      <div className="game-container">
        <div className="grid">
          {this.matrix.map((row, rid) =>
            <Row key={rid}>
              {row.map((cellid) => <Cell onClick={this._cellClicked.bind(this, cellid)} key={cellid} id={cellid} activeCells={this.activeCells} {...this.state} /> )}
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

  _cellClicked(cellid, se) {
    if(this.state.gameState == "recall") {
      if(this.activeCells.indexOf(cellid) >= 0) { this.setState({correctGuesses: this.state.correctGuesses.concat(cellid)}); }
      else { this.setState({incorrectGuesses: this.state.incorrectGuesses.concat(cellid)}); }
    }
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

    return matrix;
  }

  _selectCells(matrix, count) {
    return _.sampleSize(
      _.flatten(matrix),
      count
    );
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
