<template>
  <el-table
    :data="data"
    style="width: 100%"
    class="shadow-lg rounded-2xl"
    size="large"
  >
    <el-table-column prop="userProfileImg" label="Profile Image">
      <template #default="scope">
        <img
          :src="
            scope.row.userProfileImg
              ? scope.row.userProfileImg
              : 'https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg'
          "
          alt="User Profile Image"
          style="width: 24px; height: 24px; border-radius: 50%"
        />
      </template>
    </el-table-column>
    <el-table-column prop="userId" label="User ID"></el-table-column>
    <el-table-column prop="userName" label="Name"></el-table-column>
    <el-table-column prop="userEmail" label="Email"></el-table-column>
    <el-table-column prop="userDOB" label="DOB"></el-table-column>
    <el-table-column prop="role" label="Role"></el-table-column>
    <el-table-column label="CV">
      <template #default="scope">
        <el-button
          type="primary"
          size="small"
          @click="downloadDocument(scope.row.documentUrl)"
          >Download</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <!-- <div>hellow world</div>
  <button @click="handleClick">asdasd</button> -->
</template>

<script setup>
import { onMounted, ref } from "vue";
import { ElMessage } from "element-plus";
const props = defineProps(["data"]);

console.log("child", props.data[0]);
const emit = defineEmits(["edit"]);

const dasdasd = ref(false);

const handleClick = () => {
  emit("edit", dasdasd.value);
};
</script>

<style scoped>
/* Add any additional styles here */
</style>
