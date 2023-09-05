<template>
  <div style="margin: 20px;">
    <!-- 搜索栏 -->
    <div class="search">
      <el-input
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        style="width: 400px; margin-right: 10px; "
        v-model="searchContent"
      >
      </el-input>
      <el-button type="primary" @click="searchCommit()" class="el-icon-search"
        >搜索</el-button
      >
      <el-button type="warning" @click="resetSearch()">重置</el-button>
    </div>
    <!-- 新增按钮 -->
    <el-row class="functionalBtn">
      <el-button
        type="primary"
        class="el-icon-circle-plus"
        @click="handleSaveUser()"
      >
        新增</el-button
      >
      <el-button type="danger" class="el-icon-delete" @click="delBatchUser()"
        >批量删除</el-button
      >
      <el-button type="primary" class="el-icon-el-icon-download"
        >导入</el-button
      >
      <el-button type="primary" class="el-icon-upload2">导出</el-button>
    </el-row>
    <!-- 表单部分 -->
    <el-table
      :data="tableData"
      style="overflow: hidden"
      @selection-change="handleSelectionChange"
      :header-cell-style="{ background: '#ccc' }"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="id" label="ID" width="140"> </el-table-column>
      <el-table-column prop="username" label="用户名" width="120">
      </el-table-column>
      <el-table-column prop="password" label="密码"> </el-table-column>
      <el-table-column label="操作" width="300"
        ><template slot-scope="scope">
          <el-button type="success" @click="findById(scope.row)"
            >修改</el-button
          >
          <el-button type="danger" @click="deleteUser(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[2, 5, 7, 10]"
        :page-size="7"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
    <!-- 嵌套表单 -->
    <el-dialog
      :title="dialogTitle[dialogIndex]"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            dialogFormVisible = false;
            dialogIndex == 0 ? saveUser() : changeUser(form);
          "
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "user",
  data() {
    return {
      tableData: [],
      searchContent: "",
      isCollapse: false,
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
  methods: {
    collapseIcon() {
      this.isCollapse = !this.isCollapse;
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
        })
        .catch((err) => this.$message.error("数据获取失败，", err));
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
        })
        .catch((err) => this.$message.error("数据获取失败，", err));
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
        })
        .catch((err) => this.$message.error("数据获取失败，", err));
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
        })
        .catch((err) => this.$message.error("数据获取失败，", err));
    },
    // 根据id来获取用户名信息
    findById(row) {
      this.dialogFormVisible = true;
      this.dialogIndex = 1;
      this.$axios
        .get(`http://localhost/user/${row.id}`)
        .then((res) => {
          this.form.id = row.id;
          this.form.username = res.data.username;
          this.form.password = res.data.password;
        })
        .catch((err) => this.$message.error("数据获取失败，", err));
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
  },
  created() {
    this.initTableData();
  },
};
</script>
<style scoped>
.functionalBtn {
  margin: 10px 0;
}
</style>