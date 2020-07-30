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
            size:'',

        },
        cart: {},
        cartTotal: 0,

    },
    created() {
        this.getCart();
    },
    methods: {
        //顯示購物車內容
        getCart() {
            // const url = `${this.APIPATH}/api/${this.UUID}/ec/shopping`;
            // axios.get(url).then((response) => {
            //     this.cart = response.data.data;
            //    /*
            //     // 累加總金額
            //     this.cart.forEach((item) => {
            //         this.cartTotal += item.product.price;
            //     });*/
            //     this.isLoading = false;
            // });
            //localStorage為主
            this.cart = JSON.parse(localStorage.getItem("cart"));
            this.cart.forEach((item) => {
                this.cartTotal += item.totalAmount;
            });
        },
        //移除全部購物車內容
        removeAllCart() {
            const url = `${this.APIPATH}/api/${this.UUID}/ec/shopping/all/product`;
            axios.delete(url)
                .then(() => {
                    this.isLoading = false;
                    localStorage.removeItem("cart");
                    this.getCart();
                }).catch((error) => {
                    console.log(error);
                });
        },
        //移除單一購物車內容
        removeSingleCart(id,timeStamp) {
            const url = `${this.APIPATH}/api/${this.UUID}/ec/shopping/${id}`;
            axios.delete(url).then(() => {
                this.isLoading = false;
                this.getCart();

            }).then((error)=>{
                console.log(error);
            });
            //localStorage部分
            this.cart.forEach((item,index)=>{
                if(timeStamp == item.timeStamp)
                {
                    item.splice(index,1);
                }
            });
            localStorage.setItem('cart',JSON.stringify(this.cart));
        },
        
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