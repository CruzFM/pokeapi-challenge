<template>
    <div class="w-4/5 flex flex-col items-center justify-center gap-4">
        <h2 class="font-bold text-4xl">Uh-oh!</h2>
        <p class="text-xl font-medium mb-2 text-gray-500">You look lost on your journey!</p>
        <Button :to="'/home'" :text="'Go back home'"/>
    </div>
</template>
<script>
import Button from '@/components/Button.vue'
export default {
    components:{
        Button
    }
}
</script>