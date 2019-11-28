

Vue.component('product',{
    props:{
        premium:{
            type:Boolean,
            required:true
        }
    },
    template:'<div class="product">' +
    '<div class="product-image">' +
    '<img v-bind:src="image" v-bind:href="linka" v-bind:title="title" v-bind:alt="altText">' +
    '</div>' +
    '<div class="product-info">' +
    '<h1>{{ title }}</h1>' +
    '<p v-if="inStock">In stock</p>' +
    '<p v-else :class="{disactiveTab: !inStock}">Out of stock!</p>' +
    '<p >Shipping: {{ shipping }}</p>' +
    '<ul>' +
    '<li v-for="detail in details">{{ detail }}</li>' +
    '</ul>' +
    '<div v-for="(variant, index) in variants"' +
    ':key="variant.variantId"' +
    'class="color-box"' +
    ':style="{backgroundColor: variant.variantColor}"' +
    '@mouseover="updateProduct(index)"' +
    '>' +
    '</div>' +
    '<button v-on:click="addToCart":disabled="!inStock"class = "test"' +
    ':class="{ disabledButton: !inStock }">Add to Cart</button><div class="cart">    <p>Cart({{cart}})</p></div></div></div>',
    data(){
        return {
            brand: 'Vue Mastery',
            product: 'Socks!',
            // image: './assets/vmSocks-green-onWhite.jpg',
            selectedVariant:0,
            linka: 'https://google.com',
            altText: 'A pair of socks.',
            link:'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks',
            details: ["80% cotton","20% polyester","Gender-neutral"],
            variants:[
                {
                    variantId:2234,
                    variantColor: "green",
                    variantImage: "./assets/vmSocks-green-onWhite.jpg",
                    variantQuantity:10,
                    onSale:true
                },
                {
                    variantId:2235,
                    variantColor: "blue",
                    variantImage: "./assets/vmSocks-blue-onWhite.jpg",
                    variantQuantity:0,
                    onSale:false
                }
            ],
            cart: 0,
        }
    },
methods:{
    addToCart: function () {
        this.cart  += 1
    },
    updateProduct: function (index) {
        this.selectedVariant  = index
    },
    dropFromCart: function () {
        if(this.cart > 0)
        {
            this.cart  -= 1
        }
    },
},
computed:{
    title (){
        return this.brand + ' ' + this.product
    },
    image(){
        return this.variants[this.selectedVariant].variantImage
    },
    inStock(){
        return this.variants[this.selectedVariant].variantQuantity
    },
    sale(){
        return this.variants[this.selectedVariant].onSale?this.title + 'On sale':'Sale out'
    },
    shipping(){
        if(this.premium){
            return "Free";
        }
        return 2.66
    }
}
})
var ap = new Vue({
    el: '#app',
    data:{
        premium:false
    }
})