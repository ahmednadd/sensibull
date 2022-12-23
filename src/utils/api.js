const apiGetHelper = async ({ url }, isCsv) => {
    try {
        let headers = {
            'Content-type': isCsv ? 'text/csv;charset=UTF-8' : 'application/json; charset=UTF-8'
        };
        const responseData = await fetch(url, {
            method: 'GET',
            headers
        });
        return isCsv ? responseData.text() : responseData.json();
    } catch (e) {
        return e || {};
    }
};

export const getReq = (req, isCsv) => {
    const response = apiGetHelper(req, isCsv);
    return response;
};
