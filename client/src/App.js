import { Route } from "react-router-dom";
import Home from "./Components/Home/home";
/* import Loging from './Components/loging/index'; */
import Register from "./Components/Register/register";
import FrecuentlyQuestions from "./Components/FrecuentlyQuestions/frecuentlyquestions";
import Balance from "./Components/Balance_2/Balance";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import Logout from "./utils/Logout";
import Landingpage from "./Components/LandingPage/landingpage";
import Account from "./Components/Account/Account";
import Contacts from "./Components/Contacts/Contacts";
import Transfer from "./Components/Transfer/index";
import Help from "./Components/Help/Help";
import ResetPassword from "./Components/RecoverPassword/resetPassword";
import RecoverPassword from "./Components/RecoverPassword/password";
import Verify from "./utils/Verify";
import checkMail from "./Components/Register/checkMail";
import Card from "./Components/Wall-etCard/Card";
import HelperBot from "./Components/Helper/HelperBot";
import PublicRoute from "./Components/PublicRoute/PublicRoute";
import FaceView from "./Components/FaceRecognition/FaceView";
import LoginFace from "./Components/FaceRecognition/LoginFace/LoginFace";


// CSS hecho por:
// Cami y Celes: /register y /home
// Gonza: NavBar
// Franco: mywallet

export default function App() {
	return (
		<div>
			<PublicRoute exact path="/" component={Landingpage} />
			<PublicRoute exact path="/register" component={Register} />
			<Route exact path="/recoverpassword" component={RecoverPassword} />
			<Route exact path="/faq" component={FrecuentlyQuestions} />
			<Route exact path="/loginface" component={LoginFace}/>
			<Route exact path="/logout" component={Logout} />
			<PrivateRoute path="/face" component={FaceView} exact />
			<PrivateRoute path="/account" component={Account} exact />
			<PrivateRoute exact path="/contacts" component={Contacts} />
			<PrivateRoute path="/transfers/:section" component={Transfer} />
			<PrivateRoute exact path="/help/form" component={Help} />
			<PrivateRoute path="/mywallet" component={Home} exact />
			<PrivateRoute path="/balance" component={Balance} exact />
			<PrivateRoute exact path="/walletCard" component={Card} />
			<PrivateRoute exact path="/help" component={HelperBot} />
			<Route
				exact
				path="/resetPassword/:userid"
				component={ResetPassword}
			/>

			

		</div>
	);
}
