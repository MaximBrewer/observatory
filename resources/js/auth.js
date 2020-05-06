class Auth {
    constructor() {
        this.token = window.localStorage.getItem('token');
        let userData = window.localStorage.getItem('user');
        this.user = userData ? JSON.parse(userData) : null;
        if (this.token) {
            window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.token;
            this.getUser();
        }
    }
    login(token, user) {
        window.localStorage.setItem("token", token);
        window.localStorage.setItem("user", JSON.stringify(user));
        window.axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        this.token = token;
        this.user = user;
        console.log(user);
        // Event.$emit("userLoggedIn");
    }
    getUser() {
        window.api.call("get", "/api/get-user").then(({ data }) => {
            this.user = data.data;
        });
    }
    check() {
        console.log(this.user);
        return !!this.token;
    }
    logout(){
        this.token = null;
        this.user = null;
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("user");
        location.reload();
    }
}
export default Auth;