class Api {
    constructor() {}
    call(requestType, url, data = null) {
        return new Promise((resolve, reject) => {
            window.axios[requestType](url, data)
                .then(response => {
                    resolve(response);
                })
                .catch(err => {
                    if (err.response.status === 401) {
                        window.auth.logout();
                    }
                    reject(err);
                });
        });
    }
}
export default Api;
