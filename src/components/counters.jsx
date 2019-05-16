import React, { Component } from "react";
import Counter from "./counter";
class Counters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counters: [
        { id: 1, value: 0, productName: "Shoes" },
        { id: 2, value: 1, productName: "Books" },
        { id: 3, value: 2, productName: "IPhone X" },
        { id: 4, value: 0, productName: "Samsung Galaxy Note" }
      ]
    };
  }
  render() {
    return (
      <div>
        <button
          className="btn btn-primary btn-sm m-2"
          onClick={this.handleReset}
        >
          Reset
        </button>
        {this.state.counters.map(counter => (
          <Counter
            key={counter.id}
            onDelete={this.handleDelete}
            onIncreement={this.handleIncreement}
            counter={counter}
          >
            <h1>{counter.productName}</h1>
          </Counter>
        ))}
      </div>
    );
  }

  handleDelete = counter => {
    if (counter) {
      const counters = this.state.counters.filter(c => c.id !== counter.id);
      this.setState({ counters });
    }
  };

  handleReset = () => {
    const counters = this.state.counters.map(c => {
      c.value = 0;
      return c;
    });
    this.setState({ counters });
  };

  handleIncreement = counter => {
    debugger;
    const counters = [...this.state.counters];
    counters[counter.id - 1].value++;
    this.setState({ counters });
  };
}

export default Counters;
