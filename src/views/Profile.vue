<script setup>
import { computed, inject } from 'vue'

const user = inject('user')

const isAuth = computed(() => !!user.value?.email)
</script>

<template>
    <div id="userProfile" v-if="isAuth">
        <h2>Профиль пользователя</h2>
        <p><strong>Логин:</strong> <span id="username">{{ user.email }}</span></p>
        <p><strong>Телефон:</strong> <span id="phone">{{ user.tel || 'Не указано' }}</span></p>
        <p><strong>Полное имя:</strong> <span id="fullName">{{ user.fio || 'Не указано' }} </span></p>
    </div>
    <div v-else>
        Зарегестрируйтесь!
    </div>
</template>

<style scoped>
#userProfile {
    flex: 1;
    margin: 20px 10px;
    padding: 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
}

h2 {
    text-align: center;
}

p {
    margin: 10px 0;
}

strong {
    color: #333;
}
</style>