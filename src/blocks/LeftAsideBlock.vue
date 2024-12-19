<script setup>
import { inject, computed } from 'vue';
const currentUser = inject('user')
const isAuth = computed(() => !!currentUser.value?.email)
const hasProductsInCart = computed(() => !!currentUser.value?.cart?.length)
</script>

<template>
    <aside class="left_aside">
        <div>
            <ul class="pages">
                <li>
                    <RouterLink to="/">Главная</RouterLink>
                </li>
                <li v-if="isAuth">
                    <RouterLink to="/profile"> Профиль </RouterLink>
                </li>
                <li v-if="isAuth">
                    <RouterLink to="/cart" style="position: relative;">
                        <span v-if="hasProductsInCart" class="circle">
                        </span>
                        Корзина
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/catalog">Каталог</RouterLink>
                </li>
                <li>
                    <RouterLink to="/contacts">Контакты</RouterLink>
                </li>
                <li>
                    <RouterLink to="/about">О нас</RouterLink>
                </li>
                <li>
                    <RouterLink to="/feedback">Отзывы</RouterLink>
                </li>
            </ul>
        </div>
    </aside>
</template>

<style scoped>
.circle{
    top:-10px;
    right: -10px;
    width: 20px;
    height: 20px;
    border-radius: 20px;
    background-color: red;
    position: absolute;
}

.pages {
    gap: 10px;
}

.pages li {
    height: 70px;
    background-color: chocolate;
    width: 100%;
    cursor: pointer;
    transition: all 0.2s ease;
}

.pages li:hover {
    box-shadow: 0 5px 5px 5px rgb(142, 71, 20);
    border-radius: 20px;
    width: 95%;
}

.pages li a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    text-decoration: none;
    font-size: 24px;
}
</style>