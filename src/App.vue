<template>
   <div id="app">
      <router-view></router-view>
   </div>

</template>

<script>
export default {
  name: 'app',
   data () {
      return {

      }
   },
   methods: {
      goHome() {
         this.$router.push('/')
      }
   }

}
</script>

<style>
   @import './assets/css/bootstrap.min.css';
</style>
