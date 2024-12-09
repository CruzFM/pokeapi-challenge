<template>
  <div
    class="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 z-50"
  >
    <div
      class="bg-white w-4/5 max-w-3xl rounded-lg shadow-lg relative flex flex-col"
    >
      <div
        class="relative h-56 bg-cover bg-center rounded-t-lg"
        :style="{ backgroundImage: `url('${backgroundImage}')` }"
      >
        <img
          v-if="pokemonImage"
          :src="pokemonImage"
          alt="Pokemon"
          class="absolute inset-0 mx-auto my-auto w-52"
        />
        <Button 
            :icon="closeIcon"
             class="absolute top-2 right-2 z-10 p-0"
             @click="$emit('close')"
        />
      </div>

      <div class="p-6 flex-grow">
        <ul v-if="pokemonDetails" class="space-y-2">
            <li class="py-2 border-b-2">
                <strong>Name:</strong> <p class="inline capitalize">{{ pokemonDetails.name }}</p>
            </li>
            <li class="py-2 border-b-2">
                <strong>Weight:</strong> <p class="inline">{{ pokemonDetails.weight }}</p>
            </li>
            <li class="py-2 border-b-2">
                <strong>Height:</strong> <p class="inline">{{ pokemonDetails.height }}</p>
            </li>
            <li class="py-2 border-b-2 flex gap-1">
                <strong>Types:</strong>
                <p class="inline capitalize">
                {{ pokemonDetails.types.map((type) => type.type.name).join(', ') }}
                </p>
            </li>
        </ul>
        <p v-else>Cargando información del Pokémon...</p>
      </div>
      <div
        class="flex justify-between items-center px-6 py-4 rounded-b-lg"
      >
        <Button 
         variant="primary"
         text="Share to my friends"
         :handleClick="()=>console.log('compartir!')"
        />
        <Button 
         :handleClick="()=>console.log('compartir!')"
         :icon="starIcon"
         class="bg-slate-200"
        />
      </div>
    </div>
  </div>
</template>

<script>
import backgroundImage from "@/assets/background/modal-bg.png";
import Button from "./Button.vue";
import starIcon from "@/assets/icons/star-icon.png"
import closeIcon from "@/assets/icons/close-btn.png"

export default {
  name: "Modal",
  components:{
    Button
  },
  props: {
    isModalOpen: {
      type: Boolean,
      required: true,
    },
    selectedElement: {
      type: Object,
      default: () => ({}),
    },
    searchPokemon: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      pokemonDetails: null,
      pokemonImage: null,
      backgroundImage,
      starIcon,
      closeIcon
    };
  },
  methods: {
    fetchPokemon(name) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then((response) => {
          if (!response.ok) throw new Error("Error fetching Pokémon");
          return response.json();
        })
        .then((data) => {
          this.pokemonDetails = data;
          this.pokemonImage = data.sprites.front_default;
          console.log("data fetcheada!!!: ", data);
        })
        .catch((error) => {
          console.error("Error fetching Pokémon:", error);
          this.pokemonDetails = null;
        });
    },
  },
  mounted() {
    this.fetchPokemon(this.selectedElement?.name);
    document.body.classList.add("overflow-hidden");
  },
  beforeUnmount() {
    document.body.classList.remove("overflow-hidden");
  },
};
</script>
