class Cell extends React.Component {
  render() {
    return (
      <div className={this._getClassName()}>
        {this.props.id}
      </div>
    );
  }

  _getClassName() {
    return this._active() && this.props.gameState == "memorize" ? "cell active" : "cell";
  }

  _active() {
    return this.props.activeCells.indexOf(this.props.id) >= 0;
  }
}

export default Cell;
