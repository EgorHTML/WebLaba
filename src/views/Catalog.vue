<script setup>
import request from '@/api/request';
import { ref, watchEffect, inject, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Tooltip from '@/components/Tooltip.vue';
import { useCart } from '@/api/cartActions.js';

const names = {
    fundament: 'Фундамент',
    steni: 'Стены',
    krisha: 'Крыша',
}

const tooltipReg = ref(false)
const products = ref([])
const router = useRouter()
const route = useRoute()
const user = inject('user')
const cart = useCart()
const name = ref()

const isAuth = computed(() => !!user.value?.email)

watchEffect(() => {
    if (route.query.search && route.query?.search?.trim() !== '') {
        request(`/api-v2/products?search=${route.query.search}${route.query.section ? '&section=' + route.query.section : ''}`).then(async data => {
            const prod = await data.json()
            products.value = prod.data.products
        })
    } else {
        request(`/api-v2/products${route.query.section ? '?section=' + route.query.section : ''}`).then(async data => {
            const prod = await data.json()
            products.value = prod.data.products
        })
    }

    name.value = route.query.section && names[route.query.section] ? names[route.query.section] : 'Каталог услуг'

})

function openProduct(id) {
    router.push(`/product/${id}`)
}
</script>

<template>

    <div class="catalog">
        <Tooltip text="Чтобы добавить товар нужно войти в учетную запись." v-if="tooltipReg" v-model:tooltipShowState="tooltipReg"/>
        <h1 style="text-align: center;">{{ name }}</h1>
        <div class="cards" v-if="products.length">

            <div class="service-card" v-for="product in products">
                <div class="block1">
                    <h2 class="service-title">{{ product.title }}</h2>
                    <p class="service-description" style="word-break: break-word;">Описание: {{ product.short }}</p>
                    <p class="service-type">Раздел: {{ names[product.type] ?? product.type }}</p>
                    <p class="service-price">Цена: {{ product.price }}Р</p>
                    <p>
                        <button @click="openProduct(product._id)"> Посмотреть товар </button>
                    </p>
                    <div class="cart-add">
                        <button @click="isAuth ? cart.add(product) : tooltipReg = true"> Добавить в корзину </button>
                        <div style="padding-top: 10px;" class="button_groups" v-if="cart.getProductInfo(product._id)?.quantity">
                            <button @click="isAuth ? cart.add(product) : tooltipReg = true">+</button>
                            <input class="amount" min="0" type="number" :value="cart.getProductInfo(product._id).quantity ?? 0"
                                @change="cart.changeAmount(product._id, $event)">
                            <button @click="cart.remove(product)">-</button>
                        </div>
                    </div>
                </div>
                <div class="block2">
                    <img style="width: 100px;" :src="product.foto" alt="">
                </div>
            </div>
        </div>
        <div v-else> Ничего не найдено </div>
    </div>
</template>

<style>
.catalog {
    flex: 1;
    padding: 0 20px;
    overflow: auto;
}

.cards {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.catalog h2 {
    font-weight: 400;
    font-size: 18px;
    color: black;
    margin: 10px 0;
}

.short-description {
    font-style: italic;
    font-size: 14px;
    color: #707070;
    line-height: 16px;
}

.full-description {
    color: #484343;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    text-align: left;
}

.characteristics {
    list-style-type: none;
    /* Убирает стандартные маркеры */
    padding-left: 0;
    /* Убирает отступ слева */
}

.characteristics li {
    background: url('marker.png') no-repeat;
    background-size: 16px;
    padding-left: 20px;
    margin: 5px 0;
}

.service-card {
    display: flex;
    justify-content: space-between;
    border: 1px solid #666;
    padding: 10px;
    border-radius: 10px
}
</style>