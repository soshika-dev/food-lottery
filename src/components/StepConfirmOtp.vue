<template>
  <VideoPanel
    video-number="5"
    text="آیا کد پنج رقمی را به درستی دریافت کردم؟"
  >
    <div class="space-y-3">
      <div class="stats shadow w-full">
        <div class="stat">
          <div class="stat-title">شماره موبایل</div>
          <div class="stat-value text-lg">{{ mobile }}</div>
        </div>
        <div class="stat">
          <div class="stat-title">کد وارد شده</div>
          <div class="stat-value text-lg">{{ otp }}</div>
        </div>
      </div>
      <div class="flex justify-between gap-3">
        <button class="btn btn-outline" @click="$emit('retry')" :disabled="processing">
          خیر
        </button>
        <button
          class="btn btn-primary"
          @click="$emit('confirm')"
          :disabled="!otpValid || processing"
        >
          <span v-if="processing" class="loading loading-spinner"></span>
          <span v-else>بله</span>
        </button>
      </div>
    </div>
  </VideoPanel>
</template>

<script setup>
import { computed } from 'vue'
import VideoPanel from './VideoPanel.vue'

const props = defineProps({
  mobile: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  processing: {
    type: Boolean,
    default: false,
  },
})

const otpValid = computed(() => /^\d{5}$/.test(props.otp))
</script>
