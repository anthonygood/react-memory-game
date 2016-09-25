class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        <div className="hint">
          {this.props.hints[this.props.gameState]}...
          {this._remainingCount()}
        </div>
        {this._playAgain()}
      </div>
    );
  }

  _remainingCount() {
    if(this.props.gameState == "recall") {
      return(
        <div className="remaining-count">
          {this.props.activeCellsCount - this.props.correctGuesses.length} more to guess.
        </div>
      );
    }
  }

  _playAgain() {
    if(this.props.gameState.match(/won|lost/)) {
      return (
        <button onClick={this.props.playAgainFn}>
          Play again
        </button>
      );
    }
  }
}

Footer.defaultProps = {
  hints: {
    ready:    "Get Ready",
    memorize: "Memorize",
    recall:   "Recall",
    won:      "Well done",
    lost:     "You lost"
  }
}

export default Footer;
