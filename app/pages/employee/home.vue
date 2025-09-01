<template>
  <main class="flex flex-col items-center justify-start min-h-screen  p-8">
    <h1 class="text-3xl font-bold mb-6 text-center text-gray-500">Mis trabajos en curso</h1>

    <div v-if="loading" class="text-lg text-gray-400">Cargando...</div>
    <div v-else-if="error" class="text-lg text-red-300">{{ error }}</div>

    <ul v-else class="w-full max-w-4xl space-y-5">
      <li 
        v-for="job in jobs" 
        :key="job.id" 
        class="p-6 border border-gray-100 rounded-xl shadow hover:shadow-lg transition-shadow"
      >
        <h2 class="text-2xl font-semibold text-gray-200 mb-2">{{ job.vehicle_plate }} - {{ job.description }}</h2>
        <p class="text-lg text-gray-200 mb-1"><strong>Estado:</strong> {{ job.status }}</p>
        <p class="text-lg text-gray-200 mb-3"><strong>Tiempo estimado:</strong> {{ job.estimated_time ?? '-' }} hrs</p>

        <NuxtLink
          :to="`/employee/jobs/${job.id}`"
          class="inline-block text-blue-400 font-medium hover:underline text-lg"
        >
          Ver detalles
        </NuxtLink>
      </li>
    </ul>
  </main>
</template>

<style scoped></style>

<script setup lang="ts">
definePageMeta({
  layout: 'employee',
})
import { getMyJobs, type Job } from '~/lib/api/employees';
import { ref, onMounted } from 'vue';

const jobs = ref<Job[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

onMounted(async () => {
  try {
    jobs.value = await getMyJobs();
    console.log(jobs.value);
    
  } catch (err: any) {
    error.value = err.message ?? 'Error inesperado';
  } finally {
    loading.value = false;
  }
});
</script>
