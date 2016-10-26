// import needed libraries
import React from 'react'
import {render} from 'react-dom'
import TextField from 'material-ui/TextField'
// import the view and the viewModel
import {TodoView} from './TodoView.material'
import {TodoViewModel} from './TodoViewModel'

import injectTapEventPlugin from 'react-tap-event-plugin'
import {observer,inject,Provider} from 'mobx-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
// Needed for onTouchTap by material-ui
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// create a viewModel singleton
const model = new TodoViewModel();



// render the editor
render(
	<MuiThemeProvider>
		<div> 
			<TextField  name="text" type="text" />
			<TodoView model={model} /> 
		</div>
	</MuiThemeProvider>
, document.getElementById('root'))




// inject test
// var e = React.createElement;
//  var C = inject(
//             function(stores, props, context) {
//                 return {
//                     zoom: stores.foo,
//                     baz: props.baz * 2
//                 }
//             }
//         )(observer(React.createClass({
//             render: function() {
//                 return e("div", {}, "context:" + this.props.zoom + this.props.baz);
//             }
//         })));

//         var B = React.createClass({
//             render: function() {
//                 return e(C, { baz: 42 });
//             }
//         });

// var A = React.createClass({
//     render: function() {
//         return e(Provider, { foo1: "bar"}, e(B, {}))
//     }
// })
