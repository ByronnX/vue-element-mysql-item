<template>
  <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
    <el-breadcrumb-item
      v-for="(item, index) in breadList"
      :key="index"
      :to="{ path: item.path }"
      >{{ item.meta.title }}</el-breadcrumb-item
    >
  </el-breadcrumb>
</template>
<script>
export default {
  name: "Breadcrumb",
  data() {
    return {
      breadList: [],
    };
  },
  created() {
    this.getBreadcrumb();
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    },
  },
  methods: {
    getBreadcrumb() {
      if (Object.keys(this.$route.matched[0].meta).length > 0) {
        this.breadList = this.$route.matched;
      } else {
        this.breadList = [];
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;
}
// .el-breadcrumb {
//   text-align: center;
//   height: 50px;
//   line-height: 50px;
//   padding-left: 15px;
//   font-size: 14px;
// }
</style>
