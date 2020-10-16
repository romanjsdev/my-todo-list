import React, {Component} from "react";

class Delete extends Component {
  render() {
    let style = {
    	display: this.props.visible ? "block" : "none",
    }

    return (
      <div style={style}>
      	<p>Delete element?</p>
      	<button onClick={this.props.clickHandler} data-action="delete">Yes</button>
      	<button onClick={this.props.clickHandler} data-action="not-delete">No</button>
      </div>
    );
  }
}
export default Delete;