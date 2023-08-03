<template>
  <div class="layout">
    <div class="sidebar">sidebar</div>
    <div class="mainContainer">
      <div class="navbar">navbar</div>
      <div class="appmain">appmain</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  data() {
    return {};
  },
  methods: {},
  created() {},
  mounted() {},
};
</script>
<style scoped>
.layout {
  position: relative;
  top: 0;
  left: 0;
  height: 100%;
}
.sidebar {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background-color: aquamarine;
  width: 200px;
}
.mainContainer {
  margin-left: 200px;
  height: 100%;
  background-color: rebeccapurple;
  overflow: hidden;
}
.navbar {
  height: 100px;
  background-color: blanchedalmond;
}
.appmain {
  height: 100%;
  background-color: tomato;
}
</style>
