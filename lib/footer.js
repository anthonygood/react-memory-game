class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        <div className="hint">
          {this.props.hints[this.props.gameState]}...
          {this._remainingCount()}
        </div>
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
}

Footer.defaultProps = {
  hints: {
    ready:    "Get Ready",
    memorize: "Memorize",
    recall:   "Recall"
  }
}

export default Footer;
