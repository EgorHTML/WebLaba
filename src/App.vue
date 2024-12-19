<script setup>
import { provide, ref, watchEffect } from 'vue';
import MainLayout from './layouts/MainLayout.vue';
import request from './api/request';

const currentUser = ref()

provide('user', currentUser)

watchEffect(async () => {
  await request('/api/user')
    .then(async user => {
      currentUser.value = (await user.json()).data.user
    })
    .catch(error => {
      currentUser.value = {
        cart: []
      }
    })

})
</script>

<template>
  <MainLayout />
</template>

<style scoped></style>
