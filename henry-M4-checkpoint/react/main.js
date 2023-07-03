import React from 'react';
import ReactDOM from 'react-dom';
import Inbox from './components/Inbox';
import NewMessageForm from './components/NewMessageForm';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

/* Para que puedas visualizar todo, vas a necesitar darle data similar a cada componente que cada test le da al componente */

ReactDOM.render(
	<Router>
  	<div>
  		<Link to="/inbox">
  			<button>Inbox</button>
  		</Link>
  		<Link to="/newMessage">
  			<button>New Message</button>
  		</Link>
  	</div>
  	<Route path="/inbox" component={Inbox} />
  	<Route path="/newMessage" component={NewMessageForm} />
  </Router>,
  document.getElementById('app')
);