<template>
  <el-form :model="order" label-position="top" class="space-y-4">
    <!-- Customer Field -->
    <el-form-item label="Customer" prop="customer" class="space-y-2">
      <el-select
        v-model="order.customer"
        placeholder="Select customer"
        class="w-full"
      >
        <el-option
          v-for="(cus, index) in allCustomers"
          :key="index"
          :label="cus.name"
          :value="cus.id"
        ></el-option>
      </el-select>
    </el-form-item>

    <!-- Services Multi-Select Dropdown -->
    <el-form-item label="Services" prop="selectedServices" class="space-y-2">
      <el-select
        v-model="order.selectedServices"
        multiple
        placeholder="Select services"
        class="w-full"
      >
        <el-option
          v-for="(service, index) in services"
          :key="index"
          :label="service.name"
          :value="service.id"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="Total" prop="total" class="space-y-2">
      <el-input
        v-model="order.total"
        type="text"
        placeholder="Enter total"
        class="w-full"
      ></el-input>
    </el-form-item>

    <el-form-item label="Message" prop="message" class="space-y-2">
      <el-input
        v-model="order.message"
        type="textarea"
        placeholder="Enter message"
        class="w-full"
        :rows="4"
      ></el-input>
    </el-form-item>

    <!-- Submit Button -->
    <el-form-item>
      <el-button
        type="primary"
        class="bg-blue-500 hover:bg-blue-600 text-white"
        @click="handleOrderSubmit"
      >
        Submit
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import CustomerService from "../services/customer";
import ServiceService from "../services/serviceService";
import { useAuthStore } from "../store/auth";
import OrderService from "../services/orderService";
import { ElMessage } from "element-plus";

const authStore = useAuthStore();

const userId = computed(() => authStore.user?.userId || null);

const services = ref([]);
const allCustomers = ref([]);

const getInitialOrder = () => ({
  userId: userId.value,
  customer: null,
  total: null,
  message: "",
  selectedServices: [],
});

const order = ref(getInitialOrder());

const emit = defineEmits(["updated"]);

// Fetch available services from the API
const fetchServices = async () => {
  try {
    const res = await ServiceService.getAllServices();
    services.value = res.data;
    console.log("Services:", services.value);
  } catch (error) {
    console.error("Error fetching services:", error);
  }
};

// Fetch available customers from the API
const fetchCustomers = async () => {
  try {
    const res = await CustomerService.getAllCustomers();
    allCustomers.value = res.data;
    emit("updated");
    console.log("Customers:", allCustomers.value);
  } catch (error) {
    console.error("Error fetching customers:", error);
  }
};

// Handle form submission
const handleOrderSubmit = async () => {
  try {
    console.log("Order Data:", order.value);
    await OrderService.saveOrder(order.value).then((res) => {
      order.value = getInitialOrder();
      ElMessage.message("Failed to fetch documents");
    });
  } catch (error) {
    console.error("Error submitting order:", error);
  }
};

onMounted(() => {
  fetchServices();
  fetchCustomers();
});
</script>

<style scoped></style>
