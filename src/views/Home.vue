<template>
  <div class="flex flex-col items-center max-w-xl mx-auto">
    <form class="w-4/5 py-9" @submit.prevent="searchPokemon">
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
        v-for="element in pokemonList"
        :key="element.name"
        class="border border-black flex justify-between items-center px-3 py-2 rounded-md bg-white"
      >
        <p class="text-xl">{{ element.name }}</p>
        <Button
          :icon="starIcon"
          :handleClick="() => console.log('Bien ferchu!')"
        />
      </div>
      <footer
        class="fixed bottom-0 left-0 w-full h-16 bg-white border flex justify-center items-center shadow-xl gap-5"
      >
        <Button :handleClick="()=> console.log('all')" :icon="listIcon"
          text="All"
          :isActive="true"
          class="px-20"
          />
        <Button :handleClick="()=> console.log('favorites')" 
          variant="secondary"
          :icon="starIcon"
          text="Favorites"
          class=" px-16"
          />
      </footer>
    </div>
  </div>
</template>
<script>
import Button from "@/components/Button.vue";
import starIcon from "@/assets/icons/star-icon.png";
import listIcon from "@/assets/icons/list-icon.png"
import EmptyResults from "@/components/EmptyResults.vue";

export default {
  data() {
    return {
      starIcon,
      listIcon,
      searchValue: "",
      pokemonList: [],
      endpointBase: "https://pokeapi.co/api/v2/pokemon",
      mainEndpoint: "https://pokeapi.co/api/v2/pokemon",
      noResults: false,
    };
  },
  components: {
    Button,
    EmptyResults,
  },
  methods: {
    getAllPokemons() {
      fetch(this.endpointBase)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.noResults = false;
          this.pokemonList = [...this.pokemonList, ...data.results];
        });
    },
    searchPokemon() {
      const endpoint = `${this.endpointBase}/${this.searchValue}`;
      fetch(endpoint)
        .then((response) => {
          this.$router.push({
            path: "/home",
            query: { query: this.searchValue },
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
          if (this.searchValue.length > 0) {
            this.pokemonList = [data];
          } else {
            this.$router.push({ path: "/home" });
            this.pokemonList = data.results;
          }
        })
        .catch((error) => console.error("Error searching data: ", error));
    },
  },
  watch: {
    "$route.query.query": {
      immediate: true,
      handler(newQuery) {
        if (newQuery) {
          this.searchValue = newQuery;
          this.searchPokemon();
        } else {
          (this.searchValue = ""), this.getAllPokemons();
        }
      },
    },
  },
  mounted() {
    this.getAllPokemons();
  },
};
</script>
