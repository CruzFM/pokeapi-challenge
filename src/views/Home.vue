<template>
  <div class="flex flex-col items-center max-w-xl mx-auto">
    <form class="w-4/5 py-9" @submit.prevent="searchPokemon(searchValue)">
      <div class="relative w-full">
        <input
          placeholder="Search"
          class="border w-full pl-10 rounded-md py-2 pr-4 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          v-model="searchValue"
        />
        <img
          src="@/assets/icons/search-icon.png"
          width="22"
          class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
        />
      </div>
    </form>
    <EmptyResults v-if="noResults" />
    <div v-else class="w-4/5 space-y-3 pt-2 pb-20">
      <div
        v-for="(element, index) in filteredList"
        :key="`${element.name}-${index}`"
        class="border border-black flex justify-between items-center px-3 py-2 rounded-md bg-white"
      >
        <p class="text-xl capitalize" @click="openModal(element)">
          {{ element.name }}
        </p>
        <Button
          :icon="isFavorite(element.name) ? starFilledIcon : starIcon"
          :handleClick="() => addedToFavStore.toggleFavorite(element)"
          class="bg-slate-200"
        />
      </div>

      <Modal
        v-if="isModalOpen"
        :isModalOpen="isModalOpen"
        :selectedElement="selectedElement"
        :searchPokemon="searchPokemon"
        :isFavorite="isFavorite"
        @close="closeModal"
      />
    </div>
    
    <footer
      class="fixed bottom-0 left-0 w-full h-16 bg-white border flex justify-center items-center shadow-xl gap-5"
    >
      <Button
        :handleClick="() => setCurrentView('all')"
        :icon="listIcon"
        text="All"
        :isActive="currentView === 'all'"
        class="!px-20"
      />
      <Button
        :handleClick="() => setCurrentView('favorites')"
        variant="secondary"
        :icon="starIcon"
        :isActive="currentView === 'favorites'"
        text="Favorites"
        class="!px-16"
      />
    </footer>
  </div>
</template>
<script>
import { mapStores } from "pinia";
import { useAddedToFav } from "../store/addedToFav";
import EmptyResults from "@/components/EmptyResults.vue";
import PokemonDetails from "@/components/PokemonDetails.vue";
import Modal from "../components/Modal.vue";
import Button from "@/components/Button.vue";
import starIcon from "@/assets/icons/star-icon.png";
import starFilledIcon from "@/assets/icons/star-filled-icon.png"
import listIcon from "@/assets/icons/list-icon.png";

export default {
  data() {
    return {
      starIcon,
      starFilledIcon,
      listIcon,
      searchValue: "",
      pokemonList: [],
      endpointBase: "https://pokeapi.co/api/v2/pokemon",
      noResults: false,
      isModalOpen: false,
      selectedElement: null,
      currentView: "all"
    };
  },
  computed:{
    ...mapStores(useAddedToFav),
    filteredList(){
      return this.currentView === "favorites"
        ? this.addedToFavStore.favorites
        : this.pokemonList
    },
    isFavorite(){
      return ( pokemon ) => this.addedToFavStore.favorites.some(fav => fav.name === pokemon)
    }
  },
  components: {
    Button,
    EmptyResults,
    PokemonDetails,
    Modal,
  },
  methods: {
    getAllPokemons() {
      fetch(`${this.endpointBase}?limit=10000&offset=0`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.noResults = false;
          this.pokemonList = [...this.pokemonList, ...data.results];
        });
    },
    searchPokemon(pokemon) {
      const trimmedValue = pokemon.trim()
      const endpoint = `${this.endpointBase}/${trimmedValue}`;
      fetch(endpoint)
        .then((response) => {
          this.$router.push({
            path: "/home",
            query: { query: pokemon },
          });
          if (!response.ok) {
            this.pokemonList = [];
            this.noResults = true;
            throw new Error(`Error in response! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          this.noResults = false;
          if (pokemon.length > 0) {
            this.pokemonList = [data];
          } else {
            this.$router.push({ path: "/home" });
            this.pokemonList = data.results;
          }
        })
        .catch((error) => console.error("Error searching data: ", error));
    },
    openModal(element) {
      this.selectedElement = element;
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    setCurrentView( value ){
      this.currentView = value;
      console.log(this.currentView)
    }
  },
  watch: {
    "$route.query.query": {
      immediate: true,
      handler(newQuery) {
        if (newQuery) {
          this.searchValue = newQuery;
          console.log(this.searchValue);
          this.searchPokemon(this.searchValue);
        } else {
          (this.searchValue = ""), this.getAllPokemons();
        }
      },
    },
  },
  mounted() {
    if (!this.$route.query.query) {
      this.getAllPokemons();
    }
  },
};
</script>
