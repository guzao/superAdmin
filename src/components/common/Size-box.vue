<template>
  <div class="_size-box" :style="userStyle">  </div>
</template>

<script lang="ts" setup>
  import { defineProps, computed } from 'vue'
  

  const props = defineProps({ 
    height: {
      type: String , 
      required: false, 
      default: '10px'
    },
    width: {
      type: String , 
      required: false, 
      default: 0
    },
    block: {
      type: Boolean,
      required: false, 
      default: true
    }
  })
  
  const userStyle = computed(() => {
    return props.width 
      ? { height: props.height, width: props.width, display: props.block ? 'block' : 'inline-block' }
      : { height: props.height, display: props.block ? 'block' : 'inline-block' }
  })

</script>
