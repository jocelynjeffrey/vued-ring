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

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #eaf2fa;
  font-weight: bold;
  font-size: 16px;
}
body {
  background: #171C21;
}
.btn {
  cursor: pointer;
  padding: 10px 40px;
  border: none;
  border-radius: 15px;
  background: #4A6182;

    &:hover {
      background: #384D6F;
    }
}

</style>
