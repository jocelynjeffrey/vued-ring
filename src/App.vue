<template>
  <div id="app">
    <Mood />
  </div>
</template>

<script>
import Mood from './components/Mood';

export default {
  name: 'App',
  components: {
    Mood,
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #eaf2fa;
}
body {
  background: #171C21;
}
</style>
