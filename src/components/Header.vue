<script setup lang="ts">
import { ref } from 'vue'

const breadcrumbs = ref([
  { text: 'Главная', disabled: false, href: '/' },
  { text: 'Системы хранения', disabled: true },
  { text: 'Комплекты стеллажных систем', disabled: false, href: '/shelving' },
])
</script>

<template>
  <div class="home-page">
    <nav class="home-page__breadcrumbs breadcrumbs">
      <ul class="breadcrumbs__list">
        <li
          v-for="(breadcrumb, index) in breadcrumbs"
          :key="index"
          class="breadcrumbs__item"
        >
          <span
            v-if="breadcrumb.disabled"
            class="breadcrumbs__text breadcrumbs__text--disabled"
          >
            {{ breadcrumb.text }}
          </span>
          <router-link v-else :to="breadcrumb.href" class="breadcrumbs__link">
            {{ breadcrumb.text }}
          </router-link>
          <span
            v-if="index < breadcrumbs.length - 1"
            class="breadcrumbs__separator"
          >
            /
          </span>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style scoped>
.home-page {
  padding: 20px;
}

.breadcrumbs__list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
}

.breadcrumbs__item {
  display: inline-flex;
  align-items: center;
}

.breadcrumbs__link {
  text-decoration: none;
  font-size: 16px;
  color: #000;
  transition: color 0.2s;
}

.breadcrumbs__link:hover {
  text-decoration: underline;
}

.breadcrumbs__text--disabled {
  color: #aaa;
}

.breadcrumbs__separator {
  margin: 0 8px;
  color: #000;
}
</style>
