import { defineStore } from "pinia";

export const useAddedToFav = defineStore("addedToFav", {
    state: ()=>{
        return {
            favorites: []
        }
    },
    actions: {
        setNewFav( name ){
            this.favorites = [...this.favorites, name];
            console.log(`Agregado a favoritos: ${name}`)
            console.log("los agregados a favoritos son: ", this.favorites)
        }
    }
})