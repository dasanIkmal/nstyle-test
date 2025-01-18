<template>
  <el-form :model="newCustomer" label-position="top">
    <el-form-item label="Name" prop="name">
      <el-input
        v-model="newCustomer.name"
        type="text"
        placeholder="Enter customer name"
      ></el-input>
    </el-form-item>
    <el-form-item label="email" prop="email">
      <el-input
        v-model="newCustomer.email"
        type="text"
        placeholder="Enter customer name"
      ></el-input>
    </el-form-item>
    <el-form-item label="mobile" prop="phone">
      <el-input
        v-model="newCustomer.phone"
        type="text"
        placeholder="Enter customer mobile"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleNewCustomer">Upload</el-button>
    </el-form-item>
  </el-form>
  <!-- <div>hellow world</div>
  <button @click="handleClick">asdasd</button> -->
</template>

<script setup>
import { ref } from "vue";
import CustomerService from "../services/customer";

const newCustomer = ref({
  name: "",
  email: "",
  phone: "",
});
// const props = defineProps(["data"]);

const emit = defineEmits(["addNewCustomer"]);

const handleNewCustomer = async () => {
  await CustomerService.saveCustomer(
    newCustomer.value.name,
    newCustomer.value.email,
    newCustomer.value.phone
  )
    .then((res) => {
      emit("addNewCustomer");
    })
    .catch((error) => {
      console.log(error);
    });
};
</script>

<style scoped>
/* Add any additional styles here */
</style>
