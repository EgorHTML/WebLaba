<template>
    <div class="slider">
        <div class="slides" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
            <div class="slide" v-for="(slide, index) in slides" :key="index">
                <img style="height: 400px;" :src="slide.img" :alt="slide.alt" />
            </div>
        </div>
        <button class="prev" @click="moveSlide(-1)">&#10094;</button>
        <button class="next" @click="moveSlide(1)">&#10095;</button>
    </div>
</template>

<script setup>
import { onMounted, ref, watchEffect } from 'vue'
import request from '../api/request.js'
const currentSlide = ref(0)
const slides = ref([])

watchEffect(() => {
    request('/api-v2/slides').then(async data => {
        const _slides = (await data.json()).data
        slides.value = _slides
    })
})

function moveSlide(direction) {
    currentSlide.value += direction;

    if (currentSlide.value < 0) {
        currentSlide.value = slides.length - 1; // Перейти к последнему слайду
    } else if (currentSlide.value >= slides.value.length) {
        currentSlide.value = 0; // Вернуться к первому слайду
    }
}

function autoSlide() {
    setInterval(() => {
        moveSlide(1);
    }, 5000); // Каждые 5 секунд
}

onMounted(() => {
    autoSlide();
})
</script>

<style scoped>
.slider {
    position: relative;
    max-width: 800px;
    height: 400px;
    margin: auto;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.slides {
    display: flex;
    transition: transform 0.5s ease;
}

.slide {
    min-width: 100%;
    flex-shrink: 0;
}

img {
    border-radius: 10px;
}

button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(255, 255, 255, 0.8);
    border: none;
    border-radius: 5px;
    padding: 10px;
    cursor: pointer;
    font-size: 18px;
}

.prev {
    left: 10px;
}

.next {
    right: 10px;
}

button:hover {
    background-color: rgba(255, 255, 255, 1);
}
</style>