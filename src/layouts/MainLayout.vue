<script setup>
import HeaderBlock from '@/blocks/HeaderBlock.vue';
import FooterBlock from '@/blocks/FooterBlock.vue';
import LeftAsideBlock from '@/blocks/LeftAsideBlock.vue';
import RigthAsideBlock from '@/blocks/RigthAsideBlock.vue';
</script>

<template>
    <div class="container">
        <HeaderBlock />
        <main>
            <LeftAsideBlock />
            <RouterView />
            <RigthAsideBlock />
        </main>
        <FooterBlock />
    </div>
</template>

<style>
.container {
    height: 100%;
    display: flex;
    flex-direction: column;
}

main {
    flex: 1 1;
}
</style>