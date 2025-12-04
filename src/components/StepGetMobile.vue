<template>
  <VideoPanel
    video-number="2"
    text="لطفاً شماره موبایل خود را وارد کنید تا بتوانیم ادامه دهیم."
  >
    <form class="space-y-2.5" @submit.prevent="handleSubmit">
      <label class="form-control w-full">
        <div class="label">
          <span class="label-text">شماره موبایل</span>
          <span class="label-text-alt text-error" v-if="localMobile && !isValid">
            فرمت معتبر نیست
          </span>
        </div>
        <input
          class="input input-bordered w-full"
          type="tel"
          inputmode="numeric"
          maxlength="11"
          placeholder="09xxxxxxxxx"
          v-model="localMobile"
          @keyup.enter="handleSubmit"
        />
        <p class="text-xs text-base-content/70 mt-1">
          فقط شماره ۱۱ رقمی با شروع 09 پذیرفته می‌شود.
        </p>
      </label>
      <div class="flex justify-end pt-1">
        <button class="btn btn-primary" type="submit" :disabled="!isValid">
          ارسال
        </button>
      </div>
    </form>
  </VideoPanel>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import VideoPanel from './VideoPanel.vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue', 'submit', 'invalid'])

const localMobile = ref(props.modelValue)

watch(
  () => props.modelValue,
  (val) => {
    if (val !== localMobile.value) localMobile.value = val
  }
)

watch(localMobile, (val) => emit('update:modelValue', val))

const isValid = computed(() => /^09\d{9}$/.test(localMobile.value))

function handleSubmit() {
  if (!isValid.value) {
    emit('invalid')
    return
  }
  emit('submit')
}
</script>
