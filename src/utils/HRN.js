export const humanNumber = (value, lang=null) => {
    const locale = lang || document.documentElement.lang || "en";
    const number = Math.round(value);
    return number.toLocaleString(locale);
}