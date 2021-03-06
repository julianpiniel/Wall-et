/* eslint-disable */
import React, { useState, useRef } from "react";
//import './register.module.css';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import r from "./register.module.css";
import swal from "sweetalert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import dotenv from "dotenv";
import { confirmRegister } from "../../Redux/Actions/RegisterActions";
import { useDispatch } from "react-redux";
dotenv.config();
const CAPTCHA_KEY = process.env.REACT_APP_CAPTCHA_KEY;

function validate(input) {
	let errors = {};
	if (!input.mail) {
		errors.mail = "Required Email";
	} else if (
		!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
			input.mail
		)
	) {
		errors.mail = "Invalid Email,  Example: wallet@gmail.com";
	}
	if (!input.password) {
		errors.password = "Required Password";
	} else if (
		!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(
			input.password
		)
	) {
		errors.password = "";
	}
	return errors;
}

function Register() {
	const [input, setInput] = useState({
		fullname: "",
		dni: "",
		mail: "",
		password: "",
		confirmpassword: "",
		birth_date: "",
	});
	const [errors, setErrors] = useState({});
	const history = useHistory();
	const [captchaValido, cambiarCaptchaValido] = useState(null);
	const [usuarioValido, cambiarUsuarioValido] = useState(false);
	const captcha = useRef(null);
	const [show, setShow] = useState(false);
	const [showpass2, setShowpass2] = useState(false);
	const dispatch = useDispatch();

	const handleShowHide = () => {
		setShow(!show);
	};
	const handleShowHide2 = () => {
		setShowpass2(!showpass2);
	};

	function handleChange(e) {
		setInput({
			...input,
			[e.target.name]: e.target.value,
		});
		setErrors(
			validate({
				...input,
				[e.target.value]: e.target.value,
			})
		);
	}

	async function handleSubmit(e) {
		e.preventDefault();
		if (
			/^(\d{2}\.{1}\d{3}\.\d{3})|(\d{2}\s{1}\d{3}\s\d{3})$/.test(
				input.dni
			)
		) {
			return swal(
				"ID number must not contain points",
				"You clicked the button!",
				"error"
			);
		}
		if (!/^[0-9]*$/.test(input.dni)) {
			return swal(
				"ID must be a number",
				"You clicked the button!",
				"error"
			);
		}
		if (
			!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
				input.mail
			)
		) {
			return swal("Invalid Email", "You clicked the button!", "error");
		}
		if (
			!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(
				input.password
			)
		) {
			return swal(
				"Password must contain eight characters, an uppercase letter, and a number.",
				"You clicked the button!",
				"error"
			);
		}
		if (input.password !== input.confirmpassword) {
			return swal(
				"Passwords don't match",
				"You clicked the button!",
				"error"
			);
		}
		if (captcha.current.getValue()) {
			cambiarUsuarioValido(true);
			cambiarCaptchaValido(true);
			// try {
			//     await fetch('http://localhost:3001/register',
			//         {
			//             method: 'POST',
			//             headers: { "Content-Type": "application/json" },
			//             body: JSON.stringify(input),
			//         })
			//     swal('Account created succesfully!', "You clicked the button!", "success");
			// } catch (err) {
			//     swal('We could not create account. Please try again.', "You clicked the button!", "error");
			// }
			try {
				await axios.post("/register", JSON.stringify(input), {
					headers: { "Content-Type": "application/json" },
				});
				swal(
					"Account created succesfully!",
					"You clicked the button!",
					"success"
				);
				history.push("/verifyMail");
			} catch (err) {
				console.log(err);
				swal(
					"You already have a account.",
					"You clicked the button!",
					"error"
				);
				history.push("/");
			}
		} else {
			swal(
				"Please accept the captcha",
				"You clicked the button!",
				"warning"
			);
			cambiarUsuarioValido(false);
			cambiarCaptchaValido(false);
		}
	}

	function captchaChange() {
		if (captcha.current.getValue()) {
			cambiarCaptchaValido(true);
		}
	}

	return (
		<div className={r.fondoregister}>
			<div className={r.centrarformulario}>
				<div className={r.formulario}>
					{!usuarioValido && (
						<div className={r.centrar}>
							<h2 className={r.create}> Create your Account </h2>
							<form onSubmit={(e) => handleSubmit(e)}>
								<input
									type="text"
									placeholder="Full Name*"
									id="title"
									required="required"
									name="fullname"
									value={input.fullname}
									onChange={handleChange}
									className={r.inputregister}
								/>

								<div>
									<input
										className={r.inputregister}
										type="text"
										placeholder="E-mail*"
										required="required"
										name="mail"
										value={input.mail}
										onChange={handleChange}
										className={r.inputregister}
									/>
									{errors.mail && (
										<p className={r.errorsRegister}>
											{errors.mail}
										</p>
									)}
								</div>

								<div>
									<input
										className={r.inputregister}
										type={show ? "text" : "password"}
										placeholder="Password*"
										required="required"
										name="password"
										id="password"
										value={input.password}
										onChange={handleChange}
										autoComplete="off"
									/>

									{show ? (
										<FontAwesomeIcon
											onClick={handleShowHide}
											icon={faEye}
											className={r.icon}
											id="show_hide"
										/>
									) : (
										<FontAwesomeIcon
											onClick={handleShowHide}
											icon={faEyeSlash}
											className={r.icon}
											id="show_hide"
										/>
									)}
									<p className={r.passwordWarning}>
										The password must contain eight
										characters, an uppercase letter, and a
										number
									</p>
									{errors.password && (
										<p className={r.errorsRegister}>
											{errors.password}
										</p>
									)}
								</div>
								<div>
									<input
										className={r.inputregister}
										type={showpass2 ? "text" : "password"}
										placeholder="Confirm Password*"
										required="required"
										name="confirmpassword"
										id="confirmpassword"
										value={input.confirmpassword}
										onChange={handleChange}
										autoComplete="off"
									/>

									{showpass2 ? (
										<FontAwesomeIcon
											onClick={handleShowHide2}
											icon={faEye}
											className={r.icon}
											id="show_hide2"
										/>
									) : (
										<FontAwesomeIcon
											onClick={handleShowHide2}
											icon={faEyeSlash}
											className={r.icon}
											id="show_hide2"
										/>
									)}
									{errors.password && (
										<p className={r.errorsRegister}>
											{errors.password}
										</p>
									)}
								</div>

								<input
									type="text"
									placeholder="Identification Number*"
									name="dni"
									required="required"
									value={input.dni}
									onChange={handleChange}
									className={r.inputregister}
									minLength="8"
								/>
								<input
									htmlFor="birthdate"
									className={r.inputregister}
									type="date"
									placeholder="YYYY-MM-DD"
									data-date-split-input="true"
									name="birth_date"
									value={input.birth_date}
									onChange={handleChange}
									required="required"
									min="1900-01-01"
									max="2003-12-31"
								/>

								<div className={r.centerCaptchaRegister}>
									<div className={r.recaptcha}>
										<ReCAPTCHA
											required
											ref={captcha}
											sitekey={CAPTCHA_KEY}
											onChange={captchaChange}
											render="explicit"
										/>
									</div>
								</div>

								{/* {captchaValido === false && <div className="error-captcha">Please accept the captcha</div>} */}
								<button
									type="submit"
									className={r.buttoncreate}
								>
									Create Account
								</button>
							</form>
						</div>
					)}
					<div className={r.descriptionDetails}>
						<div className={r.linksRegister}>
							<div className={r.faq}>
								<Link to="/recoverpassword">
									<p>Forgot Password?</p>
								</Link>
							</div>
							|
							<div className={r.faq}>
								<Link to="/faq">
									<p>Frecuently Asked Questions</p>
								</Link>
							</div>
						</div>
						<div className={r.loginFromRegister}>
							<p className={r.doYouHave}>
								You already have an account?
							</p>
							<div className={r.faq}>
								<Link to="/">
									<p>Log in</p>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className={r.contenedorinferior}>
				<div className={r.contactus}>
					<div className={r.faq}>
						<Link to="/faq">
							<p className={r.faq}>FAQ</p>
						</Link>
					</div>
					<div className={r.letraContactus}>
						<p>
							Contact Us <br></br>+54 411154545444 <br></br>
							wall-et@wmail.com
						</p>
					</div>
					<footer className={r.footer}>
						{" "}
						<p> Copyright?? 2021 Wall-et</p>
					</footer>
				</div>
			</div>
		</div>
	);
}

export default Register;
