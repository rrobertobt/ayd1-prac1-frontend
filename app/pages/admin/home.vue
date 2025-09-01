<template>
  <div>
    <PageHeading
      title="Administración"
      description="Acceso rápido a las secciones de administración"
    />
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <UCard
      v-for="shortcut in shortcuts"
      :key="shortcut.name"
      :as="NuxtLink"
      :to="shortcut.to"
      class="hover:shadow-md transition-shadow group"
     variant="subtle"
      >
      <template #header>
        <div class="relative h-4">
          <Icon size="18" name="lucide:chevron-right" class="absolute -translate-x-1 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition duration-200"/>
          <Icon size="18" :name="shortcut.icon" class="absolute translate-x-0 group-hover:translate-x-1 group-hover:opacity-0 transition"/>
        </div>
      </template>
      <h1 class="text-lg font-medium">
        {{ shortcut.name }}
      </h1>
    </UCard>
  </div>
</div>
</template>
<script setup>
import { NuxtLink } from '#components';
import PageHeading from '~/components/partials/PageHeading.vue';


  const shortcuts = [
    {
      name: 'Usuarios',
      icon: 'i-lucide-users',
      to: '/admin/users',
    },
    {
      name: 'Vehículos',
      icon: 'i-lucide-truck',
      to: '/admin/vehicles',
    },
    {
      name: 'Tipos de Servicio',
      icon: 'i-lucide-briefcase',
      to: '/admin/service-types',
    },
  ]


definePageMeta({
  layout: 'admin',
})
</script>
<style scoped></style>
