<template>
  <el-table
    :data="allCustomers"
    style="width: 100%"
    class="shadow-lg rounded-2xl"
    size="large"
  >
    <el-table-column prop="name" label="User ID"></el-table-column>
    <el-table-column prop="email" label="Name"></el-table-column>
    <el-table-column prop="phone" label="Mobile"></el-table-column>
  </el-table>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import CustomerService from "../services/customer";

const props = defineProps(["refresh"]);
const emit = defineEmits(["updated"]);

const allCustomers = ref([]);

const fetchCustomers = async () => {
  await CustomerService.getAllCustomers().then((res) => {
    allCustomers.value = res.data;
    emit("updated");
    console.log("customers", res.data);
  });
};

onMounted(() => {
  fetchCustomers();
});

watch(props.refresh, async (newVal, oldVal) => {
  fetchCustomers();
});
</script>

<style scoped>
/* Add any additional styles here */
</style>
