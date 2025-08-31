<template>
  <div>
    <PageHeading
      title="Usuarios"
      description="Gestionar usuarios del sistema"
    />
    <div class="flex gap-x-4 py-2">
      <UButton
        to="/admin/users/new"
        size="sm"
        icon="i-lucide-plus"
        >Crear</UButton
      >
    </div>
  </div>
</template>
<script setup lang="ts">
  import { NuxtLink } from "#components";
  import PageHeading from "~/components/partials/PageHeading.vue";

  definePageMeta({
    layout: "admin",
  });
</script>
<style scoped></style>
