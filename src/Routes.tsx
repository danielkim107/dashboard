import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './components/page/Dashboard';
import Home from './components/page/Home';
import LoginForm from './components/form/LoginForm';
import SlotForm from './components/form/SlotForm';
import StudentForm from './components/form/StudentForm';
import TeacherSignUpForm from './components/form/TeacherSignupForm';

const Routes = () => {
  return (
	<Router>
		<Switch>
			<Route path="/slot/:id" children={<SlotForm/>}/>
			<Route path="/student/:id" component={StudentForm}/>
			<Route path="/newStudent" component={StudentForm}/>
			<Route path="/newTeacher" component={TeacherSignUpForm}/>
			<Route path="/login" component={LoginForm}/>
			<Route path="/dashboard" component={Dashboard}/>
			<Route path="/" component={Home}/>
		</Switch>
	</Router>
  );
};

export default Routes;