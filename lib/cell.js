class Cell extends React.Component {
  render() {
    return (
      <div className={this._getClassName()} onClick={this.props.onClick}>
      </div>
    );
  }

  _getClassName() {
    let classNameArr = ["cell"];

    if (this._active() && this.props.showActiveCells) {
      classNameArr.push("active");
    }
    if (this._correct()) {
      classNameArr.push("correct");
    }
    if (this._incorrect()) {
      classNameArr.push("incorrect");
    }

    return classNameArr.join(" ");
  }

  _active() {
    return this._listedIn(this.props.activeCells);
  }

  _correct() {
    return this._listedIn(this.props.correctGuesses);
  }

  _incorrect() {
    return this._listedIn(this.props.incorrectGuesses);
  }

  _listedIn(array) {
    return array.indexOf(this.props.id) >= 0;
  }
}

Cell.propTypes = {
  onClick: React.PropTypes.func
};

export default Cell;
