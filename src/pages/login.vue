<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="w-full max-w-md p-8 space-y-6 bg-gray-100 rounded-lg shadow-md">
      <h2 class="text-2xl font-bold text-center">Login</h2>
      <el-form :model="loginForm" :rules="rules" label-position="top">
        <el-form-item label="Username" prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="Enter your username"
          ></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="Enter your password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleLogin">Login</el-button>
        </el-form-item>
      </el-form>
      <div>
        <router-link to="/register">Dont have an Account? Register</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/auth";
import { ElMessage } from "element-plus";
import AuthService from "../services/auth";
import { jwtDecode } from "jwt-decode";

const router = useRouter();

const authStore = useAuthStore();
const jwt = ref("");

const loginForm = ref({
  username: "",
  password: "",
});

const rules = {
  username: [
    { required: true, message: "Please input your username", trigger: "blur" },
  ],
  password: [
    { required: true, message: "Please input your password", trigger: "blur" },
  ],
};

const validateLoginForm = () => {
  const sqlInjectionPattern =
    /(\b(SELECT|UPDATE|DELETE|DROP|INSERT|WHERE|OR|AND|--|;|#|\/\*)\b|['"])/i;

  if (!loginForm.value.username) {
    ElMessage.error("Username is required.");
    return false;
  }

  if (sqlInjectionPattern.test(loginForm.value.username)) {
    ElMessage.error("Invalid characters detected in username.");
    return false;
  }

  if (!loginForm.value.password) {
    ElMessage.error("Password is required.");
    return false;
  }

  if (sqlInjectionPattern.test(loginForm.value.password)) {
    ElMessage.error("Invalid characters detected in password.");
    return false;
  }

  return true; // Validation passed
};

const handleLogin = async () => {
  try {
    if (!validateLoginForm()) {
      return; // Stop execution if validation fails
    }
    await AuthService.login(loginForm.value.username, loginForm.value.password)
      .then((response) => {
        if (response.status == 200) {
          //jwt decode to get user data
          const { jwt, user } = response.data.data;

          //set user data and token to store
          authStore.setAuthData({ user: user, token: jwt });
          localStorage.setItem("auth_token", jwt);
          localStorage.setItem("user_data", JSON.stringify(user));
          ElMessage.success("Login successful");

          router.push("/user");
        }
      })
      .catch((error) => {
        ElMessage.error("Login failed 1");
      });
  } catch (error) {
    ElMessage.error("Login failed 2");
  }
};
</script>

<style scoped>
/* Add any additional styles here */
</style>
