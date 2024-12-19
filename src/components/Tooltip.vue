<script setup>
import { onMounted, ref } from 'vue';

defineProps(['text'])

const show = defineModel('tooltipShowState')

const anim = ref(false)

onMounted(() => {
    anim.value = true

    setTimeout(() => {
        show.value = false
    }, 5000 )
})

function cancel() {
    
    show.value = false
    console.log(show.value,'show');
}
</script>

<template>
    <Teleport to="body">
        <Transition name="v">
            <div v-if="anim" class="tooltip" @click="cancel()">
                <div class="tooltip__text">
                    {{ text }}
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
.tooltip {
    padding: 10px;
    align-items: center;
    display: flex;
    justify-content: center;
    flex-direction: column;
    cursor: pointer;
    position: fixed;
    top: 20px;
    right: 20px;
    height: 40px;
    width: 90%;
    border-radius: 40px;
    background-color: rgb(161, 181, 199);
    color: black;
}

.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>