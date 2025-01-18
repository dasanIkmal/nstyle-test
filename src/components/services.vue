<template>
  <el-table
    :data="allServices"
    style="width: 100%"
    class="shadow-lg rounded-2xl"
    size="large"
  >
    <!-- Name Column -->
    <el-table-column prop="name" label="Name"></el-table-column>

    <!-- Status Column -->
    <el-table-column prop="status" label="Status"></el-table-column>

    <!-- SubCategory Column -->
    <el-table-column label="SubCategories">
      <template #default="scope">
        <div
          v-if="
            scope.row.serviceSubCategoryDTO &&
            scope.row.serviceSubCategoryDTO.length > 0
          "
        >
          <div
            v-for="(subcategory, index) in scope.row.serviceSubCategoryDTO"
            :key="index"
            class="mb-1"
          >
            <span class="font-bold">Name:</span> {{ subcategory.name }},
            <span class="font-bold">Status:</span> {{ subcategory.status }}
          </div>
        </div>
        <div v-else>
          <i>No Subcategories</i>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { onMounted, ref } from "vue";
import ServiceService from "../services/serviceService";

const allServices = ref([]);

const fetchServices = async () => {
  await ServiceService.getAllServices().then((res) => {
    allServices.value = res.data;
    console.log(allServices.value[0]);
    emit("updated");
    console.log(res.data);
  });
};

onMounted(() => {
  fetchServices();
});
</script>

<style scoped></style>
