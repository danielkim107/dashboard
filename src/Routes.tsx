import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import EntryForm from './components/EntryForm';
import LoginForm from './components/LoginForm';
import UserForm from './components/UserForm';

const Routes = () => {
  return (
	<Router>
		<Switch>
			<Route path="/entry/:id" children={<EntryForm/>}/>
			<Route path="/entry/newEntry" children={<EntryForm/>}/>
			<Route path="/user/newUser" children={<UserForm/>}/>
			<Route path="/login" children={<LoginForm/>}/>
			<Route path="/" component={Dashboard}/>
		</Switch>
	</Router>
  );
};

export default Routes;