<template>
  <div class="">
    <PageHeading
      title="Usuarios"
      description="Gestionar usuarios del sistema"
    />
    <div class="flex gap-x-4 py-2">
      <UButton to="/admin/users/new" size="sm" icon="i-lucide-plus"
        >Crear</UButton
      >
    </div>
    <div class="max-w-full ring rounded ring-accented">
      <UTable
        :data="users?.body"
        :loading="status === 'pending'"
        class="w-full"
      ></UTable>
    </div>
  </div>
</template>
<script setup lang="ts">
  import PageHeading from "~/components/partials/PageHeading.vue";

  const { data: users, status } = useAsyncData(() => $api("/user/all"));

  definePageMeta({
    layout: "admin",
  });
</script>
<style scoped></style>
