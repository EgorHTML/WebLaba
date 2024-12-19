<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useCart } from '@/api/cartActions';

const router = useRouter()

const cart = useCart()

const products = computed(() => cart.products.value)

const names = {
    fundament: 'Фундамент',
    steni: 'Стены',
    krisha: 'Крыша',
}

const price = computed(() => {
    return products.value.reduce((acc, curr) => acc + curr.productId.price * curr.quantity, 0)
})

function openProduct(id) {
    router.push(`/product/${id}`)
}
</script>

<template>
    <div class="cart" v-if="products?.length">
        <h2>Товары в корзине на сумму: {{ price }}Р</h2>
        <div class="service-card" v-for="product in products">
            <div class="block1">
                <h2 class="service-title">{{ product.productId.title }}</h2>
                <p class="service-description" style="word-break: break-word;">Описание: {{ product.productId.short }}
                </p>
                <p class="service-type">Раздел: {{ names[product.productId.type] ?? product.productId.type }}</p>
                <p class="service-price">Цена: {{ product.productId.price }}Р</p>
                <p>
                    <button @click="openProduct(product.productId._id)"> Посмотреть товар </button>
                </p>
                <div class="cart-add">
                    <div style="padding-top: 10px;">
                        <button @click="cart.add(product.productId)">+</button>
                        <input class="amount" min="0" type="number"
                            @change="cart.changeAmount(product.productId._id, $event)"
                            :value="cart.getProductInfo(product.productId._id).quantity ?? 0">
                        <button @click="cart.remove(product.productId)">-</button>
                    </div>
                </div>
            </div>
            <div class="block2">
                <img style="width: 100px;" :src="product.productId.foto" alt="">
            </div>
        </div>


    </div>
    <div v-else> Нет товаров в корзине </div>
</template>

<style scoped>
.cart {
    flex: 1;
    margin: 0 40px;
}

.service-card {
    margin-bottom: 10px;
}
</style>