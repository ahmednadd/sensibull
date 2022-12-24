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
