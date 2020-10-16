import React, {Component} from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import All from "./All";
import Important from "./Important";
import Active from "./Active";
import Delete from "./Delete";
import AddNewTodo from "./AddNewTodo";

let todoList =[];

class Main extends Component {
  constructor(props){
    super(props);
    this.state = {list:todoList, deleteWindowIsVisible:false, addNewTodoWindowIsVisible:false};
    this.filteredList = this.filteredList.bind(this);
    this.click = this.click.bind(this);
    this.clickDelete = this.clickDelete.bind(this);
    this.showAddNewTodoWindow =this.showAddNewTodoWindow.bind(this);
    this.clickCancel = this.clickCancel.bind(this);
    this.clickOk = this.clickOk.bind(this);
 //   this.saveToLocalStorage = this.saveToLocalStorage.bind(this);
    this.getFromLocalStorage = this.getFromLocalStorage.bind(this);
  }

  componentDidMount() {
    this.getFromLocalStorage();
  }

  filteredList(e){
      let list = todoList;
      let filteredList = list.filter(todo=>todo.name.toLowerCase().search(e.target.value.toLowerCase()) !== -1);
      this.setState({...this.state, list: filteredList});
  }

  click(e){
    e.preventDefault();

    switch(e.target.dataset.action){
      case('done'):
      let a = todoList.findIndex((elem,index)=> elem.id==e.target.dataset.id);
        todoList[a].active = !todoList[a].active;
        this.setState({...this.state, list:todoList, deleteWindowIsVisible:false});
        break;
      case('important'):
        let b = todoList.findIndex((elem,index)=> elem.id==e.target.dataset.id);
        todoList[b].important = !todoList[b].important;
        this.setState({...this.state, list:todoList, deleteWindowIsVisible:false});
        break;
      case('delete'): 
        this.setState({...this.state, deleteWindowIsVisible: true, deleteElementId:e.target.dataset.id});
        break;
    }
  }
  clickDelete(e){
      switch(e.target.dataset.action){
        case('delete'):
          let c = todoList.findIndex((elem,index)=> elem.id==this.state.deleteElementId);
          todoList.splice(c,1);
          this.saveToLocalStorage(todoList);
          this.setState({...this.state, list:todoList, deleteWindowIsVisible: false});
          break;
        case('not-delete'):
          this.setState({...this.state, deleteWindowIsVisible: false});
          break;
        }
  }

  showAddNewTodoWindow(){
    this.setState({...this.state, addNewTodoWindowIsVisible:true});
  }

  clickCancel(e){
    this.setState({...this.state, addNewTodoWindowIsVisible:false});
  }

  clickOk(value){
    if(value.name === ""){
      alert("input a todo...");
    } else{
      let id = new Date();
      let newTodo ={name:value.name, important:value.important, active:true, id:id.getTime()};
      todoList.unshift(newTodo);
      this.saveToLocalStorage(todoList);
      this.setState({...this.state, addNewTodoWindowIsVisible:false, list:todoList});
    }
  }

  saveToLocalStorage(list){
    localStorage.clear();
    console.log(list);
    for(let i=0; i<list.length; i++){
      localStorage[list[i].id]= JSON.stringify({name: list[i].name, important:list[i].important, active:list[i].active});
    }
  }

  getFromLocalStorage(){
    let arr = [];
    for(let i=0; i<localStorage.length; i++){
      let key = localStorage.key(i);
      let t = JSON.parse(localStorage[key]);
      t.id = key;
      arr.push(t);
    }
    todoList = arr;
    this.setState({...this.state, list:todoList, addNewTodoWindowIsVisible:false});
  }

  render() {
    return (
      <div>
       <AddNewTodo visible={this.state.addNewTodoWindowIsVisible} clickCancelHandler={this.clickCancel} 
       clickOkHandler={this.clickOk}/> 
       <Delete visible={this.state.deleteWindowIsVisible} clickHandler={this.clickDelete}/>
        <h1>ToDo List</h1>
        <input placeholder="Search" onChange={this.filteredList}/>
        <button onClick={this.showAddNewTodoWindow}>Add new todos</button>
        <HashRouter>
        <div>
          <ul className="header">
            <li><NavLink exact to="/">All</NavLink></li>
            <li><NavLink to="/important">Important</NavLink></li>
            <li><NavLink to="/active">Active</NavLink></li>
          </ul>
          <div className="content">
            <Route exact path="/"><All clickHandler={this.click} list={this.state.list}/></Route>
              <Route path="/important"><Important clickHandler={this.click} list={this.state.list}/></Route>
              <Route path="/active"><Active clickHandler={this.click} list={this.state.list}/></Route>
            </div>
          </div>
        </HashRouter>
      </div>
    );
  }
}
export default Main;