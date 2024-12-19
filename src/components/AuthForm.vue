<script setup>
import { inject, ref, computed } from 'vue';
import request from '@/api/request';
import Tooltip from './Tooltip.vue';
import { useRouter } from 'vue-router';
const show = defineModel(true)
const currentUser = inject('user')
const router = useRouter()
const responseMessage = ref('')
const tooltipShowState = ref(true)
const showTooltip = computed(() => !!responseMessage.value && tooltipShowState.value)

const email = ref()
const password = ref()
const tel = ref()
const fio = ref()
const check = ref(false)

function cancel() {
    show.value = false
}

async function signUp() {
    const data = await request('/signup', {
        method: 'POST',
        body: JSON.stringify({
            email: email.value,
            password: password.value,
            tel: tel.value,
            fio: fio.value
        })
    })
    const response = await data.json()

    if (response.code !== 201) {
        responseMessage.value = response.message
        tooltipShowState.value = true
    } else if (response.code == 201) {
        currentUser.value = response.data.user
        show.value = false
    } else {
        responseMessage.value = 'Неизвестная ошибка'
        tooltipShowState.value = true
    }
}

async function openPDF() {
    cancel()
    router.push({ name: 'rights' })

}
</script>

<template>
    <Teleport to="body">
        <div class="register-form">
            <Tooltip v-model:tooltipShowState="tooltipShowState" :text="responseMessage" v-if="showTooltip" />
            <form @submit.prevent="signUp">
                <button type="button" @click="cancel" class="close-button">x</button>
                <input type="text" required placeholder="Логин" v-model="email">
                <input type="password" required placeholder="Пароль" v-model="password">
                <input type="tel" placeholder="Телефон" v-model="tel">
                <input type="text" placeholder="ФИО" v-model="fio" required>
                <button type="submit"> Регистрация </button>
            </form>

            <h3 style="cursor: pointer;" @click="openPDF">Все права защищены</h3>
        </div>
    </Teleport>
</template>

<style scoped>
.register-form {
    position: fixed;
    left: calc(50% - 200px);
    top: calc(50% - 300px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 600px;
    width: 400px;
    background-color: #c1b09c;
    border-radius: 10px;
}

.close-button {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: -15px;
    right: -15px;
    width: 30px;
    height: 30px;
    border-radius: 30px;
    color: black;
    background-color: aquamarine;
}

.register-form form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
}
</style>