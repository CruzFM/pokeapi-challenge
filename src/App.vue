<template>
  <div class="bg-slate-100">
    <Loading v-if="isLoading" />
    <RouterView v-else />
  </div>
</template>

<script>
import { RouterView } from "vue-router";
import Loading from "@/components/Loading.vue";
import { loadingState } from "@/router"; 

export default {
  components: {
    RouterView,
    Loading
  },
  computed:{
    isLoading(){
      return loadingState.isLoading
    }
  },
};
</script>
