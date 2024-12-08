<template>
    <router-link 
        v-if="to" 
        :to="to" 
        :class="`${classes['base']} ${classes[variant]}`"
    >{{ text }}</router-link>
    <button 
        v-else 
        @click="handleClick" 
        :class="computedClass"
        :active="isActive"
    >
        <img v-if="icon" :src="icon" alt="icon" class="w-[22px]"/>
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
            validator(value, props){
                return !(props.to === undefined && value === undefined)
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
                base: "font-semibold text-white flex justify-center items-center text-lg",
                primary: "bg-[#f22539] hover:bg-[#c00e20]",
                secondary: "bg-[#bfbfbf] hover:bg-[#7E7B7B]",
                widthText: "py-2 px-5 w-[141px] rounded-[60px] gap-2",
                iconOnlyWidth: "p-2 w-auto h-auto rounded-full"
            }
        }
    },
    computed: {
        computedClass(){
            let sizeClass = this.text
                ? this.classes.widthText
                : this.classes.iconOnlyWidth
            let baseClass = `${this.classes.base} ${sizeClass}`;
            if(this.icon){
                return this.isActive 
                    ? `${baseClass} ${this.classes.primary}`
                    : `${baseClass} ${this.classes.secondary}`;
            }
            return `${baseClass} ${this.classes[this.variant]}`;
        },
    },
}
</script>