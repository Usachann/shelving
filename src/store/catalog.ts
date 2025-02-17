import { defineStore } from 'pinia'
import itemsData from '../data/items.json'
import materialsData from '../data/materials.json'
import type { Item, Material } from '../types/default'

const FAVORITES_KEY = 'favorites'

export const useCatalogStore = defineStore('catalog', {
  state: () => ({
    items: [] as Item[],
    materials: [] as Material[],
    favorites: JSON.parse(
      localStorage.getItem(FAVORITES_KEY) || '[]',
    ) as string[],
  }),

  actions: {
    fetchItems() {
      this.items = JSON.parse(JSON.stringify(itemsData))
    },
    fetchMaterials() {
      this.materials = JSON.parse(JSON.stringify(materialsData))
    },

    toggleFavorite(id: string) {
      if (this.favorites.includes(id)) {
        this.favorites = this.favorites.filter((favId) => favId !== id)
      } else {
        this.favorites.push(id)
      }
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(this.favorites))
    },

    isFavorite(id: string) {
      return this.favorites.includes(id)
    },
  },
})
