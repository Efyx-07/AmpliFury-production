import { defineStore } from 'pinia';

export const useShoppingCartStore = defineStore('shoppingCart', {
    state: () => ({
        isCartOpen: false,
        isTransitioning: false,
    }),

    actions: {
        startOpeningTransition() {
            this.isTransitioning = true;
            this.isCartOpen = true;
        },

        startClosingTransition() {
            this.isTransitioning = true;
            this.isCartOpen = false;
        },

        finishTransition() {
            this.isTransitioning = false;
        },

        toggleCart() {
            if (this.isCartOpen) {
                this.startClosingTransition();
            } else {
                this.startOpeningTransition();
            }
            setTimeout(() => {
                this.finishTransition();
            }, 300); 
        },
    },
});