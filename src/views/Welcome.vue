<template>
  <div class="py-20">
    <div class="py-20 flex flex-col items-center">
      <div class="relative w-60 h-60 flex justify-center items-center">
        <div
          class="absolute w-40 h-40 rounded-full bg-red-500 border-4 border-black"
        ></div>
        <img
          src="../assets/welcome/welcome-image.png"
          alt="Pikachu"
          class="absolute w-full -translate-y-4 top-[9.5px] left-[8px]"
        />
      </div>
      <h1>Welcome to Pokédex</h1>
      <p>
        The digital encyclopedia created by Professor Oak is an invaluable tool
        to Trainers in the Pokémon world.
      </p>
      <Button to="/home" text="Get started" variant="primary" />
    </div>
  </div>
</template>

<script>
import Button from "../components/Button.vue";
import listIcon from "@/assets/icons/list-icon.png";
import StarIcon from "@/assets/icons/star-icon.png";

export default {
  components: {
    Button,
  },
  data() {
    return {
      listIcon,
      StarIcon,
      isActive: false,
    };
  },
};
</script>
