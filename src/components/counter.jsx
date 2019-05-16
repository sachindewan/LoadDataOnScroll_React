import React, { Component } from "react";
class Counter extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    //console.log("props", this.props);
    return (
      <div>
        <span>{this.props.children}</span>
        {/* <img src={this.state.imageUrl} alt="" /> */}
        <span className={this.getBadgeClasses()}>{this.formatCounter()} </span>
        <button
          onClick={() => this.props.onIncreement(this.props.counter)}
          className="btn btn-secondary btn-sm"
        >
          Increement
        </button>
        <button
          className="btn btn-danger btn-sm m-2"
          onClick={() => this.props.onDelete(this.props.counter)}
        >
          Delete
        </button>
      </div>
    );
  }

  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    return (classes += this.props.counter.value === 0 ? "warning" : "primary");
  }

  formatCounter() {
    const { value } = this.props.counter;
    return value === 0 ? "Zero" : value;
  }
}

export default Counter;
