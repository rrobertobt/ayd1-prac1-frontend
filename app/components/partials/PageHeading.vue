<template>
  <div class="pb-2">
    <UButton
      v-if="backLink && backLabel"
      :to="backLink"
      size="sm"
      variant="link"
      icon="i-lucide-arrow-left"
      class="mb-2 px-0"
      >{{ backLabel }}</UButton>
    <h1 class="text-2xl pb-1.5">{{ title }}</h1>
    <p class="text-sm text-muted">{{ description }}</p>
  </div>
</template>
<script setup lang="ts">
import { NuxtLink } from '#components';
import { defineProps } from 'vue';

const { title, description, backLink, backLabel = 'Regresar' } = defineProps<{
  title: string;
  description: string;
  backLink?: string;
  backLabel?: string;
}>();
</script>
<style scoped>
</style>