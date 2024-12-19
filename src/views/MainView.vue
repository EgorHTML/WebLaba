<script setup>
import Slider from '../components/Slider.vue';
</script>

<template>
    <div class="content">
        <h2 class="content__title">Услуги!</h2>
        <Slider/>
        <div class="content_body">
            <img style="width: 30%; float: right;"
                src="https://xn--90afqsbambik.xn--p1ai/upload/resize_cache/iblock/b08/256_256_1/b086366af84604888e7ff13dcec7671d.webp"
                alt="">
            <p>
                Интернет-гипермаркет строительно-отделочных материалов «ДоброСтрой»
            </p>
            <p>
                Сеть гипермаркетов «ДоброСтрой» — это крупнейшие магазины формата DIY (товары для строительства,
                ремонта и декорирования квартиры и дома) в Астрахани, Волжском, Липецке, Орле, Магнитогорске,
                Армавире и Ставрополе. Это всегда широкий ассортимент, низкие цены и профессиональные
                консультации.
            </p>
            <table border="2" cellpadding="30" cellspacing="0">
                <tbody>
                    <tr>
                        <td rowspan="4">Дом !!</td>

                    </tr>
                    <tr>
                        <td>заборы</td>
                        <td>Крыша</td>
                    </tr>
                    <tr>
                        <td>Дача</td>
                        <td>Баня</td>
                    </tr>
                    <tr>
                        <td colspan="2" align="center">Кирпич !</td>
                    </tr>
                </tbody>
            </table>

            <ul type="circle">
                <li> акции
                </li>
                <li> бонусы
                    <ul type="disc">
                        <li>при покупке</li>
                        <li>при аренде</li>
                    </ul>
                </li>
                <li> подарки
                </li>
            </ul>

            <ol type="A">
                <li>Кирпич</li>
                <li>Дерево</li>
                <li>Металл</li>
            </ol>

            <ul type="square">
                <li>Прокат инструментов</li>
                <li>Доставка</li>
                <li>Онлайн магазин</li>
            </ul>
        </div>
    </div>
</template>