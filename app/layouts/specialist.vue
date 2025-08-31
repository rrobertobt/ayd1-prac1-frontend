<template>
  <main>
    <UDrawer></UDrawer>
    <!-- <header
      class="flex py-4 px-4 lg:px-12 lg:max-w-screen-2xl mx-auto w-full justify-between"
    >
      a
    </header>
    <USeparator></USeparator> -->
    <div class="flex gap-x-7 lg:px-16 px-4 lg:max-w-screen-2xl mx-auto">
      <aside class="w-64 shrink-0 hidden lg:block">
        <h4 class="text-lg my-2 font-semibold select-none">Especialista</h4>

        <h4 class="text-lg my-2 font-semibold select-none">Módulos</h4>
      </aside>
      <NuxtPage />
    </div>
  </main>
</template>
<script setup></script>
<style scoped></style>
