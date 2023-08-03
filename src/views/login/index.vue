<template>
  <div class="login">
    <el-form
      :model="loginForm"
      status-icon
      :rules="rules"
      ref="loginForm"
      label-width="70px"
      class="login-loginForm"
    >
      <h1 class="loginTitle">登录页面</h1>
      <el-form-item label="用户名" prop="username">
        <el-input
          type="input"
          v-model="loginForm.username"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="loginForm.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <div class="buttonGroup">
        <el-button type="primary" @click="submitForm('loginForm')"
          >提交</el-button
        >
        <el-button @click="resetForm('loginForm')">重置</el-button>
      </div>
    </el-form>
  </div>
</template>
  <script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.loginForm.checkPass !== "") {
          this.$refs.loginForm.validateField("checkPass");
        }
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: "",
      },
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(
            "username and password",
            this.loginForm.username,
            this.loginForm.password
          );
          this.$router.push("/");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>
.login {
  position: relative;
  margin: 0 auto;
  background-color: grey;
  height: 100%;
  width: 100%;
}
.login-loginForm {
  position: absolute;
  top: 50%;
  left: 50%;
  height: 280px;
  width: 500px;
  transform: translate(-50%, -50%);
  background-color: rgb(45, 65, 107);
  padding: 20px;
  text-align: center;
  color: white;
  border-radius: 5%;
}
.loginTitle {
  text-align: center;
}
.buttonGroup {
  width: 150px;
  padding: 0 auto;
  margin: 0 auto;
}
</style>