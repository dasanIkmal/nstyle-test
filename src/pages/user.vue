<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <!-- Page Title -->
    <h2 class="text-4xl font-bold text-gray-800 mb-8">User Dashboard</h2>

    <!-- Tab Navigation -->
    <div class="mb-6 flex gap-4">
      <el-button
        v-if="isAdmin"
        type="primary"
        class="transition-all duration-300 px-6 py-2 font-medium rounded-lg"
        :class="
          tabSwitch === 'user'
            ? 'bg-blue-500 text-white border border-blue-500 hover:bg-blue-600'
            : 'bg-[rgba(64,158,255,0.39)] text-blue-500 border border-blue-500 hover:bg-blue-100'
        "
        @click="switchTabs('user')"
      >
        All users
      </el-button>
      <el-button
        type="primary"
        class="transition-all duration-300 px-6 py-2 font-medium rounded-lg"
        :class="
          tabSwitch === 'customer'
            ? 'bg-blue-500 text-white border border-blue-500 hover:bg-blue-600'
            : 'bg-[rgba(64,158,255,0.39)] text-blue-500 border border-blue-500 hover:bg-blue-100'
        "
        @click="switchTabs('customer')"
      >
        All Customers
      </el-button>
      <el-button
        type="primary"
        class="transition-all duration-300 px-6 py-2 font-medium rounded-lg"
        :class="
          tabSwitch === 'orders'
            ? 'bg-blue-500 text-white border border-blue-500 hover:bg-blue-600'
            : 'bg-[rgba(64,158,255,0.39)] text-blue-500 border border-blue-500 hover:bg-blue-100'
        "
        @click="switchTabs('orders')"
      >
        All Orders
      </el-button>
      <el-button
        type="primary"
        class="transition-all duration-300 px-6 py-2 font-medium rounded-lg"
        :class="
          tabSwitch === 'services'
            ? 'bg-blue-500 text-white border border-blue-500 hover:bg-blue-600'
            : 'bg-[rgba(64,158,255,0.39)] text-blue-500 border border-blue-500 hover:bg-blue-100'
        "
        @click="switchTabs('services')"
      >
        All Services
      </el-button>
    </div>

    <!-- Main Content -->
    <div class="flex gap-8">
      <!-- Sidebar -->
      <div class="flex flex-col p-6 bg-white shadow rounded-lg w-64">
        <el-button
          type="primary"
          size="large"
          @click="customerDialogVisible = true"
          class="bg-blue-500 hover:bg-blue-600 text-white shadow-lg rounded-md mb-4"
        >
          Add Customer
        </el-button>
        <el-button
          type="primary"
          size="large"
          @click="serviceDialogVisible = true"
          class="bg-blue-500 hover:bg-blue-600 text-white shadow-lg rounded-md mb-4"
        >
          Add Service
        </el-button>
        <el-button
          type="primary"
          size="large"
          @click="orderDialogVisible = true"
          class="bg-blue-500 hover:bg-blue-600 text-white shadow-lg rounded-md mb-4"
        >
          Add Order
        </el-button>
        <el-button
          v-if="isAdmin"
          type="primary"
          size="large"
          @click="exportData"
          class="bg-blue-500 hover:bg-blue-600 text-white shadow-lg rounded-md"
        >
          Export All User Data
        </el-button>
      </div>

      <!-- Content Panels -->
      <div class="flex-1">
        <AllUserComponent
          v-if="tabSwitch == 'user'"
          :data="allUsers"
          @edit="handleEdit"
        ></AllUserComponent>
        <customers
          v-if="tabSwitch == 'customer'"
          :refresh="customerRefresh"
          @updated="customerUpdated"
        ></customers>
        <Orders v-if="tabSwitch == 'orders'"></Orders>
        <AllServices v-if="tabSwitch == 'services'"></AllServices>
      </div>
    </div>
  </div>

  <!-- Add Customer Dialog -->
  <el-dialog
    v-model="customerDialogVisible"
    title="Add New Customer"
    width="500px"
    class="rounded-lg shadow-lg"
  >
    <AddCustomer @addNewCustomer="handleAddNewCustomer"></AddCustomer>
  </el-dialog>

  <!-- Add Service Dialog -->
  <el-dialog
    v-model="serviceDialogVisible"
    title="Add New Service"
    width="500px"
    class="rounded-lg shadow-lg"
  >
    <CreateService @updated="handleServiceUpdate"></CreateService>
  </el-dialog>

  <!-- Add Order Dialog -->
  <el-dialog
    v-model="orderDialogVisible"
    title="Add New Order"
    width="500px"
    class="rounded-lg shadow-lg"
  >
    <CreateOrder @updated="handleNewOrder"></CreateOrder>
  </el-dialog>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { ElMessage } from "element-plus";
import UserService from "../services/userService";
import { useAuthStore } from "../store/auth";
import AllUserComponent from "../components/allUsers.vue";
import AddCustomer from "../components/addCustomer.vue";
import customers from "../components/customers.vue";
import Orders from "../components/orders.vue";
import CreateService from "../components/createSerice.vue";
import AllServices from "../components/services.vue";
import CreateOrder from "../components/createOrders.vue";
import FileService from "../services/fileService";

const authStore = useAuthStore();
const isAdmin = ref(authStore.user.role == "admin" ? true : false);

const defaultProfileImg = ref("");

const tabSwitch = ref(isAdmin ? "user" : "customer");

// dialog refs
const customerDialogVisible = ref(false);
const serviceDialogVisible = ref(false);
const subDialogVisible = ref(false);
const orderDialogVisible = ref(false);

const customerRefresh = ref(false);

const newCustomer = ref({
  name: "",
  mobile: "",
  email: "",
});

const newService = ref({
  name: "",
  categoryImg: "",
  status: "",
});

const switchTabs = (val) => {
  tabSwitch.value = val;
};
const handleServiceUpdate = () => {
  serviceDialogVisible.value = false;
};
const handleNewOrder = () => {
  orderDialogVisible.value = false;
};

const handleAddNewCustomer = () => {
  console.log("new customer added!");
  customerRefresh.value = true;
  customerDialogVisible.value = false;
};

const customerUpdated = () => {
  customerRefresh.value = false;
};

const handleEdit = (valFOr) => {
  console.log("emitted", valFOr);
};

const allUsers = ref([]);

const downloadDocument = (url) => {
  window.open(url, "_blank");
};

const handleNewCustomer = () => {
  console.log(newCustomer.value);
  customerDialogVisible.value = false;
};

const fetAllUsers = async () => {
  try {
    await UserService.getAllUsers()
      .then((response) => {
        allUsers.value = response.data.data;
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    ElMessage.error("Failed to fetch documents");
  }
};

const exportData = async () => {
  try {
    const res = await FileService.exportData();

    if (res.data) {
      // Extract the file name from the Content-Disposition header
      const contentDisposition = res.headers["content-disposition"];
      let fileName = "users_with_orders.pdf"; // Default file name
      if (contentDisposition) {
        const match = contentDisposition.match(/filename="?([^"]+)"?/);
        if (match && match[1]) {
          fileName = match[1];
        }
      }

      // Create a Blob from the response data
      const blob = new Blob([res.data], { type: "application/pdf" });

      // Create a temporary URL for the Blob
      const url = window.URL.createObjectURL(blob);

      // Create a link element and trigger download
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();

      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } else {
      console.error("No data received from the server.");
    }
  } catch (err) {
    console.error("Error exporting data:", err);
  }
};

onMounted(() => {
  fetAllUsers(); // Fetch documents when the component is mounted
});
</script>

<style scoped>
/* Add any additional styles here */
</style>
