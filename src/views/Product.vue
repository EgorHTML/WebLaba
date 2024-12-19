<script setup>
import request from '@/api/request';
import { computed, ref, watchEffect, inject } from 'vue';
import { useRoute } from 'vue-router'
import Tooltip from '@/components/Tooltip.vue';
import { useCart } from '@/api/cartActions';

const route = useRoute()
const tooltipReg = ref(false)
const productId = computed(() => route.params.id)
const product = ref()
const user = inject('user')
const isAuth = computed(() => !!user.value?.email)
const cart = useCart()

watchEffect(() => {
    request(`/api-v2/product/${productId.value}`).then(async data => {
        const prod = (await data.json()).data.product?.[0]
        product.value = prod
    })
})

function openImage(base64) {
    const imageData = base64
    const newWindow = window.open('', '_blank');
    newWindow.document.write('<img src="' + imageData + '" />');
    newWindow.document.title = "Изображение";
}

</script>

<template>
    <div class="service-detail" v-if="product?._id">
        <Tooltip text="Чтобы добавить товар нужно войти в учетную запись." v-if="tooltipReg"
            v-model:tooltipShowState="tooltipReg" />
        <h1>{{ product.title }}</h1>
        <p style="width: 300px;" >
            <img style="cursor: pointer;" :src="product.foto" @click="openImage(product.foto)">
        </p>
        <h2>Краткое описание товара</h2>
        <p class="short-description">{{ product.short }}</p>

        <h2>Подробное описание</h2>
        <p class="full-description" style="word-break: break-word;">{{ product.description }}</p>
        <p>Цена: {{ product.price }}Р</p>

        <div class="cart-add">
            <button @click="isAuth ? cart.add(product) : tooltipReg = true"> Добавить в корзину </button>
            <div style="padding-top: 10px;" class="button_groups" v-if="cart.getProductInfo(product._id)?.quantity">
                <button @click="cart.add(product)">+</button>
                <input class="amount" min="0" type="number" :value="cart.getProductInfo(product._id).quantity ?? 0"
                    @change="cart.changeAmount(product?._id, $event)">
                <button @click="cart.remove(product)">-</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.service-detail {
    flex: 1;
    padding: 0 20px;
}

h2 {
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
    /* Размер маркеров */
    padding-left: 20px;
    /* Отступ от маркера */
    margin: 5px 0;
    /* Отступ между пунктами списка */
}
</style>