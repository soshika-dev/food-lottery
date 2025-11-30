<template>
  <VideoPanel
    video-number="3"
    text="آیا شماره موبایل را به درستی دریافت کردم؟"
  >
    <div class="space-y-3">
      <div class="alert alert-info">
        <span class="font-semibold">{{ mobile }}</span>
      </div>
      <div class="flex justify-between gap-3">
        <button class="btn btn-outline" @click="$emit('edit')">خیر</button>
        <button class="btn btn-primary" @click="$emit('confirm')">بله</button>
      </div>
    </div>
  </VideoPanel>
</template>

<script setup>
import VideoPanel from './VideoPanel.vue'

defineProps({
  mobile: {
    type: String,
    required: true,
  },
})
</script>
