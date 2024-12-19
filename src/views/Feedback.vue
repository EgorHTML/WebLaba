<script setup>
import request from '@/api/request';
import {  inject, watchEffect, ref } from 'vue';
import Tooltip from '@/components/Tooltip.vue';

const user = inject('user');

const showTooltip = ref(false)

const email = ref()

const name = ref(user.value?.fio ?? '')
const text = ref()
const opinion = ref()
const theme = ref()

const feedbacks = ref([])

const themes = {
    content: 'Контент',
    design: 'Дизайн',
    usability: 'Удобство использования'
}

const opinions = {
    positive: 'Положительно',
    neutral: 'Нейтрально',
    negative: 'Отрицательно'
}

watchEffect(async () => {
    feedbacks.value = await request('/api-v2/feedbacks').then(async data => (await data.json()).data.feedbacks)
})

async function add() {
    const res = await request('/api-v2/feedback', {
        method: 'POST',
        body: JSON.stringify({
            text: text.value,
            fio: name.value,
            opinion: opinion.value,
            email: email.value,
            theme: theme.value
        })
    }).then(async data => (await data.json()).data.feedbacks)

    feedbacks.value = res
    showTooltip.value = true
    text.value = ''
    name.value = user.value?.fio ?? ''
    opinion.value = ''
    email.value = ''
    theme.value = ''
}
</script>

<template>
    <div class="feedback">
        <Tooltip v-if="showTooltip" v-model:tooltipShowState="showTooltip" text="Отзыв отправлен !" />
        <div class="contact-form">
            <h2>Форма обратной связи</h2>
            <form @submit.prevent="add">
                <label for="name">Имя:</label>
                <input v-model="name" type="text" id="name" name="name" placeholder="Введите ваше имя" required>

                <label for="email">Email:</label>
                <input v-model="email" type="email" id="email" name="email" placeholder="Введите ваш email" required>

                <label for="message">Сообщение:</label>
                <textarea v-model="text" id="message" name="message" placeholder="Введите ваше сообщение"
                    required></textarea>

                <!-- Радио кнопки -->
                <fieldset>
                    <legend>Какое ваше мнение о нашем сайте?</legend>
                    <label>
                        <input v-model="opinion" type="radio" name="feedback" value="positive" required>
                        Положительно
                    </label>
                    <label>
                        <input v-model="opinion" type="radio" name="feedback" value="neutral">
                        Нейтрально
                    </label>
                    <label>
                        <input v-model="opinion" type="radio" name="feedback" value="negative">
                        Отрицательно
                    </label>
                </fieldset>

                <!-- Флажок -->
                <label>
                    <input type="checkbox" name="subscribe">
                    Подписаться на новости
                </label>

                <!-- Описание переключателя -->
                <label for="newsletter" class="newsletter-label">
                    <span>Получать новости по электронной почте:</span>
                    <label class="switch">
                        <input type="checkbox" id="newsletter" name="newsletter">
                        <span class="slider"></span>
                    </label>
                </label>

                <label for="category">Тематика отзыва:</label>
                <select v-model="theme" id="category" name="category" required>
                    <option value="">Выберите тематику</option>
                    <option value="usability">Удобство использования</option>
                    <option value="design">Дизайн</option>
                    <option value="content">Контент</option>
                </select>

                <button type="submit" class="submit-button">Отправить</button>
            </form>
        </div>

        
        <div v-if="feedbacks.length" class="feedbacks">
            <h1> Отзывы </h1>
            <div class="review-card" v-for="feedback in feedbacks">
                <p><strong>{{ feedback.fio }}</strong> ({{ feedback.email }})</p>
                <h3>Тематика отзыва: {{ themes[feedback.theme] ?? feedback.theme}}</h3>
                <p>{{ feedback.text }}</p>
                <p>Мнение: <em>{{ opinions[feedback.opinion] ?? feedback.opinion }}</em></p>
            </div>
        </div>
        <div v-else class="feedbacks" style="text-align: center;">
            Нет отзывов
        </div>
    </div>
</template>

<style scoped>
.review-card {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 16px;
    margin: 10px 0;
}

.feedbacks {
    min-height: 100px;
}


.feedback {
    flex: 1;
}

.contact-form {
    display: flex;
    flex-direction: column;
}

/* Стили для кнопки отправки */
.submit-button {
    margin-top: 15px;
    /* Отступ сверху для кнопки */
    padding: 10px 15px;
    background-color: #2196F3;
    /* Цвет фона */
    color: white;
    /* Цвет текста */
    border: none;
    /* Без рамки */
    border-radius: 5px;
    /* Скругленные углы */
    cursor: pointer;
    /* Указатель при наведении */
    font-size: 16px;
    /* Размер шрифта */
}

.submit-button:hover {
    background-color: #1e88e5;
    /* Цвет фона при наведении */
}

/* Стили для переключателя */
.switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
    margin-left: 10px;
    /* Отступ для улучшения отступов */
}

.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: .4s;
    border-radius: 34px;
}

.slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
}

input:checked+.slider {
    background-color: #2196F3;
}

input:checked+.slider:before {
    transform: translateX(26px);
}

/* Стили для метки переключателя */
.newsletter-label {
    display: flex;
    align-items: center;
    /* Центрирование по вертикали */
    margin-top: 10px;
    /* Отступ сверху для разделения */
}
</style>
