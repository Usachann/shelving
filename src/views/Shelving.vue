<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import Items from '../components/Item.vue'

import { useCatalogStore } from '../store/catalog'
import type { Item } from '../types/default'

const catalogStore = useCatalogStore()

const sortBy = ref<string>('')
const materialFilter = ref<string>('')

const filteredAndSortedProducts = computed<Item[]>(() => {
  let result = [...catalogStore.items]

  if (materialFilter.value) {
    const filterVal = Number(materialFilter.value)
    result = result.filter((item) => item.material === filterVal)
  }

  if (sortBy.value === 'asc') {
    result.sort((a, b) => a.price.current_price - b.price.current_price)
  } else if (sortBy.value === 'desc') {
    result.sort((a, b) => b.price.current_price - a.price.current_price)
  }

  return result
})

onMounted((): void => {
  if (!catalogStore.items.length) {
    catalogStore.fetchItems()
  }
})
</script>

<template>
  <div class="page">
    <h1 class="page__title">Комплекты стеллажных систем</h1>

    <div class="page__filters filters">
      <label class="filters__label">
        Сортировать по:
        <select v-model="sortBy" class="filters__select">
          <option value="">Без сортировки</option>
          <option value="asc">Цена по возрастанию</option>
          <option value="desc">Цена по убыванию</option>
        </select>
      </label>

      <label class="filters__label">
        Материал:
        <select v-model="materialFilter" class="filters__select">
          <option value="">Все материалы</option>
          <option value="1">Дерево</option>
          <option value="2">Металл</option>
        </select>
      </label>
    </div>

    <div class="page__grid grid">
      <Items
        v-for="product in filteredAndSortedProducts"
        :key="product.id"
        v-bind="product"
        class="grid__item"
      />
    </div>
  </div>
</template>

<style scoped>
.page {
  margin: 0 auto;
  padding: 12px 16px 32px 16px;
}

.page__title {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 24px;
}

.page__filters {
  margin-bottom: 24px;
}

.filters {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}

.filters__label {
  display: flex;
  flex-direction: column;
  font-weight: 500;
  font-size: 14px;
}

.filters__select {
  margin-top: 4px;
  padding: 9px;
  font-size: 14px;
  cursor: pointer;
  border: none;
  background-color: rgba(242, 242, 242, 1);
  width: 288px;
}

.page__grid {
  margin-top: 16px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(336px, 1fr));
  gap: 32px;
  justify-content: center;
  align-items: start;
}

.grid__item {
  display: flex;
  flex-direction: column;
}
</style>
