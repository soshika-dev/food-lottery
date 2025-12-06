<template>
  <VideoPanel
    video-number="1"
  >
    <div class="flex justify-center">
      <button class="btn btn-primary" @click="$emit('next')">
        ادامه
      </button>
    </div>
  </VideoPanel>
</template>

<script setup>
import VideoPanel from './VideoPanel.vue'
</script>
