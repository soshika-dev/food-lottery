<template>
  <VideoPanel
    video-number="4"
    text="کد پنج رقمی ارسال شد، لطفاً وارد کنید."
  >
    <form class="space-y-3" @submit.prevent="handleSubmit">
      <div class="space-y-2">
        <div class="badge badge-outline">ارسال به: {{ mobile }}</div>
        <div class="flex items-center gap-2 text-sm text-base-content/70">
          <span v-if="sending">در حال ارسال کد...</span>
          <span v-else class="text-success">کد ارسال شد</span>
        </div>
        <input
          class="input input-bordered w-full text-center text-lg tracking-widest"
          type="text"
          inputmode="numeric"
          maxlength="5"
          placeholder="-----"
          v-model="localOtp"
          @keyup.enter="handleSubmit"
        />
        <p class="text-xs text-base-content/70">کد باید ۵ رقم باشد.</p>
      </div>
      <div class="flex justify-end">
        <button
          class="btn btn-primary"
          type="submit"
          :disabled="!isValid || sending || verifying"
        >
          <span v-if="verifying" class="loading loading-spinner"></span>
          <span v-else>تأیید کد</span>
        </button>
      </div>
    </form>
  </VideoPanel>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import VideoPanel from './VideoPanel.vue'

const props = defineProps({
  mobile: {
    type: String,
    required: true,
  },
  modelValue: {
    type: String,
    default: '',
  },
  sending: {
    type: Boolean,
    default: false,
  },
  verifying: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue', 'submit', 'invalid'])

const localOtp = ref(props.modelValue)

watch(
  () => props.modelValue,
  (val) => {
    if (val !== localOtp.value) localOtp.value = val
  }
)

watch(localOtp, (val) => emit('update:modelValue', val))

const isValid = computed(() => /^\d{5}$/.test(localOtp.value))

function handleSubmit() {
  if (!isValid.value) {
    emit('invalid')
    return
  }
  emit('submit')
}
</script>
