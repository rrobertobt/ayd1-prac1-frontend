<template>
  <div>
    <PageHeading
      title="Vehículos"
      description="Gestionar vehículos del sistema"
    />
    <div class="flex gap-x-4 py-2">
      <UButton to="/admin/vehicles/new" size="sm" icon="i-lucide-plus"
        >Crear</UButton
      >
    </div>
    <div class=" max-w-full ring rounded ring-accented">
      <UTable :data="vehicles?.body" :loading="status === 'pending'" class="w-full"></UTable>
    </div>
  </div>
</template>
<script setup lang="ts">
  import PageHeading from "~/components/partials/PageHeading.vue";

  const { data: vehicles, status } = useAsyncData(() => $api("/admin/vehicles"));

  definePageMeta({
    layout: "admin",
  });
</script>
<style scoped></style>
