<template>
  <div class="relative min-h-screen text-base-content">
    <div class="fixed inset-x-0 top-0 z-20">
      <div class="mx-auto max-w-5xl px-4 pt-4">
        <div
          class="space-y-3 rounded-2xl border border-base-200 bg-base-100/70 p-4 shadow-xl backdrop-blur-md md:p-6"
        >
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

          <div class="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div class="text-sm font-semibold">مرحله {{ currentStepNumber }} از {{ totalSteps }}</div>
            <div class="text-xs text-base-content/70">زمان باقیمانده: {{ timerRemaining }} ثانیه</div>
          </div>
          <progress class="progress progress-primary w-full" :value="progressValue" max="100"></progress>
        </div>
      </div>
    </div>

    <div class="relative z-0">
      <slot />
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
