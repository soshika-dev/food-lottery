<template>
  <div class="space-y-4">
    <VideoPanel
      video-number="6"
      text="پیش‌ثبت‌نام شما با موفقیت انجام شد. قرعه‌کشی هر روز ساعت ۲۰ انجام می‌شود و نتیجه از طریق پیامک اطلاع‌رسانی خواهد شد."
    />
    <div class="flex justify-center">
      <button class="btn btn-primary" @click="$emit('restart')">شروع مجدد</button>
    </div>
  </div>
</template>

<script setup>
import VideoPanel from './VideoPanel.vue'
</script>
