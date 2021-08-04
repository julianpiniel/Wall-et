/* import logo from "./logo.svg"; */
import "./App.css";
import { Route } from "react-router-dom";
import Home from "./Componets/Home/index";
import Loging from './Componets/loging/index';
import Register from './Componets/Register/register';
import RecoverPassword from './Componets/RecoverPassword/recoverpassword';
import FrecuentlyQuestions from './Componets/FrecuentlyQuestions/frecuentlyquestions';

function App() {
  return (
    <div className="App">
    <Route exact path="/home"><Loging/></Route> 
    <Route exact path="/mywallet"><Home/></Route>
    {/* <Route exact path ="/balance"> <Mybalance/></Route> */}
    <Route exact path="/register"><Register/></Route> 
    <Route exact path="/recoverpassword"><RecoverPassword/></Route> 
    <Route exact path="/faq"><FrecuentlyQuestions /></Route> 
  </div>
  );
}

export default App;
