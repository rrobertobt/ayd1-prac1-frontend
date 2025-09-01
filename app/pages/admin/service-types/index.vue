<template>
  <div class="">
    <PageHeading
      title="Tipos de servicio"
      description="Gestionar tipos de servicio del sistema"
    />
    <div class="flex gap-x-4 py-2">
      <UButton to="/admin/service-types/new" size="sm" icon="i-lucide-plus"
        >Crear</UButton
      >
    </div>
    <div class="overflow-x-auto max-w-4xl ring rounded ring-accented">
      <div class=" max-w-full ring rounded ring-neutral-300">
      <!-- <UTable :data="users?.body" :loading="status === 'pending'" class="w-full"></UTable> -->
    </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import PageHeading from "~/components/partials/PageHeading.vue";

  // const { data: users, status } = useAsyncData(() => $api("/user/all"));

  definePageMeta({
    layout: "admin",
  });
</script>
<style scoped></style>
