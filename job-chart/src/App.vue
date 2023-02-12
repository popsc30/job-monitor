<template>
  <div id="app">
    <VueHighcharts />
    <br>
    <VueHighchartsAkl />
  </div>
</template>
<script>
import VueHighcharts from "./components/VueHighcharts.vue";
import VueHighchartsAkl from "./components/VueHighchartsAkl.vue";
export default {
  name: "App",
  components: {
    VueHighcharts,
    VueHighchartsAkl
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
