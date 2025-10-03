<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container">
    <HomeCategory />
    <HomeBanner />
  </div>
  <HomeNew />
  <HomeHot/>
  <homeProduct />
</template>
<script setup>
import HomeCategory from '@/views/Home/components/HomeCategory.vue'
import HomeBanner from '@/views/Home/components/HomeBanner.vue'
import HomeNew from '@/views/Home/components/HomeNew.vue'
import HomeHot from './components/HomeHot.vue'
import HomeProduct from '@/views/Home/components/HomeProduct.vue'
</script>

<style></style>