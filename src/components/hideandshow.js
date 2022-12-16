import React from "react";

class Hideandshow extends React.Component {
  constructor(props) {
    console.log("hiiii");
    super(props);
    this.state = {
      show: true,
    };
    console.log("hello");
  }
  render() {
    return (
      <>
        {this.state.show ? <h1>{this.props.name}</h1> : null}
        <button
          onClick={() => {
            this.setState({ show: !this.state.show });
            console.log("this.state.show", !this.state.show);
          }}
        >
          {" "}
          Hello
        </button>
      </>
    );
  }
}
export default Hideandshow;
