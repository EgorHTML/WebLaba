<script setup>
import url from '../assets/rightsDoc.pdf'

async function openPDF() {
    window.open('https://engineerforum.ru/docs/2024/confident_policy.pdf', '_blank'); 
}
</script>

<template>
    <div class="content">
        <h1>Все права защищены</h1>


        <a :href="url" target="_blank">Скачать политику конфиденциальности</a>
        <br>
        <span style="cursor: pointer; text-decoration: underline;" @click="openPDF"> Открыть в окне политику
            конфиденциальности</span>

        <p>© 2024 Название вашей компании. Все права защищены.</p>
        <h2>О компании</h2>
        <p>Наша компания занимается разработкой программного обеспечения и предоставлением решений для бизнеса. Мы
            гордимся тем, что предлагаем качественные продукты и услуги нашим клиентам.</p>

        <h2>Контактная информация</h2>
        <p>Если у вас есть вопросы, не стесняйтесь обращаться к нам:</p>
        <ul>
            <li>Email: <a href="mailto:info@company.com">info@company.com</a></li>
            <li>Телефон: +7 (123) 456-78-90</li>
        </ul>

        <h2>Наша политика конфиденциальности</h2>
        <p>Мы ценим вашу конфиденциальность. Все данные, которые вы передаете нам, хранятся в безопасности и не
            передаются третьим лицам без вашего согласия.</p>

        <h2>Условия использования</h2>
        <p>Используя наш сайт, вы соглашаетесь с условиями, изложенными в этом документе. Пожалуйста, внимательно
            прочитайте их, прежде чем продолжить.</p>
    </div>
</template>

<style scoped>
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 20px;
    background-color: #f4f4f4;
}

.content {
    max-width: 800px;
    margin: auto;
    padding: 20px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

h2 {
    margin-top: 0;
}

p {
    line-height: 1.6;
}

a {
    display: inline-block;
    margin-top: 20px;
    color: #3498db;
    text-decoration: none;
    cursor: pointer;
}

a:hover {
    text-decoration: underline;
}
</style>