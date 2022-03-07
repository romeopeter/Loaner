import React, { useState, createRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";

import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

import Button from "../Button";

export default function Form( props ) {
	const [state, setState] = useState({
		finalFormIsSlidedIn: false,
		buttonIsDisabled: true,
		termsAndConditionsIsChecked: false,
	});

	const { form, setForm } = props.formState;
	const {phoneNumber, setPhoneNumber} = props.phoneNumberState
	const {formError, setFormError} = props.setFormErrorState

	// Alerts
	const alert = useAlert()

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

		setForm(state => {
			return {
				...state,
				registerContainerIsExtended: true
			}	
		})
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

		setForm(state => {
			return {
				...state,
				registerContainerIsExtended: false
			}	
		})
	};

	
	// OnChange handler
	const handleChange = (e) => {
		const target = e.target;
		const name = target.name;

		const value =
			target.type === "checkbox" ? target.checked : target.value;

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

						<option value="Mr.">Mr</option>
						<option value="Miss">Miss</option>
						<option value="Mrs.">Mrs</option>
						{/*<option value="Ms">Ms</option>*/}
						{/*<option value="Dr.">Dr</option>
						<option value="Other">Other</option>*/}
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

				<div className="col-span-12 grid grid-cols-2 gap-4">

					<div className="col-span-1">
						<select
							type="text"
							name="role"
							value={form.role}
							id="role"
							className="mt-1 focus:ring-white block w-full sm:text-sm bg-gray-300 form-field"
							required
							onChange={(e) => handleChange(e)}
						>
							<option defaultValue="">Select role</option>
							<option defaultValue="">Client</option>
							<option defaultValue="">Broker</option>
							<option defaultValue="">Investor</option>
						</select>
					</div>

					<div className="col-span-1">
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

					<div className="col-span-2 text-right">
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
							// required
						/>
					</div>
				</div>

				<div className="col-span-12">
					<input
						// type="text"
						type="date"
						id="data-of-birth"
						name="dateOfBirth"
						value={form.dateOfBirth}
						autoComplete="date-of-birth"
						placeholder="Date of birth (MM/DD/YYYY)"
						className="mt-1 focus:ring-white block w-full sm:text-sm bg-gray-300 form-field"
						// onFocus={(e) => (e.target.type = "date")}
						// onBlur={(e) => (e.target.type = "text")}
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
							placeholder="Password"
							className="mt-1 focus:ring-white block w-full sm:text-sm bg-gray-300 form-field"
							// required
							onChange={(e) => handleChange(e)}
						/>
					</div>

					<div className="col-span-1">
						<input
							type="password"
							id="confirm-password"
							name="confirmPassword"
							value={form.confirmPassword}
							placeholder="Confirm password"
							className="mt-1 focus:ring-white block w-full sm:text-sm bg-gray-300 form-field"
							// required
							onChange={(e) => handleChange(e)}
						/>
					</div>
				</div>

				<div className="col-span-12">
					<div className="flex items-start">
						<div className="flex items-center h-5">
							<input
								id="terms-and-conditions"
								name="termsAndConditionsIsChecked"
								type="checkbox"
								className="focus:ring-white h-4 w-4 text-indigo-600 border-black rounded"
								required
								onChange={(e) =>
									handleChange(e)
								}
							/>
						</div>
						<div className="ml-3 text-sm">
							<label
								htmlFor="terms-and-conditions"
								className="font-medium text-black"
							>
								By signing up, you agree to
							</label>{" "}
							<Link to="/">
								Orderbook’s Terms of Use &
								Privacy Policy
							</Link>
						</div>
					</div>
				</div>

				<div className="col-span-12 text-left">
					<Button
						title="Previous"
						id="previous-field-button"
						buttonClass="form-slide-button text-white bg-blue-600"
						handleClick={slideFinalFormOut}
					/>
				</div>
			</div>
		</>
	);
}