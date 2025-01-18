<template>
  <el-form :model="service" label-position="top" class="space-y-4">
    <!-- Name Field -->
    <el-form-item label="Name" prop="name" class="space-y-2">
      <el-input
        v-model="service.name"
        type="text"
        placeholder="Enter service name"
        class="w-full"
      ></el-input>
    </el-form-item>

    <!-- Status Dropdown -->
    <el-form-item label="Status" prop="status" class="space-y-2">
      <el-select
        v-model="service.status"
        placeholder="Select status"
        class="w-full"
      >
        <el-option label="Active" value="ACTIVE"></el-option>
        <el-option label="Deactivated" value="DEACTIVATED"></el-option>
      </el-select>
    </el-form-item>

    <!-- serviceSubCategoryDTO -->
    <el-form-item label="Sub Category" class="space-y-2">
      <div
        v-for="(subcategory, index) in service.serviceSubCategoryDTO"
        :key="index"
        class="flex items-center space-x-4"
      >
        <el-input
          v-model="subcategory.name"
          placeholder="Enter subcategory name"
          class="w-3/4"
        ></el-input>
        <el-button
          type="danger"
          class="bg-red-500 hover:bg-red-600 text-white"
          @click="removeSubcategory(index)"
        >
          Remove
        </el-button>
      </div>
      <el-button
        type="success"
        class="bg-green-500 hover:bg-green-600 text-white mt-2"
        @click="addSubcategory"
      >
        Add Subcategory
      </el-button>
    </el-form-item>

    <!-- Image Upload -->
    <el-form-item label="Image File" prop="categoryImg" class="space-y-2">
      <el-upload
        class="upload-demo"
        drag
        action=""
        :limit="1"
        :on-change="handleFileChange"
        :file-list="fileList"
        :auto-upload="false"
        :before-upload="beforeUpload"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">Drop image here or click to upload</div>
      </el-upload>
    </el-form-item>

    <!-- Submit Button -->
    <el-form-item>
      <el-button
        type="primary"
        class="bg-blue-500 hover:bg-blue-600 text-white"
        @click="handleservice"
      >
        Upload
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref, toRaw } from "vue";
import ServiceService from "../services/serviceService";

const emit = defineEmits(["updated"]);

const defaultService = () => ({
  name: "",
  image: "",
  status: "ACTIVE",
  serviceSubCategoryDTO: [],
});

const service = ref(defaultService());

const fileList = ref([]);

// Add a new subcategory
const addSubcategory = () => {
  service.value.serviceSubCategoryDTO.push({ name: "" });
};

// Remove a subcategory
const removeSubcategory = (index) => {
  service.value.serviceSubCategoryDTO.splice(index, 1);
};

// Before Upload Hook
const beforeUpload = (file) => {
  if (fileList.value.length >= 1) {
    ElMessage.error("You can only upload one file.");
    return false;
  }
  return true;
};

// Handle File Upload
const handleFileChange = async (file) => {
  const formData = new FormData();
  formData.append("file", file.raw);

  try {
    const response = await ServiceService.uploadFile(formData);
    service.value.image = JSON.stringify(response.data);
    ElMessage.success("File uploaded successfully.");
  } catch (error) {
    console.error("File upload failed:", error);
    ElMessage.error("File upload failed.");
  }
};

// Submit the service data
const handleservice = async () => {
  try {
    const plainServiceData = toRaw(service.value);

    await ServiceService.createService(plainServiceData);
    service.value = defaultService();
    fileList.value = [];
    emit("updated");
    ElMessage.success("Service created successfully.");
  } catch (error) {
    console.error("Error during creating service:", error);
    ElMessage.error("Failed to create service.");
  }
};
</script>

<style scoped>
.upload-demo {
  @apply border border-dashed p-4 rounded-lg;
}
</style>
