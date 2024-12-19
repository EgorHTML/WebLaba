<script setup>
import { computed, inject, ref } from 'vue'
import request from '@/api/request';
import Tooltip from '@/components/Tooltip.vue';
import AuthForm from '@/components/AuthForm.vue';
import { useRouter, useRoute } from 'vue-router';

const search = ref('')

const router = useRouter()
const route = useRoute()
const login = ref('')
const password = ref('')
const responseMessage = ref('')
const tooltipShowState = ref(true)
const showTooltip = computed(() => !!responseMessage.value && tooltipShowState.value)
const signUpFormShow = ref(false)

const currentUser = inject('user')
const isAuth = computed(() => !!currentUser.value?.email)



async function signIn() {
    const data = await request('/signin', {
        method: 'POST',
        body: JSON.stringify({
            email: login.value.trim(),
            password: password.value.trim()
        })
    })
    const response = await data.json()

    if (response.code !== 200) {
        responseMessage.value = response.message
        tooltipShowState.value = true
    } else if (response.code == 200) {
        currentUser.value = response.data.user
    }
    console.log(response);
}

async function signUp() {
    signUpFormShow.value = true
}

async function logout() {
    const data = await request('/logout', {
        method: 'POST',
    })
    const response = await data.json()
    currentUser.value = {
        cart: []
    }
    console.log(response);
}

function goToCatalog() {
    console.log(route);

    router.push({ name: 'catalog', query: { search: search.value, section: route.query.section } });

}
</script>

<template>
    <header>
        <AuthForm v-model="signUpFormShow" v-if="signUpFormShow" />
        <Tooltip v-model:tooltipShowState="tooltipShowState" :text="responseMessage" v-if="showTooltip" />
        <div class="first-level-header">
            <div class="logo">
                <img src="https://xn--90afqsbambik.xn--p1ai/local/frontend_new/build/img/logo.svg" alt="Брен Домострой">
            </div>
            <div class="name">
                <h1>Добрострой</h1>
            </div>
            <div class="form_auth" v-if="!isAuth">
                <div class="form_inputs">
                    <input type="text" placeholder="Логин" v-model="login">
                    <input type="password" placeholder="Паполь" v-model="password">
                </div>
                <div class="button_groups">
                    <button @click="signIn">войти</button>
                    <span @click="signUp">Регистрация</span>
                </div>
            </div>
            <div v-else>

                Добро пожаловать, {{ currentUser.email }} !

                <button @click="logout"> Выйти </button>
            </div>
        </div>
        <div class="second-level-header">
            <ul class="sections">
                <li>
                    <RouterLink to="/catalog/?section=fundament"> Фундамент </RouterLink>
                </li>
                <li>
                    <RouterLink to="/catalog/?section=steni"> Стены </RouterLink>
                </li>
                <li>
                    <RouterLink to="/catalog/?section=krisha"> Крыша </RouterLink>
                </li>
            </ul>

            <div class="search_block">
                <input type="text" :placeholder="route.query.section ? 'Поиск по разделу' : 'Поиск по каталогу'"
                    v-model="search">
                <button @click="goToCatalog">искать</button>
            </div>
        </div>
    </header>
</template>

<style scoped>
.search_block {
    display: flex;
    align-items: center;
    gap: 10px;
}

.second-level-header {
    height: 70px;
}

.search_block input {
    height: 25px;
}

.button_groups>* {
    cursor: pointer;
}

.button_groups span {
    text-decoration: underline;
}

.sections {
    margin: 0;
    display: flex;
    gap: 10px;
    height: 90%;
}

.sections li {
    height: 100%;
    background-color: chocolate;
    cursor: pointer;
    transition: all 0.2s ease;
    width: 120px;
}

.sections li:hover {
    box-shadow: 0 2px 5px 2px rgb(142, 71, 20);
    border-radius: 5px;
}

.sections li a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    text-decoration: none;
    font-size: 20px;
}
</style>