<template>
  <div class="Layout" style="height: 100%">
    <el-container style="height: 100%">
      <!-- 左侧侧边栏 -->
      <Sidebar
        :isCollapse="isCollapse"
        @changeCollapse="changeCollapse"
      ></Sidebar>
      <!-- 右侧整体 -->
      <AppMain
        :isCollapse="isCollapse"
        @changeCollapse="changeCollapse"
      ></AppMain>
    </el-container>
  </div>
</template>
  
<script>
import Sidebar from "@/Layout/Sidebar";
import AppMain from "@/Layout/AppMain";
export default {
  name: "Layout",
  components: { Sidebar, AppMain },
  data() {
    return {
      isCollapse: false,
    };
  },
  methods: {
    changeCollapse() {
      this.isCollapse = !this.isCollapse;
    },
  },
};
</script>
<style>
</style>