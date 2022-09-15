const createOfferStateInit = {
  dealType: "",
  guarantor: "",
  dealName: "",
  projectName: "",
  dealOwner: "",
  dealTeam: "",
  dealDescription: "",
  status: "",
  trancheName: "",
  trancheSize: {
    currency: "NGN",
    value: "",
    faceValue: "",
    discountValue: "",
    parValue: 1000,
    minSubscription: "",
  },
  pricing: {
    dayCount: "",
    couponType: "",
    benchmark: "",
    couponFrequency: "",
    callOption: "",
    offerType: {
      name: "",
      fixedPrice: {
        rate: "", // Can be discount rate or rate range
        yield: "", // Can be implied yield or yield type
      },
    },
  },
  timing: {
    offerStart: "",
    offerEnd: "",
    allotmentDate: "",
    settlementDate: "",
    maturityDate: "",
  },
  useOfProceeds: "",
  taxConsideration: "",
  eligibleInvestors: "",
  rating: {
    name: "",
    scale: "",
  },
};

function createOfferReducer(state, action) {
  switch (action.type) {
    case "THE_ACTION_TYPE":
      return {
        ...state,
      };
    default:
      throw new Error("Invalid action type");
  }
}

export { createOfferStateInit, createOfferReducer };
