<template>
  <div class="flex flex-col items-center max-w-xl mx-auto">
    <form>
      <input placeholder="Search" class="border" />
    </form>
    <div class="w-4/5 space-y-3">
      <div
        v-for="element in elements"
        :key="element.id"
        class="border border-black flex justify-between items-center px-3 py-2 rounded-md bg-white"
      >
        <p class="text-xl">{{ element.name }}</p>
        <span>icon</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      elements: [
        { id: 1, name: "Bulbasaur", type: ["Grass", "Poison"] },
        { id: 4, name: "Charmander", type: ["Fire"] },
        { id: 7, name: "Squirtle", type: ["Water"] },
        { id: 10, name: "Caterpie", type: ["Bug"] },
        { id: 16, name: "Pidgey", type: ["Normal", "Flying"] },
        { id: 19, name: "Rattata", type: ["Normal"] },
        { id: 23, name: "Ekans", type: ["Poison"] },
        { id: 25, name: "Pikachu", type: ["Electric"] },
        { id: 27, name: "Sandshrew", type: ["Ground"] },
        { id: 35, name: "Clefairy", type: ["Fairy"] },
        { id: 37, name: "Vulpix", type: ["Fire"] },
        { id: 39, name: "Jigglypuff", type: ["Normal", "Fairy"] },
        { id: 41, name: "Zubat", type: ["Poison", "Flying"] },
        { id: 50, name: "Diglett", type: ["Ground"] },
        { id: 52, name: "Meowth", type: ["Normal"] },
        { id: 54, name: "Psyduck", type: ["Water"] },
        { id: 58, name: "Growlithe", type: ["Fire"] },
        { id: 60, name: "Poliwag", type: ["Water"] },
        { id: 66, name: "Machop", type: ["Fighting"] },
        { id: 69, name: "Bellsprout", type: ["Grass", "Poison"] },
      ],
    };
  },
};
</script>
