import { defineStore } from "pinia";

export const useAddedToFav = defineStore("addedToFav", {
    state: ()=>{
        return {
            addedToFav: []
        }
    },
    actions: {
        setNewFav( id ){
            console.log(`Agregado a favoritos: ${id}`)
        }
    }
})