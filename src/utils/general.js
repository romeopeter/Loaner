// Captilize first letter of a word
function capitalizeFirstLetter(string) {
    return string.CharAt(0).toUpperCase() + string.slice(1);
}

export {capitalizeFirstLetter}