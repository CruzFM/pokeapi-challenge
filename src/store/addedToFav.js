import { defineStore } from "pinia";

export const useAddedToFav = defineStore("addedToFav", {
    state: ()=>{
        return {
            favorites: JSON.parse(localStorage.getItem('favorites')) || []
        }
    },
    actions: {
        toggleFavorite( newPokemon ) {
            const isFavorite = this.favorites.includes(newPokemon);
            if (isFavorite){
                this.favorites = this.favorites.filter(pokemon => pokemon.name !== newPokemon.name);
            } else {
                this.favorites = [...this.favorites, newPokemon];
            }
            localStorage.setItem('favorites', JSON.stringify(this.favorites));
        }
    }
})