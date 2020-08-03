import zh from './zh_TW.js';

// 載入自訂規則包
VeeValidate.localize('tw', zh);
// 將 VeeValidate input 驗證工具載入 作為全域註冊
Vue.component('ValidationProvider', VeeValidate.ValidationProvider);
// 將 VeeValidate 完整表單 驗證工具載入 作為全域註冊
Vue.component('ValidationObserver', VeeValidate.ValidationObserver);

// Class 設定檔案
VeeValidate.configure({
    classes: {
        valid: 'is-valid',
        invalid: 'is-invalid',
    }
});
new Vue({
    el: "#app",
    data: {
        UUID: 'b0dfb920-fb7e-4d2d-a3d3-2fc915e7f293',
        APIPATH: 'https://course-ec-api.hexschool.io',
        isLoading: false,
        status: {
            loadingItem: '',
        },
        data: {
            orderEmail: '',
            orderTel: '',
            orderName: '',
            orderAddress: '',
            receiver: '',
            receiverTel: '',
            receiverAddress: '',
            receiverEmail: '',

        },
        products: [],
        tempProduct: {
            quantity: 0,
            size: '',

        },
        cart: {},
        cartTotal: 0,
        orderStatus: false,

    },
    created() {
        this.getCart();
    },
    methods: {
        //顯示購物車內容
        getCart() {
            const url = `${this.APIPATH}/api/${this.UUID}/ec/shopping`;
            axios.get(url).then((response) => {
                //this.cart = response.data.data;
                /*
                 // 累加總金額
                 this.cart.forEach((item) => {
                     this.cartTotal += item.product.price;
                 });*/
                this.isLoading = false;
            });
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
        removeSingleCart(id, timeStamp) {
            /*
            const url = `${this.APIPATH}/api/${this.UUID}/ec/shopping/${id}`;
            axios.delete(url).then(() => {
                this.isLoading = false;
                this.getCart();

            }).then((error) => {
                console.log(error);
            });*/
            console.log(timeStamp);
            //localStorage部分
            this.cart.forEach((item, index) => {
                console.log(item);
                if (timeStamp === item.timeStamp) {
                    this.cart.splice(index, 1);
                }
            });
            localStorage.setItem('cart', JSON.stringify(this.cart));
        },
        //相同資料
        refillForm() {

            if (!this.orderStatus) {
                this.data.receiver = this.data.orderName;
                this.data.receiverEmail = this.data.orderEmail;
                this.data.receiverAddress = this.data.orderAddress;
                this.data.receiverTel = this.data.orderTel;
            } else {
                this.data.receiverAddress = '';
                this.data.receiverTel = '';
                this.data.receiverEmail = '';
                this.data.receiver = '';
            }

        },
        //送出訂單
        sendOrder() {
            const url = `${this.APIPATH}/api/${this.UUID}/ec/orders`;
            axios.post(url, this.form).then((response) => {
                if (response.data.data.id) {
                    //   this.isLoading = false;

                }
            }).catch((error) => {
                // this.isLoading = false;
                console.log(error.response.data.errors);
            });
        },

    }
});
//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches

$(".next").click(function() {
    if (animating) return false;
    animating = true;

    current_fs = $(this).parent().parent().parent();
    next_fs = $(this).parent().parent().parent().next();

    //activate next step on progressbar using the index of next_fs
    $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

    //show the next fieldset
    next_fs.show();
    //hide the current fieldset with style
    current_fs.animate({ opacity: 0 }, {
        step: function(now, mx) {
            //as the opacity of current_fs reduces to 0 - stored in "now"
            //1. scale current_fs down to 80%
            scale = 1 - (1 - now) * 0.2;
            //2. bring next_fs from the right(50%)
            left = (now * 50) + "%";
            //3. increase opacity of next_fs to 1 as it moves in
            opacity = 1 - now;
            current_fs.css({
                'transform': 'scale(' + scale + ')',
                'position': 'absolute'
            });
            next_fs.css({ 'left': left, 'opacity': opacity });
        },
        duration: 800,
        complete: function() {
            current_fs.hide();
            animating = false;
        },
        //this comes from the custom easing plugin
        easing: 'easeInOutBack'
    });
});

$(".previous").click(function() {
    if (animating) return false;
    animating = true;

    current_fs = $(this).parent().parent().parent();
    previous_fs = $(this).parent().parent().parent().prev();

    //de-activate current step on progressbar
    $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

    //show the previous fieldset
    previous_fs.show();
    //hide the current fieldset with style
    current_fs.animate({ opacity: 0 }, {
        step: function(now, mx) {
            //as the opacity of current_fs reduces to 0 - stored in "now"
            //1. scale previous_fs from 80% to 100%
            scale = 0.8 + (1 - now) * 0.2;
            //2. take current_fs to the right(50%) - from 0%
            left = ((1 - now) * 50) + "%";
            //3. increase opacity of previous_fs to 1 as it moves in
            opacity = 1 - now;
            current_fs.css({ 'left': left });
            previous_fs.css({ 'transform': 'scale(' + scale + ')', 'opacity': opacity });
        },
        duration: 800,
        complete: function() {
            current_fs.hide();
            animating = false;
        },
        //this comes from the custom easing plugin
        easing: 'easeInOutBack'
    });
});

$(".submit").click(function() {
    return false;
})