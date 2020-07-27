new Vue({
    el: "#app",
    data: {
        UUID: 'b0dfb920-fb7e-4d2d-a3d3-2fc915e7f293',
        APIPATH: 'https://course-ec-api.hexschool.io',
        isLoading: false,
        status: {
            loadingItem: '',
        },
        products: [],
        tempProduct: {
            quantity: 0,
        },
        cart: {},
        text: '',

    },
    created() {
        this.getProducts();
    },
    methods: {
        getProducts(page = 1) {
            //this.isLoading = true;
            const url = `${this.APIPATH}/api/${this.UUID}/ec/products?page=${page}`;
            axios.get(url).then((response) => {
                console.log(response);
                this.products = response.data.data;
                this.products.forEach(element => {
                    element.content = JSON.parse(element.content);
                });
                //this.isLoading = false;
            }).catch((error) => {
                console.log(error);
            });
        },

        //產品細節
        getProductDetail(id) {
            const url = `${this.APIPATH}/api/${this.UUID}/ec/product/${id}`;
            axios.get(url).then((response) => {
                this.tempProduct = response.data.data;
                this.$set(this.tempProduct, 'quantity', 1);
                $('#productModal').modal('show');
                console.log(this.tempProduct);
                this.status.loadingItem = '';
            }).catch((error) => {
                console.log(error);
            });
        },
        //加入購物車
        addToCart(item, quantity = 1) {
            const url = `${this.APIPATH}/api/${this.UUID}/ec/shopping`;
            // let size = 
            const cart = {
                product: item.id,
                quantity,

            };
            const localstorageCart = {};
            //localstorageCart = this.products;
            //localStorage.setItem("cart", localstorageCart);
            axios.post(url, cart).then((response) => {
                console.log(response);
            }).catch((error) => {
                console.log(error);
            });
        },
        /*
                //移除全部購物車內容
                removeAllCart() {
                    const url = `${this.APIPATH}/api/${this.UUID}/ec/shopping/all/product`;
                    axios.delete(url)
                        .then(() => {
                            this.isLoading = false;
                            this.getCart();
                        }).catch((error) => {
                            console.log(error);
                        });
                },
                //移除單一購物車內容
                removeSingleCart() {
                    const url = `${this.APIPATH}/api/${this.UUID}/ec/shopping/${id}`;
                    axios.delete(url).then(() => {
                        this.isLoading = false;
                        this.getCart();
                    });
                },
                //顯示購物車內容
                getCart() {
                    const url = `${this.APIPATH}/api/${this.UUID}/ec/shopping`;
                    axios.get(url).then((response) => {
                        this.cart = response.data.data;
                        // 累加總金額
                        this.cart.forEach((item) => {
                            this.cartTotal += item.product.price;
                        });
                        this.isLoading = false;
                    });

                },*/
        /*
        quantityUpdata(id, num) {
            // 避免商品數量低於 0 個
            if (num <= 0) return;

            this.isLoading = true;
            const url = `${this.APIPATH}/api/${this.UUID}/ec/shopping`;

            const data = {
                product: id,
                quantity: num,
            };

            axios.patch(url, data).then(() => {
                this.isLoading = false;
                this.getCart();
            });
        },
        createOrder() {
            this.isLoading = true;
            const url = `${this.APIPATH}/api/${this.UUID}/ec/orders`;

            axios.post(url, this.form).then((response) => {
                if (response.data.data.id) {
                    this.isLoading = false;
                    // 跳出提示訊息
                    $('#orderModal').modal('show');

                    // 重新渲染購物車
                    this.getCart();
                }
            }).catch((error) => {
                this.isLoading = false;
                console.log(error.response.data.errors);
            });
        },
        */
    }
});