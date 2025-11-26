<template>
  <div class="min-h-screen bg-base-200 text-base-content">
    <div class="max-w-4xl mx-auto px-4 py-6 space-y-4">
      <header class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p class="text-sm text-base-content/70">خادم مجازی راهنمای شما</p>
          <h1 class="text-2xl font-bold">پیش ثبت‌نام غذای متبرک مهمانسرا</h1>
        </div>
        <div class="flex items-center gap-2">
          <span class="badge badge-primary badge-outline">۶ مرحله</span>
          <span class="badge badge-success">جریان راهنما</span>
        </div>
      </header>

      <div class="bg-base-100 shadow-xl rounded-box p-4 md:p-6 space-y-3">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div class="text-sm font-semibold">مرحله {{ currentStepNumber }} از {{ totalSteps }}</div>
          <div class="text-xs text-base-content/70">زمان باقیمانده: {{ timerRemaining }} ثانیه</div>
        </div>
        <progress class="progress progress-primary w-full" :value="progressValue" max="100"></progress>
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentStepNumber: {
    type: Number,
    required: true,
  },
  totalSteps: {
    type: Number,
    required: true,
  },
  timerRemaining: {
    type: Number,
    required: true,
  },
})

const progressValue = computed(
  () => (props.currentStepNumber / props.totalSteps) * 100
)
</script>
