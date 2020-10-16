import React, {Component} from "react";

class Important extends Component {
  render() {
    let todoList = [];
    let arr = this.props.list.filter(todo=>todo.important);

    for(let i=0; i<arr.length;i++){
      let style = ' ';
      arr[i].active ? style = "": style = "done "; 
      arr[i].important ? style = style + "important" : style = style;
       todoList.push(<li 
          key={i} onClick={this.props.clickHandler}>
          <span data-id={arr[i].id} data-action="done" className={style}>{arr[i].name}</span>
          <button data-id={arr[i].id} data-action="important">!</button>
          <button data-id={arr[i].id} data-action="delete">X</button>
        </li>);
    }

    return (
      <div>
      <ul>
       {todoList.length>0?todoList:'opps!'}
       </ul>
      </div>
    );
  }
}
export default Important;