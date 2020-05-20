class Auth {
    constructor() {
        this.token = window.localStorage.getItem('token');
        if (this.token) {
            window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.token;
        }
    }
    login(token) {
        window.localStorage.setItem("token", token);
        window.axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        this.token = token;
        // Event.$emit("userLoggedIn");
    }
    check() {
        return !!this.token;
    }
    logout(){
        this.token = null;
        window.localStorage.removeItem("token");
        location.reload();
    }
}
export default Auth;