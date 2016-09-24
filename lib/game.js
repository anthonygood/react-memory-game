import Row from "./row";
import Cell from "./cell";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.matrix = this._createMatrix(); // not state, just variable
  }
  render() {
    return (
      <div className="grid">
        {this.matrix.map((row, rid) =>
          <Row key={rid}>
            {row.map((cellid) => <Cell key={cellid} id={cellid} /> )}
          </Row>
        )}
      </div>
    );
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
}

Game.propTypes = {
  rows: React.PropTypes.number.isRequired,
  columns: React.PropTypes.number.isRequired
};

export default Game;
