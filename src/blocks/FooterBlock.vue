<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goToRights() {
    router.push({ name: 'rights' })
}
</script>

<template>
    <footer style="cursor: pointer;" @click="goToRights">© Все права защищены</footer>
</template>