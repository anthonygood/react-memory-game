import Game from "./game";

class Container extends React.Component {
  render() {
    return (
      <Game rows={5} columns={5} activeCellsCount={6} />
    );
  }
}

export default Container;
