import { defineStore } from 'pinia';

export const useShoppingCartStore = defineStore('shoppingCart', {

    state: () => ({
        isCartOpen: false,
    }),

    actions: {
        openCart() {
            this.isCartOpen = true;
        },

        closeCart() {
            this.isCartOpen = false;
        }
    }
})