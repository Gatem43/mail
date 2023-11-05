<template>
  <router-view class="bg-dark text-white"/>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App'
})
</script>

<style>
.filterData {
    display: flex;
    justify-content: space-between;
    width: 400px;
  }

  .filterSelect {
    width: 100px;
  }

  .header_menu {
    display: flex;
    justify-content: space-between;
    height: 45px;
    margin-bottom: 15px
  }
</style>
