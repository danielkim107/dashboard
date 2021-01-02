import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import EntryForm from './components/EntryForm';
import Home from './components/Home';
import LoginForm from './components/LoginForm';
import SlotForm from './components/SlotForm';
import StudentForm from './components/student/StudentForm';
import TeacherSignUpForm from './components/teacher/TeacherSignupForm';

const Routes = () => {
  return (
	<Router>
		<Switch>
			<Route path="/slot/:id" children={<SlotForm/>}/>
			<Route path="/slot/newSlot" children={<SlotForm/>}/>
			<Route path="/entry/:id" children={<EntryForm/>}/>
			<Route path="/entry/newEntry" children={<EntryForm/>}/>
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