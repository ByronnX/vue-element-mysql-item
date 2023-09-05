<template>
  <el-menu
    default-active="1-4-1"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    style="user-select: none"
  >
    <el-menu-item style="">
      <i class="el-icon-ice-cream-round"></i>
      <span slot="title" style="font-size: 16px">胡编乱造管理系统</span>
    </el-menu-item>
    <el-menu-item index="1" @click="toDashboard()">
      <i class="el-icon-menu"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span slot="title">用户管理</span>
      </template>
      <el-menu-item index="1-1" @click="toUser()">
        <span slot="title">用户列表</span>
      </el-menu-item>
      <el-menu-item index="1-2" @click="toHome()">
        <span slot="title">测试</span>
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>
<script>
export default {
  name: "Sidebar",
  props: ["isCollapse"],
  data() {
    return {};
  },
  methods: {
    collapseIcon() {
      this.$emit("changeCollapse");
    },
    toDashboard() {
      this.$router.push("/dashboard");
    },
    toUser() {
      this.$router.push("/user/maneger");
    },
    toHome() {
      this.$router.push("/user/home");
    },
  },
  created() {},
  mounted() {},
};
</script>
<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-aside {
  color: #333;
}
</style>
