import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import EntryForm from './components/EntryForm';
import Home from './components/Home';
import LoginForm from './components/LoginForm';
import SlotForm from './components/SlotForm';
import TeacherSignUpForm from './components/teacher/TeacherSignupForm';
import UserForm from './components/UserForm';

const Routes = () => {
  return (
	<Router>
		<Switch>
			<Route path="/slot/:id" children={<SlotForm/>}/>
			<Route path="/slot/newSlot" children={<SlotForm/>}/>
			<Route path="/entry/:id" children={<EntryForm/>}/>
			<Route path="/entry/newEntry" children={<EntryForm/>}/>
			<Route path="/user/newUser" children={<UserForm/>}/>
			<Route path="/newTeacher" component={TeacherSignUpForm}/>
			<Route path="/login" children={<LoginForm/>}/>
			<Route path="/dashboard" component={Dashboard}/>
			<Route path="/" component={Home}/>
		</Switch>
	</Router>
  );
};

export default Routes;