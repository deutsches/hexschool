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
            quantity: 1,
            content: {
                XL: 0,
                L: 0,
                M: 0,
                S: 0,
            },
            tempQuantity: 1,
            tempSize:'',
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
                response.data.data.text = '';

                //console.log(response.data.data);
                response.data.data.forEach((element, index) => {
                    element.content = JSON.parse(element.content);
                    element.text = 0;
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
                this.$set(this.tempProduct, 'quantity', 1);
                this.$set(this.tempProduct, 'tempQuantity', 1);

                $('#productModal').modal('show');
                this.status.loadingItem = '';
            }).catch((error) => {
                console.log(error);
            });
        },
        //加入購物車
        addToCart(item) {
           // const url = `${this.APIPATH}/api/${this.UUID}/ec/shopping`;
            // let size = 
            /*
            const cart = {
                product: item.id,
                quantity,

            };*/
            const localstorageCart = {
                //product: item.id,
                size :item,
                time:Math.random(),
            };
            //localstorageCart = this.products;
            localStorage.setItem("cart", JSON.stringify(localstorageCart));
/*
            axios.post(url, cart).then((response) => {
                console.log(response);
            }).catch((error) => {
                console.log(error);
            });*/
        },
        /*quantityUpdata(id, num) {
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
        },*/
    },
    /*
    mounted() {
        var vm = this;
        var url = `https://course-ec-api.hexschool.io/api/${vm.uuid}/ec/products`;

        axios.get(url)
            .then(function (response) {

                vm.productLists = response.data.data;
                console.log(vm.productLists);
            })
            .catch(function (response) {
                console.log(response);
            })
    }*/

});
/*
new Vue({
    el: ".sideMenu",
    data: {
        uuid: 'b0dfb920-fb7e-4d2d-a3d3-2fc915e7f293',
        uuids:'',
        productLists: []
    },

    mounted() {
        var vm = this;
        var url = `https://course-ec-api.hexschool.io/api/${vm.uuid}/ec/products`;

        axios.get(url)
        .then(function (response) {

            vm.productLists = response.data.data;
            //console.log(vm.productLists);
        })
        .catch(function (response) {
            console.log(response);
        })
    }

});

*/
/*

var obj = {

    data: {
        uuid: 'b0dfb920-fb7e-4d2d-a3d3-2fc915e7f293',
        products: [],
    },
    getData: function getData() {

        //var vm = window.obj;
        var vm = this;

        var url = `https://course-ec-api.hexschool.io/api/${vm.data.uuid}/ec/products`;

        axios.get(url)
            .then(function (response) {
                vm.data.products = response.data.data;
                vm.render();
                console.log(response);
            })
            .catch(function () {

            })
    },

    render: function render() {
        var productsList = document.querySelector('.productsList');
        var sideMenu = document.querySelector('.sideMenu');
        var products = this.data.products;
        var str = '';
        var sideMenustr = `<li class='menuTitle'>球隊分類</li>`;
        products.forEach(function (item, i) {

        str += `<div class="card">
            <img src="${ item.imageUrl[0]}" class="card-img-top">
            <div class="card-body">
            <h5 class="card-title">${ item.title}</h5>
            <p class="card-text">${ item.content}</p>
            </div>
            </div>`;
            str += ` <li>
        <a href='#'><img src="${ item.imageUrl[0]}" class="card-img-top"></a>
        <div class='card-body'>
        <a href='#'><h3 class='card-title'>${ item.title}</h3></a>
        <p class='card-content'>位置:${ item.content},身高:${item.content},體重:${item.content}</p>
        <p>球員優點:</p>
        <ol><li>速度快</li><li>技術好</li><li>具有潛力</li></ol>
        <div class='purchase'>
        <span>現在只要<del>$${ item.origin_price}</del><span class='space discount'>$${item.price}</span></span>
        <div class="card_btn"  data-item='${ item.id}'><i class="fas fa-shopping-cart"></i>加入購物車</div>
        </div></div></li>`;
            sideMenustr += `<li><a href=''>${item.category}</a>
        </li>`;
        });
        productsList.innerHTML = str;
        sideMenu.innerHTML = sideMenustr;
    },
    patch: function () {
        var vm = this;
        var data = {
            title: "Robert Lewandowski",
            category: "拜仁慕尼黑",
            content: "前鋒",
            description: '',
            imageUrl: [
                "https://images.daznservices.com/di/library/GOAL/5f/7f/robert-lewandowski-bayern-munich-2019-20_m9cdee7hqy4w19z9cntmmoyl4.jpg?t=183845454&quality=100"
            ],
            enabled: true,
            origin_price: 500,
            price: 300,
            unit: '個'
        }
        var url = `https://course-ec-api.hexschool.io/api/${vm.data.uuid}/admin/ec/product/odinY1GX0vPULXuV2rX6dRU4BT5pDrrjnFZ9S8QvwXQDCO4SBupwTB42f7YXPqkb`;
        console.log(url);
        axios.patch(url, data)
            .then(function (response) {
                console.log(response);


            })
            .catch(function (response) {
                console.log(response);
            })
    },
    post: function () {

    },

    delete: function () {
        var vm = this;

        var url = `https://course-ec-api.hexschool.io/api/${vm.data.uuid}/admin/ec/product/v4oOjJBhkRteQ1iSdTCjU0DtQ0XW0k8Uwcn26WaWDXmx5zgC6EmDQT1eUJxxm14Y`;
        console.log(url);
        axios.delete(url)
            .then(function (response) {
                console.log(response);


            })
            .catch(function (response) {
                console.log(response);
            })
    },
    post: function () {

    }
}

obj.getData();
obj.delete();*/
//document.querySelector('#get').addEventListener('click',test);

//document.querySelector('#get').addEventListener('click', obj.getData.bind(obj));
/*
//document.querySelector('#post').addEventListener('click',obj.post);
document.querySelector('#delete').addEventListener('click',obj.delete.bind(obj));
document.querySelector('#patch').addEventListener('click',obj.patch);*/
