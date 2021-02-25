import {React} from 'react';
import {Route, Switch} from 'react-router-dom'
import Calendar from './Calendar';
import {Provider} from 'react-redux';
import store from '../Redux/Store';
import Nav from './Nav'
import '../Scss/app.scss';
import WeatherContainer from './WeatherContainer';
import Login from './Login/Login';
import Register from './Login/Register';


function App() {


  return (
    <Provider store ={store}>
    <div className="App">
      <Nav/>
      <Switch>
        <Route exact path = "/login" component = {Login} />
        <Route exact path = "/register" component = {Register} />
      <Route path = "/weather" component = {WeatherContainer}/>
      <Route path = "/calendar" component = {Calendar}/>
      </Switch>
    </div>
    </Provider>
  );
}

export default App;