import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import EntryForm from './components/EntryForm';

const Routes = () => {
  return (
	<Router>
		<Switch>
			<Route path="/:id" children={<EntryForm/>}/>
			<Route path="/newEntry" children={<EntryForm/>}/>
			<Route path="/" component={Dashboard}/>
		</Switch>
	</Router>
  );
};

export default Routes;