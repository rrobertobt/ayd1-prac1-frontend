<template>
  <main class="p-10 max-w-5xl mx-auto space-y-10">
    <h1 class="text-4xl font-bold text-center mb-8">Detalles del trabajo</h1>

    <section>
      <h2 class="text-3xl font-semibold mb-4">Logs del trabajo</h2>
      <div v-if="loadingLogs">Cargando logs...</div>
      <div v-else-if="logs.length === 0">No hay logs para este trabajo.</div>
      <ul v-else class="space-y-3">
        <li v-for="log in logs" :key="log.id" class="p-3 bg-gray-900 rounded-lg">
          <p><strong>{{ log.logType }}</strong> por {{ log.userName }} - {{ new Date(log.occurredAt).toLocaleString() }}</p>
          <p>{{ log.description }}</p>
        </li>
      </ul>
    </section>

    <section>
      <h2 class="text-3xl font-semibold mb-4">Partes usadas</h2>
      <div v-if="loadingParts">Cargando partes...</div>
      <div v-else-if="parts.length === 0">No hay partes registradas para este trabajo.</div>
      <ul v-else class="space-y-3">
        <li v-for="part in parts" :key="part.id" class="p-4 bg-gray-900 rounded-lg">
          {{ part.partName }} - {{ part.amount }} unidad(es) a ${{ part.unitPrice.toFixed(2) }}
        </li>
      </ul>
    </section>

    <section>
      <h2 class="text-3xl font-semibold mb-4">Tareas del trabajo</h2>
      <div v-if="loadingTasks">Cargando tareas...</div>
      <div v-else-if="tasks.length === 0">No hay tareas registradas para este trabajo.</div>
      <ul v-else class="space-y-3">
        <li v-for="task in tasks" :key="task.id" class="p-4 bg-gray-900 rounded-lg">
          {{ task.serviceName }} - Estado: {{ task.status }}
        </li>
      </ul>
    </section>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getJobLogs, getJobParts, getJobTasks, type JobLog, type JobPart, type JobTask } from '~/lib/api/employees';

const route = useRoute();
const jobId = Number(route.params.id);

const logs = ref<JobLog[]>([]);
const parts = ref<JobPart[]>([]);
const tasks = ref<JobTask[]>([]);

const loadingLogs = ref(true);
const loadingParts = ref(true);
const loadingTasks = ref(true);

onMounted(async () => {
  try {
    logs.value = await getJobLogs(jobId);
  } finally {
    loadingLogs.value = false;
  }

  try {
    parts.value = await getJobParts(jobId);
  } finally {
    loadingParts.value = false;
  }

  try {
    tasks.value = await getJobTasks(jobId);
  } finally {
    loadingTasks.value = false;
  }
});
</script>

<style scoped>
/* Opcional: mejorar el scroll si hay muchos items */
ul {
  max-height: 300px;
  overflow-y: auto;
}
</style>
