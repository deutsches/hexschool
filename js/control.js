// 新增或編輯商品
Vue.component('productModal', {
    template: '#productModal',
    data() {
        return {
            text: '',
            tempProduct: {
                imageUrl: [],
                tempdescription: [],
                tempcontent: {
                    XL: 0,
                    L: 0,
                    M: 0,
                    S: 0,
                }
            },

        };
    },
    props: {
        productID: {
            type: String,
            default: '',
        },
        status: {
            type: Object,
            default () {
                return {};
            }
        },
        isNew: {
            type: Boolean,
            default: true,
        },
        user: {
            type: Object,
            default () {
                return {};
            },
        },
    },
    methods: {
        //取得單一產品
        getProduct(id) {
            const url = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/product/${id}`;

            axios.get(url).then((response) => {
                $('#productModal').modal('show');

                this.tempProduct = response.data.data;
                this.tempProduct.tempcontent = JSON.parse(response.data.data.content);
                this.tempProduct.tempdescription = JSON.parse(response.data.data.description);
                //console.log(response);
            }).catch((error) => {
                console.log(error);
            })
        },
        //新增or更新產品
        updateProduct() {
            let url = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/product`;
            let type = 'post';



            if (!this.isNew) {
                type = 'patch';
                url = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/product/${this.tempProduct.id}`;
            }
            //帶入token
            axios.defaults.headers.common.Authorization = `Bearer ${this.user.token}`;
            this.tempProduct.content = JSON.stringify(this.tempProduct.tempcontent);
            this.tempProduct.description = JSON.stringify(this.tempProduct.tempdescription);
            axios[type](url, this.tempProduct).then((response) => {
                $('#productModal').modal('hide');
                this.$emit('update');

            }).catch((error) => {
                console.log(error);
            });
            this.tempProduct = {
                text: '',
                imageUrl: [],
                tempdescription: [],
                test: [],
                tempcontent: {
                    XL: 0,
                    L: 0,
                    M: 0,
                    S: 0,
                }
            };
        },
        //上傳檔案
        uploadFile() {
            const uploadedFile = this.$refs.file.files[0];
            const formData = new FormData();
            formData.append('file', uploadedFile);
            const url = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/storage`;
            this.status.fileUploading = true;
            axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then((response) => {
                this.status.fileUploading = false;
                if (response.status === 200) {
                    this.tempProduct.imageUrl.push(response.data.data.path);
                }
            }).catch((error) => {
                console.log(error);
                this.status.fileUploading = false;
            });

        },
        addPlayer(text) {

            this.tempProduct.tempdescription.push(text);

        },

    }
});
//刪除商品
Vue.component('delProductModal', {
    template: '#delProductModal',
    data() {
        return {};
    },
    props: {
        tempProduct: {
            Type: Object,
            default () {
                return {
                    imageUrl: [],
                    tempdescription: [],
                    tempcontent: {
                        XL: 0,
                        L: 0,
                        M: 0,
                        S: 0,
                    }
                };
            },

        },
        user: {
            type: Object,
            default () {
                return {};
            },
        },
    },

    methods: {
        deleteProduct() {

            const url = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/product/${this.tempProduct.id}`;

            //帶入token
            axios.defaults.headers.common.Authorization = `Bearer ${this.user.token}`;
            axios.delete(url).then((response) => {
                $('#deleteProductModal').modal('hide');

                this.$emit('update');
            }).catch((error) => {
                console.log(error);
            });

        }
    },
});
//分頁component
Vue.component('pagination', {
    template: '#pagination',
    data() {
        return {

        };
    },
    props: {
        pages: {
            Type: Object,
            default () {
                return {};
            },
        },
    },
    methods: {
        emitPages(item) {

            this.$emit('emit-pages', item);
        },
    },
});



new Vue({
    el: ".wrap",
    data() {
        return {
            productLists: [],
            pagination: {},
            tempProduct: {
                imageUrl: [],
                tempdescription: [],
                tempcontent: {
                    XL: 0,
                    L: 0,
                    M: 0,
                    S: 0,
                }
            },


            isNew: false,
            status: {
                fileUploading: false,
            },
            user: {
                token: '',
                uuid: 'b0dfb920-fb7e-4d2d-a3d3-2fc915e7f293',
            },
        };
    },
    created() {
        //取得cookie
        this.user.token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        if (this.user.token === '') {
            window.location = 'Login.html';
        }
        this.getProducts();

    },
    methods: {

        openModal(type, product) {
            switch (type) {
                case 'delete':
                    this.tempProduct = Object.assign({}, product);
                    $('#deleteProductModal').modal('show');
                    break;
                case 'new':
                    this.tempProduct = {
                        text: '',
                        imageUrl: [],
                        tempdescription: [],
                        tempcontent: {
                            XL: 0,
                            L: 0,
                            M: 0,
                            S: 0,
                        }
                    };
                    this.isNew = true;
                    $('#productModal').modal('show');
                    break;
                case 'edit':
                    //使用object.assign是因為不要改到原本productLists
                    this.tempProduct = Object.assign({}, product);
                    this.$refs.productModel.getProduct(this.tempProduct.id);
                    this.isNew = false;

                    break;
                default:
                    break;


            }
        },

        getProducts(page = 1) {
            const url = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/products?page=${page}`;

            //預設帶入 token
            axios.defaults.headers.common.Authorization = `Bearer ${this.user.token}`;

            axios.get(url).then((response) => {
                this.pagination = response.data.meta.pagination;
                this.productLists = response.data.data;

                this.productLists.forEach(element => {
                    element.content = JSON.parse(element.content);
                });


            }).catch((error) => {
                console.log(error);
            });
        },
        filterProduct() {

        },
    },
    /*
    //畫面一進來就執行
    mounted() {
        var vm = this;
        var url = `https://course-ec-api.hexschool.io/api/${vm.uuid}/admin//ec/products`;
        axios.defaults.headers.common.Authorization = `Bearer ${this.user.token}`;
        //const api = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/product/${id}`;
        axios.get(url)
            .then(function (response) {

                vm.productLists = response.data.data;
                //console.log(vm.productLists);
                console.log(document.cookie);
            })
            .catch(function (response) {
                console.log(response);
            })
    }*/

});