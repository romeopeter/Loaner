function cp(formState, currentUser) {
	const data = {
			deal_type: formState.dealType,
			guarantor: formState.guarantor,
			deal_name: formState.dealName,
			project_name: formState.projectName,
			deal_owner: formState.dealOwner,
			deal_team: formState.dealTeam,
			user_id: currentUser ? currentUser.id : "",
			tranche_id: {
				status: formState.status,
				eligible_investors: formState.eligibleInvestors,
				size: {
					minimum_subscription: {
						currency: formState.trancheSize.currency,
						amount: Number(formState.trancheSize.minSubscription).toFixed(2),
					},
					value: {
						face_value: Number(formState.trancheSize.faceValue).toFixed(2),
						discount_value: Number(formState.trancheSize.discountValue).toFixed(2),
						value: formState.trancheSize.parValue
					},
					currency: formState.trancheSize.currency,
					amount: formState.trancheSize.minSubscription
				},
				timing: {
					offer_start: formState.timing.offerStart,
					offer_end: formState.timing.offerEnd,
					allotment_date: formState.timing.allotmentDate,
					settlement_date: formState.timing.settlementDate,
					maturity_date: formState.timing.maturityDate,
					first_coupon_date: null
				},
				ratings: {
					name: formState.rating.name,
					scale: formState.rating.scale,
				},
				offer_type:  formState.pricing.offerType.name,
				name: formState.trancheName,
				use_of_proceeds: formState.useOfProceeds,
				tax_consideration: formState.taxConsideration,
				pricing: {
					day_count: formState.pricing.dayCount,
					coupon_type: formState.pricing.couponType !== "" ? formState.pricing.couponType:null,
					benchmark: formState.pricing.benchmark !== "" ? formState.pricing.benchmark:null,
					coupon_frequency: formState.pricing.couponFrequency !== "" ? formState.pricing.couponFrequency:null,
					call_option: formState.pricing.callOption !== "" ? formState.pricing.callOption:null,
					offer_type: {
						fixed_price: {
							discount_rate: Number(formState.pricing.offerType.fixedPrice.rate).toFixed(3) ,
							implied_yield: Number(formState.pricing.offerType.fixedPrice.yield).toFixed(3) 
						},
					},
				},
			},
		};;

	return data
}

function bond(formState, currentUser) {
	const data = {
			deal_type: formState.dealType,
			guarantor: formState.guarantor,
			deal_name: formState.dealName,
			project_name: formState.projectName,
			deal_owner: formState.dealOwner,
			deal_team: formState.dealTeam,
			user_id: currentUser ? currentUser.id : "",
			tranche_id: {
				status: formState.status,
				eligible_investors: formState.eligibleInvestors,
				size: {
					minimum_subscription: {
						currency: formState.trancheSize.currency,
						amount: formState.trancheSize.minSubscription,
					},
					value: {
						face_value: formState.trancheSize.faceValue,
						discount_value: formState.trancheSize.discountValue,
						value: formState.trancheSize.parValue
					},
					currency: formState.trancheSize.currency,
					amount: formState.trancheSize.minSubscription
				},
				timing: {
					offer_start: formState.timing.offerStart,
					offer_end: formState.timing.offerEnd,
					allotment_date: formState.timing.allotmentDate,
					settlement_date: formState.timing.settlementDate,
					maturity_date: formState.timing.maturityDate,
					first_coupon_date: null
				},
				ratings: {
					name: formState.rating.name,
					scale: formState.rating.scale,
				},
				offer_type:  formState.pricing.offerType.name,
				name: formState.trancheName,
				use_of_proceeds: formState.useOfProceeds,
				tax_consideration: formState.taxConsideration,
				pricing: {
					day_count: formState.pricing.dayCount,
					coupon_type: formState.pricing.couponType !== "" ? formState.pricing.couponType:null,
					benchmark: formState.pricing.benchmark !== "" ? formState.pricing.benchmark:null,
					coupon_frequency: formState.pricing.couponFrequency !== "" ? formState.pricing.couponFrequency:null,
					call_option: formState.pricing.callOption !== "" ? formState.pricing.callOption:null,
					offer_type: {
						book_build: {
							discount_rate_range: Number(formState.pricing.offerType.fixedPrice.rate).toFixed(3) ,
							type_yield: Number(formState.pricing.offerType.fixedPrice.yield).toFixed(3) 
						},
					},
				},
			},
		};;

	return data;
}

export {cp, bond}