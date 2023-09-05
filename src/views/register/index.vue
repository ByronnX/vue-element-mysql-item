<template>
  <div class="login_container">
    <div class="login_box">
      <div style="margin: 20px 0; text-align: center; font-size: 24px">
        <b>注册</b>
      </div>
      <!-- 用户名-->
      <el-form ref="LoginFormRef" :model="loginForm" :rules="LoginFormRules">
        <el-form-item prop="username">
          <el-input
            size="medium"
            style="margin: 10px 0px; width: 540px"
            v-model="loginForm.username"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <!-- 密码-->
        <el-form-item prop="password">
          <el-input
            size="medium"
            style="margin: 10px 0px; width: 540px"
            show-password
            v-model="loginForm.password"
            prefix-icon="el-icon-lock"
            type="password"
          ></el-input>
        </el-form-item>
        <div style="margin: 10px 0; text-align: center">
          <el-button type="primary" size="small" @click="login()"
            >注册</el-button
          >
          <el-button type="warning" size="small" @click="resetLoginForm"
            >重置</el-button
          >
          <el-button type="success" size="small" @click="toLogin"
            >已有帐号，返回登录</el-button
          >
        </div>
      </el-form>
    </div>
  </div>
</template>
 
 <script>
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      LoginFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    login() {
      this.$axios
        .post("http://localhost/user/register", this.loginForm)
        .then((res) => {
          if (res.data) {
            this.$message.success("注册成功！");
            this.$router.push("/dashboard");
          } else {
            this.$message.error("注册失败!！");
          }
        })
        .catch((err) => {
          this.$message.error("登陆失败！错误为：", err);
        });
    },
    resetLoginForm() {
      this.loginForm.username = "";
      this.loginForm.password = "";
    },
    toLogin() {
      this.$router.push("/login");
    },
  },
};
</script>
 
 <style scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}

.login_box {
  width: 550px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
}
</style>
 
<!-- <template>
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
      userData: [],
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
          this.$API.getSingleUser("2");
          //获取数据库中所有用户名和密码
          //   this.$API.getAllUser().then((res) => {
          //     this.userData = res;
          //     for (var i = 0; i < this.userData.length; i++) {
          //       if (
          //         this.loginForm.username == this.userData[i].userName &&
          //         this.loginForm.password == this.userData[i].password
          //       ) {
          //         this.$message({
          //           message: "登录成功！正在跳转页面.....",
          //           type: "success",
          //         });
          //         this.$router.push("/");
          //       } else {
          //         this.$message.error("用户名密码错误！请重新输入！");
          //         return;
          //       }
          //     }
          //   });
          // } else {
          //   console.log("error submit!!");
          //   return false;
          // }
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
  background-color: rgb(64, 95, 147);
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
  background-color: rgb(245, 246, 247);
  padding: 30px;
  text-align: center;
  color: #000;
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
</style> -->