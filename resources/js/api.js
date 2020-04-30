class Api {
    constructor() {}
    call(requestType, url, data = null) {
        return new Promise((resolve, reject) => {
            window.axios[requestType](url, data)
                .then(response => {
                    resolve(response);
                })
                .catch(response => {
                    if (response.status === 401) {
                        window.auth.logout();
                    }
                    reject(response);
                });
        });
    }
}
export default Api;
