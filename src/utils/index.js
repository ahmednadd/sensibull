export const fuzzySearch = (query, string) => {
    // Split the query and string into arrays of characters
    const queryChars = query.split('');
    const stringChars = string.split('');

    // Keep track of the current position in the string and the number of
    // matching characters
    let stringPos = 0;
    let matchCount = 0;

    // Iterate over each character in the query
    for (const queryChar of queryChars) {
        // Try to find the current character in the string
        let found = false;
        for (let i = stringPos; i < stringChars.length; i++) {
            if (stringChars[i] === queryChar) {
                found = true;
                stringPos = i + 1;
                matchCount++;
                break;
            }
        }

        // If the character was not found, there is no match
        if (!found) {
            return false;
        }
    }

    // The number of matching characters must be greater than or equal to
    // the length of the query to be considered a match
    return matchCount >= queryChars.length;
};

export const formattedDate = (item) => {
    let utc = new Date(item);

    // Get the time zone offset from UTC, in minutes
    let offset = utc.getTimezoneOffset();
    let gmt = new Date(utc - offset * 60 * 1000);

    gmt = gmt.toString();
    gmt = new Date(gmt);
    // Extract the date and time information from the Date object
    let year = gmt.getFullYear();
    let month = gmt.getMonth() + 1; // Note: getMonth() returns a zero-based month index
    let day = gmt.getDate();
    let hours = gmt.getHours();
    let minutes = gmt.getMinutes();
    let seconds = gmt.getSeconds();

    month = month.toString().padStart(2, '0');
    day = day.toString().padStart(2, '0');
    hours = hours.toString().padStart(2, '0');
    minutes = minutes.toString().padStart(2, '0');
    seconds = seconds.toString().padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export const getExpiredTime = (item) => {
    // Parse the given time into a Date object
    console.log(item);
    let time = new Date(item);

    // Convert the Date object to a numeric timestamp using the getTime() method
    let timeTimestamp = time.getTime();

    // Get the current time as a numeric timestamp using the Date.now() method
    let nowTimestamp = Date.now();

    // Compare the timestamps to determine if the given time intersects with the current time
    if (timeTimestamp < nowTimestamp) {
        return true;
    } else return false;
};
