import { defineStore } from "pinia";

export const useAddedToFav = defineStore("addedToFav", {
    state: ()=>{
        return {
            addedToFav: []
        }
    },
    actions: {
        setNewFav( name ){
            this.addedToFav = [...this.addedToFav, name];
            console.log(`Agregado a favoritos: ${name}`)
            console.log("los agregados a favoritos son: ", this.addedToFav)
        }
    }
})