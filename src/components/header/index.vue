<template>
  <el-header style="display: flex">
    <!-- 头部左侧的折叠按钮 -->
    <div class="collapseIcon" style="flex: 1; font-size: 28px">
      <i
        class="el-icon-s-unfold"
        v-if="isCollapse"
        @click="collapseIcon"
        style="cursor: pointer"
      ></i>
      <i
        class="el-icon-s-fold"
        v-else
        @click="collapseIcon"
        style="cursor: pointer"
      ></i>
    </div>
    <!-- 头部右侧的下拉按钮 -->
    <div class="dropdown" style="cursor: pointer">
      <el-dropdown style="font-size: 18px; height: 60px; top: 10px">
        <el-avatar
          style=""
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        ></el-avatar>
        <i class="el-icon-caret-bottom" style="margin-right: 5px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人信息</el-dropdown-item>
          <el-dropdown-item>
            <span style="text-decoration: none" @click="logout">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-header>
</template>
<script>
export default {
  name: "",
  data() {
    return {};
  },
  methods: {
    logout() {
      this.$router.push("/login");
      localStorage.removeItem("user");
      this.$message.success("退出成功");
    },
    collapseIcon() {
      this.$emit("changeCollapse");
    },
  },

  created() {},
  mounted() {},
};
</script>
<style lang="scss">
</style>
