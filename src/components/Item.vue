<script setup lang="ts">
import { defineProps, computed } from 'vue'
import type { Item } from '../types/default'
import { formatNumber } from '../utils/pricingUtils'
import { useCatalogStore } from '../store/catalog'

const props = defineProps<Item>()
const catalogStore = useCatalogStore()

const isFavorite = computed(() => catalogStore.isFavorite(props.id))

const toggleFavorite = () => {
  catalogStore.toggleFavorite(props.id)
}

const hasDiscount = (oldPrice: number | null, currentPrice: number) => {
  return oldPrice !== null && currentPrice !== null && oldPrice > currentPrice
}
</script>

<template>
  <article class="product-card">
    <div class="product-card__image-container">
      <span
        v-if="hasDiscount(props.price.old_price, props.price.current_price)"
        class="product-card__discount-label"
      >
        Скидка
      </span>
      <img
        :src="props.image.url"
        :alt="props.name"
        loading="lazy"
        class="product-card__image"
      />
    </div>

    <div class="product-card__info">
      <p v-if="props.code" class="product-card__code">{{ props.code }}</p>
      <h3 class="product-card__name">{{ props.name }}</h3>

      <div class="product-card__price-container">
        <span
          v-if="hasDiscount(props.price.old_price, props.price.current_price)"
          class="product-card__old-price"
        >
          {{ formatNumber(props.price.old_price || 0) }}
        </span>
        <span class="product-card__current-price">
          {{ formatNumber(props.price.current_price) }}
        </span>
      </div>

      <button class="product-card__favorite" @click="toggleFavorite">
        <img
          v-if="isFavorite"
          src="../assets/circle-checked.svg"
          alt="Выбрано"
          class="product-card__favorite-icon product-card__favorite-icon--checked"
        />
        <img
          v-else
          src="../assets/heart.svg"
          alt="Добавить в избранное"
          class="product-card__favorite-icon"
        />
      </button>
    </div>
  </article>
</template>

<style scoped lang="scss">
.product-card {
  width: 336px;
  height: 352px;
  display: flex;
  flex-direction: column;
  background: #fff;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(238, 238, 238, 1);

  &__image-container {
    position: relative;
    width: 100%;
    height: 237px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__discount-label {
    position: absolute;
    top: 8px;
    left: 0;
    background: rgba(235, 87, 87, 1);
    color: #fff;
    font-size: 14px;
    font-weight: bold;
    padding: 4px 12px;
    text-align: center;
  }

  &__image {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    margin-top: 9px;
  }

  &__info {
    justify-content: flex-end;
    padding: 10px 12px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }

  &__code {
    font-size: 14px;
    color: #777;
    margin-bottom: 5px;
  }

  &__name {
    font-size: 18px;
    font-weight: 600;
    color: #333;
    margin-bottom: 10px;
  }

  &__price-container {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__old-price {
    font-size: 16px;
    color: #888;
    text-decoration: line-through;
  }

  &__current-price {
    font-size: 16px;
    font-weight: 600;
    color: #000;
  }

  &__favorite {
    position: absolute;
    bottom: 12px;
    right: 12px;
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
  }

  &_favorite-icon {
    width: 24px;
    height: 24px;
    transition: opacity 0.2s;
  }

  &__favorite-icon--checked {
    width: 20px;
    height: 20px;
    margin-right: 5px;
    opacity: 1;
  }
}
</style>
