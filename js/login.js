const uuid = "";
const apiPath = 'https://course-ec-api.hexschool.io/api/';

new Vue({
    el: ".login_wrap",
    data() {
        return {
            user: {
                email: '',
                password: '',
            },
            token: ''
        };
    },
    methods: {
        signIn() {
            const api = `${apiPath}auth/login`;
            axios.post(api, this.user)
                .then((response) => {
                    
                    const token = response.data.token;
                    const expired = response.data.expired;
                    document.cookie = `token=${token}; expires=${new Date(expired * 1000)}; path=/`;
                    document.cookie = `token=${token}; expires=${new Date(expired * 1000)}; path=/`;
                    console.log(response);
                    window.location = "control.html"
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        signOut() {
            const api = `${apiPath}auth/login`;
            axious.post(api, this.user)
                .then((response) => {
                    // console.log(response);
                    const token = response.data.token;
                    const expired = response.data.expired;
                    document.cookie = `token=${token}; expires=${new Date(expired * 1000)}; path=/`;
                    
                    console.log(response);
                })
                .catch((error) => {

                });
        },
        getData() {
            this.token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            console.log(this.token);
        }
    }
});