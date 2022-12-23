const apiGetHelper = async ({ url }) => {
    try {
        let headers = {
            'content-type': 'text/csv;charset=UTF-8'
        };
        const responseData = await fetch(url, {
            method: 'GET',
            headers
        });
        return responseData.text();
    } catch (e) {
        return e || {};
    }
};

export const getReq = (req) => {
    const response = apiGetHelper(req);
    console.log(response);
    return response;
};
