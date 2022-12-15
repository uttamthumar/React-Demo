import React from "react";

export default class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "uttam",
      email: "uttam123@gmail.com",
      count: 0,
    };
  }
  updateState() {
    this.setState({
      name: "s",
      count: this.state.count + 1,
    });
  }
  render() {
    return (
      <>
        <h1>
          Hello {this.state.name} , count:{this.state.count}
        </h1>
        <button
          onClick={() => {
            this.updateState();
          }}
        >
          Update name
        </button>
      </>
    );
  }
}
