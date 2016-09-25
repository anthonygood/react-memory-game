import _ from "lodash";
import Row from "./row";
import Cell from "./cell";
import Footer from "./footer";

const MAX_WRONG_GUESSES_COUNT = 3;

class Game extends React.Component {

  constructor(props) {
    super(props);

    this._initializeMatrix();
    this.state = this._initialState();
  }

  _initialState() {
    return {
      gameState:        "ready",
      correctGuesses:   [],
      incorrectGuesses: []
    };
  }

  _initializeMatrix() {
    this.matrix      = this._createMatrix();
    this.activeCells = this._selectCells(this.matrix, this.props.activeCellsCount);
  }

  render() {
    let showActive = this._showActive();
    return (
      <div className="game-container">
        <div className="grid">
          {this.matrix.map((row, rid) =>
            <Row key={rid}>
              {row.map((cellid) => <Cell key={cellid}
                                         onClick={this._cellClicked.bind(this, cellid)}
                                         id={cellid}
                                         activeCells={this.activeCells}
                                         showActiveCells={showActive}
                                         {...this.state} />
              )}
            </Row>
          )}
        </div>
        <Footer activeCellsCount={this.activeCells.length}
                playAgainFn={this._playAgain.bind(this)}
                {...this.state} />
      </div>
    );
  }

  componentDidMount() {
    this._startTimers();
  }

  _startTimers() {
    // set up a daisy chain of timers
    // ready -> memorize -> lose
    const afterRecallFn   = this._loseTimeout.bind(this); // lose timeout comes after recall timeout
    const afterMemorizeFn = this._recallTimeout.bind(this, afterRecallFn); // recall timeout comes after memorize timeout

    this._memorizeTimeout(afterMemorizeFn); // set memorize timeout, passing bound callbacks
  }

  // show active cells in "memorize" and "lost" states
  _showActive() {
    return this.state.gameState.match(/memorize|lost/);
  }

  _cellClicked(cellId, se) {
    if(this.state.gameState == "recall") {
      let {correctGuesses, incorrectGuesses, gameState} = this.state;

      if(this._isActive(cellId)) { correctGuesses = _.uniq(correctGuesses.concat(cellId));     }
      else                       { incorrectGuesses = _.uniq(incorrectGuesses.concat(cellId)); }

      gameState = this._checkGameState(correctGuesses, incorrectGuesses);
      this.setState({correctGuesses, incorrectGuesses, gameState });
    }
  }

  // returns a string representation of the game's current state
  // eg. "won", "lost", "recall", etc.
  _checkGameState(correct, incorrect) {
    let state = this.state.gameState;

    if(correct.length == this.activeCells.length) {
      state = "won";
    }
    else if (incorrect.length >= MAX_WRONG_GUESSES_COUNT) {
      state = "lost";
    }

    return state;
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

  _isActive(cellId) {
    return this.activeCells.indexOf(cellId) >= 0;
  }

  _memorizeTimeout(callbackFn) {
    setTimeout(
      () => this.setState({gameState: "memorize"}, callbackFn),
      this.props.readyTimeout
    );
  }

  _recallTimeout(callbackFn) {
    setTimeout(
      () => { this.setState({gameState: "recall"}, callbackFn) },
      this.props.memorizeTimeout
    )
  }

  _loseTimeout() {
    setTimeout(
      () => this.setState({gameState: "lost"}),
      this.props.loseTimeout
    )
  }

  _playAgain() {
    console.log("playAgain");
    this._initializeMatrix();
    this.setState(this._initialState());
    this._startTimers();
  }
}

Game.propTypes = {
  rows: React.PropTypes.number.isRequired,
  columns: React.PropTypes.number.isRequired
};

Game.defaultProps = {
  readyTimeout:    2000,  // time for ready phase
  memorizeTimeout: 4000,  // time for recall phase
  loseTimeout:     10000  // time player has to complete grid
}

export default Game;
