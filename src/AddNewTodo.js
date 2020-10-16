import React, {Component} from "react";

class AddNewTodo extends Component {
	constructor(props){
	    super(props);
	    this.state = {name:'', important:false};
	    this.inputChange = this.inputChange.bind(this);
	    this.importantChange = this.importantChange.bind(this);
  }

  inputChange(e){
  	this.setState({...this.state, name:e.target.value});
  }

  importantChange(e){
  	this.setState({...this.state, important:e.target.checked});
  }

  render() {
    let style = {
    	display: this.props.visible ? "block" : "none",
    };

    return (
      <div style={style}>
      	<input placeholder="new todo..." onChange={this.inputChange} value={this.state.name}/>
      	<p><input type="checkbox" name="important" onChange={this.importantChange} checked={this.state.important}/>important</p>
      	<button onClick={()=>{
      			this.props.clickOkHandler(this.state);
      			this.setState({name:"", important:false});
      		}
      	}>Add</button>
      	<button onClick={this.props.clickCancelHandler}>Cancel</button>
      </div>
    );
  }
}
export default AddNewTodo;