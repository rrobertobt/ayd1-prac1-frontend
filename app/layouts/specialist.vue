<template>
  <main>
    <UDrawer v-model:open="openDrawer" direction="left" inset :handle="false">
      <template #body>
          <UButton icon="i-lucide-x" variant="link" class="p-0 block ml-auto" @click="openDrawer = false"></UButton>
      </template>

      <template #footer>
        <UserInfo />
      </template>
    </UDrawer>


    <header
      class="flex py-3 px-4 lg:px-12 lg:max-w-screen-2xl mx-auto w-full items-center justify-between"
    >
    <UButton icon="i-lucide-menu" variant="link" class="block lg:hidden p-0" @click="openDrawer = !openDrawer"></UButton>
      <NuxtLink to="/admin/home" class="hover:opacity-85 transition-opacity">
        <strong>Taller</strong> - Especialistas
      </NuxtLink>
      <UserInfo class="max-sm:hidden"/>
    </header>


    <USeparator></USeparator>
    <div class="flex gap-x-7 lg:px-16 pr-4 py-2 lg:max-w-screen-2xl mx-auto">
      <aside class="w-64 shrink-0 hidden lg:flex flex-col gap-y-4">
      </aside>
      <main class="flex-1 px-4">
        <NuxtPage />
      </main>
    </div>
  </main>
</template>
<script setup>
import UserInfo from '~/components/partials/UserInfo.vue';

const openDrawer = ref(false)

</script>
<style scoped></style>
