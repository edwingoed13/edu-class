```
<template>
  <div class="relative w-full h-full group bg-black overflow-hidden flex flex-col">


    <iframe
      v-if="videoId"
      :src="`https://drive.google.com/file/d/${videoId}/preview`"
      class="w-full h-full border-none"
      allow="autoplay; encrypted-media"
      allowfullscreen
    ></iframe>


    <div v-else class="flex flex-col items-center justify-center h-full text-slate-500">
      <span class="material-symbols-outlined text-6xl mb-4">play_circle</span>
      <p class="font-medium">Seleccione una lección para comenzar</p>
    </div>
  </div>
</template>




<script setup>
import { computed } from 'vue'

const props = defineProps({
  videoId: {
    type: String,
    required: false
  }
})

// Tip: Google Drive video embed URL pattern
const fallbackUrl = computed(() => {
  if (!props.videoId) return null
  return `https://drive.google.com/file/d/${props.videoId}/preview`
})
</script>
