import React from 'react'
import {observer } from 'mobx-react'
import {observable } from 'mobx'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import RaisedButton from 'material-ui/RaisedButton'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import {Todo} from './Todo'

const buttonStyle = {
  margin: 12,
};

// This is a React component.
// The property "model" of the passed props object is an instance of our TodoViewModel class.
// do you remember all those @observable and @computed?
// In order to let your React component automatically update whenever any of
// those observable property of an object in the component props update,
// you should pass your component to the "observer" function/decorator
@observer
export class TodoView extends React.Component{

    render(){
         console.log('TodoView render');
        const model = this.props.model
        // just some HTML markup based of the ViewModel data.
        return <MuiThemeProvider>
        <div>
        <h1>React & MobX Todo List!</h1>
        <div>
        <RaisedButton onClick={() => model.add()}  primary={true} style={buttonStyle} label="New" />
        <RaisedButton onClick={() => model.load()} secondary={true} style={buttonStyle} label="Load" />
        <RaisedButton onClick={() => model.save()} style={buttonStyle} label="Save" />
        </div>
        <Table>
        <TableHeader displaySelectAll={false}>
        <TableRow>
        <TableHeaderColumn>Done?</TableHeaderColumn>
        <TableHeaderColumn>ID</TableHeaderColumn>
        <TableHeaderColumn>Name</TableHeaderColumn>
        <TableHeaderColumn>Actions</TableHeaderColumn>
        </TableRow>
        </TableHeader>
        <TableBody>
        {model.todos.map((todo, i) => <SingleTodoView key={todo.id} model={model} todo={todo} />)}
        </TableBody>
        </Table>
        </div>
        </MuiThemeProvider>
    }
}

    // // Since putting observer only on the TodoView will result in re-rendering all the todos
    // // any time a single todo is updated, we create a subcomponent that handles the editing for a single todo
    // // and decorate it with observer. This way updates in the single todo will result in an update of the SingleTodoView.
    @observer
    export class SingleTodoView extends React.Component {
        @observable todo = null;

        constructor(props) {
            super(props);
             this.todo =Todo.deserialize(this.props.todo.serialize());
        }

       componentDidMount() {
           document.getElementById(this.props.todo.id).value = this.todo.text;
           document.getElementById('tablerow').striped = this.todo.done;
           document.getElementById('checkbox').checked= this.todo.done;
       }

       //  for if have the btn to update the todo at onces instead of use onCheck or onChange to change parameter of todo
        updateProps() {
                this.props.model.changeTodo(this.props.todo,this.todo);
       }

       render(){
            const model = this.props.model;
            var id = ""+ this.todo.id;
            console.log('SingleTodoView render shouldn\'t been called when todo change');
            return <TableRow id='tablerow' displayBorder={false}>
            <TableRowColumn>
            <Checkbox id='checkbox' onCheck={e => {
                   this.todo.done = e.target.checked;
                   this.updateProps();
            }} />
            </TableRowColumn>
            <TableRowColumn>
            #{id}
            </TableRowColumn>
            <TableRowColumn>
            <TextField id= {id} name="text" type="text"  onChange={e => {
                this.todo.text =  e.target.value;   
                 this.updateProps();
            }} />

            </TableRowColumn>
            <TableRowColumn>
            <RaisedButton onClick={() => {}} label="Delete" />
            </TableRowColumn>
            </TableRow>
        }
}