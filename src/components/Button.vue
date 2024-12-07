<template>
    <router-link 
        v-if="to" 
        :to="to" 
        :class="`${classes['base']} ${classes[variant]}`"
    >{{ text }}</router-link>
    <button 
        v-else @click="handleClick" 
        :class="computedClass"
        :active="isActive"
    >
        <img v-if="icon" :src="icon" alt="icon" class="mr-2 w-[22px]"/>
        {{ text }}
    </button>
</template>

<script>
import { RouterLink } from 'vue-router';
export default {
    name: "Button",
    components:{
        RouterLink
    },
    props:{
        to: {
            type: String,
            default: null
        },
        handleClick: {
            type: Function,
            validator: function (value) {
                if (this.to === null){
                    return value !== undefined;
                }
                return true;
            }
        },
        text: String,
        variant: {
            type: String,
            default: 'primary',
            validator: function(value) {
                return ['primary', 'secondary'].includes(value)
            }
        },
        icon: {
            type: String,
            default: null
        },
        isActive: Boolean
    },
    data(){
        return{
            classes: {
                base: "w-[141px] rounded-[60px] py-3 px-5 font-semibold text-white flex justify-center items-center",
                primary: "bg-[#f22539] hover:bg-[#c00e20]",
                secondary: "bg-[#bfbfbf] hover:bg-[#7E7B7B]"
            }
        }
    },
    computed: {
        computedClass(){
            let base = this.classes.base
            let variantClass = this.classes[this.variant]
            if(this.icon){
                return this.isActive 
                    ? `${base} ${this.classes.primary}`
                    : `${base} ${this.classes.secondary}`;
            }
            return `${base} ${variantClass}` 
        }
    }
}
</script>