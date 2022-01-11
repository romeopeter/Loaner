import React, { useState, createRef } from "react";
import { useSelector } from "react-redux";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';


import Alert from '@mui/material/Alert';

import Button from "../Button";

export default function Form( props ) {
	const [state, setState] = useState({
		finalFormIsSlidedIn: false,
		buttonIsDisabled: true,
		termsAndConditionsIsChecked: false,
	});

	const { form, setForm } = props.formState;
	const {phoneNumber, setPhoneNumber} = props.phoneNumberState
	const {formErrors, setFormErrors} = props.setFormErrorState

	const { password: passwordMessage } = useSelector((state) => state.message.client);

	// Form steps slide through
	let finalFormStepRef = createRef();

	let slideFinalFormIn = () => {
		finalFormStepRef.current.style.left = "0px";
		finalFormStepRef.current.style.visibility = "visible";
		finalFormStepRef.current.style.transition = "all 200ms ease-in";

		setState((state) => {
			return {
				...state,
				finalFormIsSlidedIn: true,
				buttonIsDisabled: false,
			};
		});
	};

	let slideFinalFormOut = () => {
		finalFormStepRef.current.style.left = "700px";
		finalFormStepRef.current.style.visibility = "hidden";
		finalFormStepRef.current.style.transition = "all 200ms ease-in";

		setState((state) => {
			return {
				...state,
				finalFormIsSlidedIn: false,
				buttonIsDisabled: true,
			};
		});
	};

	const validateEmail = (email) => {
		const emailRE = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		if (!emailRE.test(String(emailRE).toLowerCase())) {
			setFormErrors(state => ({
				...state,
				emailAddress: "Email is invalid"
			}));
			return
		} 

		setFormErrors({ email: "" });
	};

	// Phone number validation
	const validatePassword = (password) => {
		if (password.length < 6) {
			setFormErrors(state => ({
				...state,
				password: "Password must have at least 6 characters"
			}))
			return
		}

		setFormErrors({ password: "" });
	};

	// OnChange handler
	const handleChange = (e) => {
		const target = e.target;
		const name = target.name;

		const value =
			target.type === "checkbox" ? target.checked : target.value;

		if (name === "emailAddress") {
			validateEmail(value);
		}

		if (name === "password") {
			validatePassword(value)
		}

		setForm((state) => {
			return {
				...state,
				[name]: value,
			};
		});
	};

	return (
		<>
			{/*Registration -- First step*/}
			<div
				id="first-step-fields"
				className="col-span-12 grid grid-cols-1 gap-4"
			>
				<div className="col-span-12">
					<select
						id="title"
						name="title"
						autoComplete="title"
						className="mt-1 focus:ring-white block w-full sm:text-sm bg-gray-300 form-field"
						value={form.value}
						onChange={(e) => handleChange(e)}
					>
						<option defaultValue="Select title">
							Select title
						</option>

						<option value="Mr">Mr</option>
						<option value="Miss">Miss</option>
						<option value="Mrs">Mrs</option>
						<option value="Ms">Ms</option>

						<option value="Dr">Dr</option>
						<option value="Other">Other</option>
					</select>
				</div>

				<div className="col-span-12 grid grid-cols-2 gap-4">
					<div className="col-span-1">
						<input
							type="text"
							name="firstName"
							value={form.firstName}
							id="first-name"
							autoComplete="first-name"
							placeholder="First name"
							className="mt-1 focus:ring-white block w-full sm:text-sm bg-gray-300 form-field"
							onChange={(e) => handleChange(e)}
						/>
					</div>

					<div className="col-span-1">
						<input
							type="text"
							name="lastName"
							value={form.lastName}
							id="last-name"
							autoComplete="last-name"
							placeholder="Last name"
							className="mt-1 focus:ring-white block w-full sm:text-sm bg-gray-300 form-field"
							onChange={(e) => handleChange(e)}
						/>
					</div>
				</div>

				<div className="col-span-12">
					<input
						type="text"
						name="emailAddress"
						value={form.emailAddress}
						id="email-address"
						autoComplete="email"
						placeholder="Email address"
						className="mt-1 focus:ring-white block w-full sm:text-sm bg-gray-300 form-field"
						required
						onChange={(e) => handleChange(e)}
					/>
				</div>

				<div className="col-span-12 text-right">
					<Button
						id="next-field-button"
						title="Next"
						buttonClass={`form-slide-button text-white bg-gray-400 rounded mt-2 ${
							form.finalFormIsSlidedIn ? "hidden" : ""
						}`}
						handleClick={slideFinalFormIn}
					/>
				</div>
			</div>

			{/*Registration -- Final step*/}
			<div
				id="final-step-fields"
				className="grid gap-4 bg-white"
				ref={finalFormStepRef}
			>
				<div className="col-span-12">
					<div className="mt-1 focus:ring-white block w-full sm:text-sm bg-gray-300 p-2">
						<PhoneInput
							international
							defaultCountry="NG"
							value={phoneNumber}
							autoComplete="phone-number"
							placeholder="Enter phone number"
							onChange={setPhoneNumber}
							required
						/>
					</div>
				</div>

				<div className="col-span-12">
					<input
						type="text"
						id="data-of-birth"
						name="dateOfBirth"
						value={form.dateOfBirth}
						autoComplete="date-of-birth"
						placeholder="Date of birth (MM/DD/YYYY)"
						className="mt-1 focus:ring-white block w-full sm:text-sm bg-gray-300 form-field"
						onFocus={(e) => (e.target.type = "date")}
						onBlur={(e) => (e.target.type = "text")}
						onChange={(e) => handleChange(e)}
					/>
				</div>

				<div className="col-span-12">
					<input
						type="text"
						id="organization"
						name="organization"
						value={form.organization}
						autoComplete="organization"
						placeholder="Organization/Company"
						className="mt-1 focus:ring-white block w-full sm:text-sm bg-gray-300 form-field"
						onChange={(e) => handleChange(e)}
					/>
				</div>

				<div className="col-span-12 grid grid-cols-2 gap-4">
					<div className="col-span-1">
						<input
							type="password"
							id="password"
							name="password"
							value={form.password}
							autoComplete="password"
							placeholder="Password"
							className="mt-1 focus:ring-white block w-full sm:text-sm bg-gray-300 form-field"
							required
							onChange={(e) => handleChange(e)}
						/>
					</div>

					<div className="col-span-1">
						<input
							type="password"
							id="confirm-password"
							name="confirmPassword"
							value={form.confirmPassword}
							autoComplete="confirm-password"
							placeholder="Confirm password"
							className="mt-1 focus:ring-white block w-full sm:text-sm bg-gray-300 form-field"
							required
							onChange={(e) => handleChange(e)}
						/>
					</div>
				</div>

				{/**** Start Alerts and error notifications ****/}

				<div className="col-span-12">
					{/*Password mistmatch*/}
					{passwordMessage !== "" ? (
						
						<Alert variant="outlined" severity="error">
		        			{passwordMessage}
		      		    </Alert>	
			      	): ""}
		      	</div>

				<div className="col-span-12">
					{/*Minimum character check*/}
					{formErrors.password !== "" ? (
						<Alert variant="outlined" severity="info">
			        		{formErrors.password}!
			     	    </Alert>
					):""}
				</div>

				{/**** End Alerts and error notifications ****/}

				<div className="col-span-12 text-left">
					<Button
						title="Previous"
						id="previous-field-button"
						buttonClass="form-slide-button text-white bg-gray-400 rounded"
						slide={slideFinalFormOut}
					/>
				</div>
			</div>
		</>
	);
}