<template>
  <div class="space-y-4">
    <VideoPanel
      video-number="1"
      text="سلام! من خادم مجازی شما برای راهنمایی پیش‌ثبت‌نام غذای متبرک مهمانسرا هستم. با هم مراحل را قدم به قدم طی می‌کنیم."
    />
    <div class="flex justify-end">
      <button class="btn btn-primary" @click="$emit('next')">
        ادامه
      </button>
    </div>
  </div>
</template>

<script setup>
import VideoPanel from './VideoPanel.vue'
</script>
