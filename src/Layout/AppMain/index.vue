<template>
  <el-container>
    <!-- 头部 -->
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
      <div class="dropdown" style="">
        <el-dropdown
          style="font-size: 18px; height: 60px; top: 10px"
          trigger="click"
        >
          <!-- <i class="el-icon-caret-bottom" style="margin-right: 5px"></i> -->
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人信息</el-dropdown-item>
            <el-dropdown-item>
              <span style="text-decoration: none" @click="logout">退出</span>
            </el-dropdown-item>
          </el-dropdown-menu>
          <el-avatar
            style="cursor: pointer; margin-right: 5px"
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          ></el-avatar>
        </el-dropdown>
      </div>
    </el-header>
    <!-- 面包屑 -->
    <Breadcrumb></Breadcrumb>
    <!-- 右侧主体部分 -->
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>
<script>
import Breadcrumb from "@/components/breadcrumb";
export default {
  data() {
    return {
      tableData: [],
      searchContent: "",
      currentPage: 1,
      pageSize: 7,
      total: 100,
      // 嵌套表单数据
      dialogFormVisible: false,
      dialogTitle: ["新增用户", "编辑用户信息"],
      dialogIndex: 0,
      form: {
        id: 0,
        username: "",
        password: "",
      },
      formLabelWidth: "120px",
      multipleSelection: [],
    };
  },
  components: {
    Breadcrumb,
  },
  props: ["isCollapse"],
  methods: {
    collapseIcon() {
      this.$emit("changeCollapse");
    },
    //初始化列表
    initTableData() {
      this.$axios
        .get(
          `http://localhost/user/getPage?pageNum=${this.currentPage}&pageSize=${this.pageSize}&username=${this.searchContent}`
        )
        .then((res) => {
          this.total = res.data.total;
          this.tableData = res.data.records;
        });
    },
    //当分页组件的pageSize变化时
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.$axios
        .get(
          `http://localhost/user/getPage?pageNum=${this.currentPage}&pageSize=${pageSize}&username=${this.searchContent}`
        )
        .then((res) => {
          this.currentPage = 1;
          this.tableData = res.data.records;
          this.initTableData();
        });
    },
    //当分页组件的currentPage变化时
    handleCurrentChange(currentPage) {
      this.$axios
        .get(`http://localhost/user/getPage`, {
          params: {
            pageNum: currentPage,
            pageSize: this.pageSize,
            username: this.searchContent,
          },
        })
        .then((res) => {
          this.tableData = res.data.records;
        });
    },
    // 开始搜索
    searchCommit() {
      // const user = `{"username": ${this.searchContent}}`;
      // console.log(user, "user");
      this.$axios
        .get(
          `/user/getPage?pageNum=${this.currentPage}&pageSize=${this.pageSize}&username=${this.searchContent}`
        )
        .then((res) => {
          // console.log(
          //   "currentPage",
          //   this.currentPage,
          //   "pageSize",
          //   this.pageSize,
          //   "searchContent",
          //   this.searchContent
          // );

          this.tableData = res.data.records;
          this.total = res.data.total;
        });
    },
    // 根据id来获取用户名信息
    findById(row) {
      this.dialogFormVisible = true;
      this.dialogIndex = 1;
      this.$axios.get(`http://localhost/user/${row.id}`).then((res) => {
        this.form.id = row.id;
        this.form.username = res.data.username;
        this.form.password = res.data.password;
      });
    },
    // 修改用户名信息
    changeUser(userInfo) {
      console.log("userInfo", userInfo);
      this.$axios
        .post("http://localhost/user", userInfo)
        .then((res) => {
          console.log("res", res);
          this.initTableData();
          this.$message.success("修改成功！");
        })
        .catch((err) => {
          this.$message.error("修改失败，原因是:", err);
        });
    },
    //初始化新增按钮
    handleSaveUser() {
      this.dialogIndex = 0;
      this.dialogFormVisible = true;
      this.form.id = 0;
      this.form.username = "";
      this.form.password = "";
    },
    //新增用户
    saveUser() {
      var user = {};
      user.username = this.form.username;
      user.password = this.form.password;
      this.$axios
        .post("/user", user)
        .then((res) => {
          this.initTableData();

          this.$message.success("新增成功！");
        })
        .catch((err) => {
          this.$message.error("新增失败，原因是:", err);
        });
      this.total++;

      this.currentPage = Math.ceil(this.total / this.pageSize);
    },
    //删除用户
    deleteUser(id) {
      this.$axios
        .delete("/user/" + id + "")
        .then(() => {
          this.$message.success("删除用户成功！");
          this.currentPage = parseInt(this.total / this.pageSize);
          this.initTableData();
        })
        .catch((err) => {
          this.$message.error("删除用户失败");
        });
    },
    //重置搜索框内容
    resetSearch() {
      this.searchContent = "";
      this.initTableData();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    delBatchUser() {
      this.$confirm("此操作将批量删除选择的用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          var selectval = this.multipleSelection;
          //循环拿出id
          var ids = [];
          var _this = this;
          selectval.forEach(function (item, index) {
            ids[index] = item.id;
          });
          this.$axios.delete("/user?ids=" + ids).then(function (response) {
            _this.$message.success("批量删除成功！");
            _this.currentPage = parseInt(_this.total / _this.pageSize);
            _this.initTableData();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    logout() {
      this.$router.push("/login");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      this.$message.success("退出成功");
    },
  },
  created() {
    this.initTableData();
  },
};
</script>
<style scoped>
.el-main {
  background-color: white;
  padding: 0;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}
.breadCrumb {
  position: relative;
  height: 40px;
  /* background-color: #333; */
  border-bottom: 1px solid #c8c6c6;
}
.el-breadcrumb {
  /* position: absolute;
    bottom: 5px; */
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  margin-left: 20px;
}
</style>