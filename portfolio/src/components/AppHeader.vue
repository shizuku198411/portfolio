<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
    <header>
        <div class="container header__inner">
            <div class="header__brand">
                <RouterLink to="/">Shizuku</RouterLink>
            </div>
            <nav class="header__nav">
                <RouterLink to="/">Home</RouterLink>
            </nav>
        </div>
    </header>
</template>