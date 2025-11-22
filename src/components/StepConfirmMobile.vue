<template>
  <div class="space-y-4">
    <VideoPanel
      video-number="3"
      text="آیا شماره موبایل را به درستی دریافت کردم؟"
    >
      <div class="alert alert-info mt-3">
        <span class="font-semibold">{{ mobile }}</span>
      </div>
    </VideoPanel>
    <div class="flex justify-between gap-3">
      <button class="btn btn-outline" @click="$emit('edit')">خیر</button>
      <button class="btn btn-primary" @click="$emit('confirm')">بله</button>
    </div>
  </div>
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
