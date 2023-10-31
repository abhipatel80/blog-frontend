export const dateFormat = (date) => {
    const dateOptions = {
        day: "numeric",
        month: 'long',
        year: "numeric"
    };
    return new Date(date).toLocaleDateString("en-US", dateOptions)
};