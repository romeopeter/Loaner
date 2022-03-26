function form1Validation(formState, setState) {
	const field = { isEmpty: false, errorMessage: null };

	for (let prop in formState) {
		if (formState[prop] === "") {
			if (prop === "dealType" && formState[prop] === "") {
				setState((state) => ({
					...state,
					slide1FieldsAreEmpty: true,
				}));

				field.isEmpty = true;
				field.errorMessage = "Please fill all fields";

				return field;
			}

			if (prop === "guarantor" && formState[prop] === "") {
				setState((state) => ({
					...state,
					slide1FieldsAreEmpty: true,
				}));

				field.isEmpty = true;
				field.errorMessage = "Please fill all fields";

				return field;
			}

			if (prop === "dealName" && formState[prop] === "") {
				setState((state) => ({
					...state,
					slide1FieldsAreEmpty: true,
				}));

				field.isEmpty = true;
				field.errorMessage = "Please fill all fields";

				return field;
			}

			if (prop === "projectName" && formState[prop] === "") {
				setState((state) => ({
					...state,
					slide1FieldsAreEmpty: true,
				}));

				field.isEmpty = true;
				field.errorMessage = "Please fill all fields";

				return field;
			}

			if (prop === "dealOwner" && formState[prop] === "") {
				setState((state) => ({
					...state,
					slide1FieldsAreEmpty: true,
				}));

				field.isEmpty = true;
				field.errorMessage = "Please fill all fields";

				return field;
			}

			if (prop === "dealTeam" && formState[prop] === "") {
				setState((state) => ({
					...state,
					slide1FieldsAreEmpty: true,
				}));

				field.isEmpty = true;
				field.errorMessage = "Please fill all fields";

				return field;
			}
		} else {
			setState((state) => ({
				...state,
				slide1FieldsAreEmpty: false,
			}));

			field.isEmpty = false;
		}
	}

	return field;
}

function form2Validation(formState, setState) {
	const field = { isEmpty: false, errorMessage: null };

	for (let prop in formState) {

		if (prop === "status" && formState[prop] === "") {
			setState((state) => ({ ...state, slide2FieldsAreEmpty: true }));

			field.isEmpty = true;
			field.errorMessage = "Please fill all fields";

			return field;
		}

		if (prop === "trancheName" && formState[prop] === "") {
			setState((state) => ({ ...state, slide2FieldsAreEmpty: true }));

			field.isEmpty = true;
			field.errorMessage = "Please fill all fields";

			return field;
		} else if (typeof formState[prop] === "number") {
			setState((state) => ({ ...state, slide2FieldsAreEmpty: true }));

			field.isEmpty = true;
			field.errorMessage = "Please fill all fields";

			return field;
		}

		if (typeof formState[prop] === "object" && prop === "trancheSize") {
			if (formState[prop]["currency"] === "") {
				setState((state) => ({ ...state, slide2FieldsAreEmpty: true }));

				field.isEmpty = true;
				field.errorMessage = "Please fill all fields";

				return field;
			}

			if (formState[prop]["faceValue"] === "") {
				setState((state) => ({ ...state, slide2FieldsAreEmpty: true }));

				field.isEmpty = true;
				field.errorMessage = "Please fill all fields";

				return field;
			} else if (formState[prop]["faceValue"] === 0) {
				setState((state) => ({ ...state, slide2FieldsAreEmpty: true }));

				field.isEmpty = true;
				field.errorMessage = "Please fill all fields";

				return field
			}

			if (formState[prop]["discountValue"] === "") {
				setState((state) => ({ ...state, slide2FieldsAreEmpty: true }));

				field.isEmpty = true;
				field.errorMessage = "Please fill all fields";

				return field;
			} else if (formState[prop]["discountValue"] === 0) {
				setState((state) => ({ ...state, slide2FieldsAreEmpty: true }));

				field.isEmpty = true;
				field.errorMessage = "Please fill all fields";

				return field;
			}

			if (formState[prop]["minSubscription"] === "") {

				setState((state) => ({ ...state, slide2FieldsAreEmpty: true }));

				field.isEmpty = true;
				field.errorMessage = "Please fill all fields";

				return field;
			}
		}

		if (typeof formState[prop] === "object" && prop === "pricing") {
			if (formState[prop]["dayCount"] === "") {
				setState((state) => ({ ...state, slide2FieldsAreEmpty: false }))

				field.isEmpty = true;
				field.errorMessage = "Please fill all fields";

				return field;
			}

			if (formState[prop]["offerType"]["fixedPrice"] === "") {
				console.log("fixed price")
				setState((state) => ({ ...state, slide2FieldsAreEmpty: false }))

				field.isEmpty = true;
				field.errorMessage = "Please fill all fields";

				return field;
			}
		}

		// Field specific to deal type of bond
		if (prop === "dealType" && formState[prop] === "BOND") {
			if (typeof formState[prop] === "object" && prop === "pricing") {
				if (formState[prop]["couponType"] === "") {

					setState((state) => ({
						...state,
						slide2FieldsAreEmpty: false,
					}));

					field.isEmpty = true;
					field.errorMessage = "Please fill all fields";

					return field;
				} else if (formState[prop]["couponType"] === "floating") {

					if (formState[prop]["benchmark"] === "") {
						setState((state) => ({
						 ...state,
						 slide2FieldsAreEmpty: false,
						}));

						field.isEmpty = true;
						field.errorMessage = "Please fill all fields";

						return field;
					}
				}

				if (formState[prop]["couponFrequency"] === "") {
					setState((state) => ({
						...state,
						slide2FieldsAreEmpty: false,
					}));

					field.isEmpty = true;
					field.errorMessage = "Please fill all fields";

					return field;
				}

				if (formState[prop]["callOption"] === "") {
					setState((state) => ({
					 ...state,
					 slide2FieldsAreEmpty: false,
					}));

					field.isEmpty = true;
					field.errorMessage = "Please fill all fields";

					return field;
				}
			}
		}
	}

	setState(state => ({...state, slide2FieldsAreEmpty: false}));

	return field
}

function form3Validation(formState, setState) {
	const field = { isEmpty: false, errorMessage: null };

	for (let prop in formState) {
		if (typeof formState[prop] === "object" && prop === "timing") {
			return field;
		}

		// Field specific to deal type of bond
		if (formState[prop] === "BOND") {
			if (typeof formState[prop] === "object" && prop === "pricing") {
				if (formState[prop]["couponType"] === "") {
					setState((state) => ({
						...state,
						fieldNotValidated: false,
					}));
					alert.error("Coupon type can not be empty!");

					return field;
				} else if (formState[prop]["couponType"] === "floating") {
					// if (formState[prop]["benchmark"] )
				}
			}
		}
	}

	return field
}

export { form1Validation, form2Validation, form3Validation };