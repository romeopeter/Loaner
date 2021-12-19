const setBgImage = (name) => {
	return {
		backgroundImage: `url(${name})`,
		backgroundRepeat: "no-repeat",
	};
};

export default setBgImage;