<template>
  <div class="relative w-full aspect-video rounded-2xl overflow-hidden border border-slate-700 shadow-2xl group">
    <iframe
      v-if="videoId"
      :src="`https://docs.google.com/get_video_info?docid=${videoId}`"
      class="w-full h-full border-none"
      allow="autoplay; encrypted-media"
      allowfullscreen
    ></iframe>
    <!-- Fallback if no videoId or Drive iframe doesn't work directly -->
    <iframe
      v-else-if="fallbackUrl"
      :src="fallbackUrl"
      class="w-full h-full border-none"
      allow="autoplay"
    ></iframe>
    <div v-else class="flex items-center justify-center h-full bg-navy-accent/50 text-slate-500">
      <span class="material-symbols-outlined text-6xl">play_circle</span>
      <p class="ml-4 font-medium">Select a lesson to start watching</p>
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
