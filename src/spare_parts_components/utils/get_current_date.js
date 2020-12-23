const getCurrentDate = (separator = "      ") => {
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    let hours = newDate.getHours();
    let mintues = newDate.getMinutes();
    let seconds = newDate.getSeconds();
    return `${year}/${
        month < 10 ? `0${month}` : `${month}`
    }/${date}${separator}${hours}:${mintues}:${seconds}`;
};

export default getCurrentDate