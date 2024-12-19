import { addToCart, removeFromCart, setProductCart, getCart } from "./cart.js"
import { ref, watchEffect, inject } from "vue"
import { throttle } from "./throttle.js"

export function useCart() {
    const products = ref([])
    const user = inject('user')
    
    watchEffect(async () => {
        getCart().then(async data => {
            products.value = (await data.json())?.data?.cart
            if(!products.value) throw new Error()
            user.value = { ...user.value, cart: products }
        })
        .catch(err => {
            products.value = user.value.cart
            
        })
    })

    async function addProduct(product) {
        const items = (await addToCart(product._id)).data.cart

        products.value = items

        user.value = { ...user.value, products: items }
    }

    async function removeProduct(product) {
        const items = (await removeFromCart(product._id)).data.cart
        products.value = items

        user.value = { ...user.value, products: items }
    }

    async function changeAmountProduct(id, val) {
        const items = (await setProductCart(id, val.target.value)).data.cart
        products.value = items
        user.value = { ...user.value, products: items }
    }

    const add = throttle(addProduct, 200)
    const remove = throttle(removeProduct, 200)
    const changeAmount = throttle(changeAmountProduct, 500)

    function getProductInfo(id) {
        const prod = products.value.find(e => e.productId._id == id)

        return prod
    }

    return { add, remove, changeAmount, products, getProductInfo }
}

