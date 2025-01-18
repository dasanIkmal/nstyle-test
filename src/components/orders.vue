<template>
  <el-table
    :data="allOrders"
    style="width: 100%"
    class="shadow-lg rounded-2xl"
    size="large"
  >
    <el-table-column prop="customerId" label="Customer "></el-table-column>
    <el-table-column prop="userId" label="user "></el-table-column>
    <el-table-column prop="serviceIds" label="Services"></el-table-column>
    <el-table-column prop="totalBill" label="Total bill"></el-table-column>
    <el-table-column prop="message" label="Message"></el-table-column>
  </el-table>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import OrderService from "../services/orderService";

const props = defineProps(["refresh"]);
const emit = defineEmits(["updated"]);

const allOrders = ref([]);

const fetchAllOrders = async () => {
  await OrderService.getAllOrders().then((res) => {
    console.log("order", res.data);
    allOrders.value = res.data;
    emit("updated");
    console.log(res.data);
  });
};

onMounted(() => {
  fetchAllOrders();
});

watch(props.refresh, async (newVal, oldVal) => {
  fetchAllOrders();
});
</script>

<style scoped>
/* Add any additional styles here */
</style>
