new Vue({
    el: ".wrap",
    data: {
        UUID: 'b0dfb920-fb7e-4d2d-a3d3-2fc915e7f293',
        APIPATH: 'https://course-ec-api.hexschool.io',
        isLoading: false,
        status: {
            loadingItem: '',
        },
        products: [],
        tempProduct: {
            tempQuantity: 0,
            quantity: 0,
            content: {
                XL: 0,
                L: 0,
                M: 0,
                S: 0,
            },

            tempSize: '',
        },
        cart: {},


    },
    created() {
        this.getProducts();
    },
    methods: {
        getProducts(page = 1) {
            //this.isLoading = true;
            const url = `${this.APIPATH}/api/${this.UUID}/ec/products?page=${page}`;
            axios.get(url).then((response) => {
                //console.log(response);
                //response.data.data.text = '';

                //console.log(response.data.data);
                response.data.data.forEach((element, index) => {
                    element.content = JSON.parse(element.content);
                    //element.text = 0;
                    // this.products[index].text = '';
                    //console.log(element);
                });
                this.products = response.data.data;

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
                this.tempProduct.content = JSON.parse(this.tempProduct.content);
                //???
                this.$set(this.tempProduct, 'quantity', 0);
                this.$set(this.tempProduct, 'tempQuantity', -1);
                $('#productModal').modal('show');
                this.status.loadingItem = '';
            }).catch((error) => {
                console.log(error);
            });
        },

        //加入購物車
        addToCart(item, quantity, price, size, totalAmount, category, title, imageUrl) {
            /*
                        const url = `${this.APIPATH}/api/${this.UUID}/ec/shopping`;
                        const cart = {
                            product: item.id,
                            quantity,
                        };
                        axios.post(url, cart).then((response) => {
                            console.log(response);
                        }).catch((error) => {
                            console.log(error);
                        });
            */
            const localstorageCart = {
                product: item.id,
                quantity,
                price,
                size,
                totalAmount,
                category,
                title,
                imageUrl,
                timeStamp: Math.random(),

            };

            let tempCart = [];
            if (JSON.parse(localStorage.getItem("cart")) != null) {
                tempCart.push(JSON.parse(localStorage.getItem("cart")));
            }
            tempCart.push(localstorageCart);
            localStorage.setItem("cart", JSON.stringify(tempCart));


            this.status.loadingItem = '';
            $('#productModal').modal('hide');
        },
    },


});