<template>
  <Transition name="fade">
    <div
      v-if="active"
      class="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4"
    >
      <div class="max-w-lg w-full">
        <VideoPanel :video-number="videoNumber" :text="message" />
        <div class="mt-4 text-center">
          <button class="btn btn-primary" @click="$emit('resolve')">بازگشت</button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { computed } from 'vue'
import VideoPanel from './VideoPanel.vue'

const props = defineProps({
  active: {
    type: Boolean,
    default: false,
  },
  errorType: {
    type: String,
    default: null,
  },
})

const message = computed(() => {
  switch (props.errorType) {
    case 'invalid':
      return 'من به عنوان خادم مجازی فقط برای راهنمایی ثبت نام غذای متبرک هستم. پس به موضوع قبل برگردیم.'
    case 'system':
      return 'به علت خطای سیستمی امکان ادامه نیست. لطفاً بعداً امتحان کنید.'
    case 'timeout':
      return 'زمان پاسخگویی به پایان رسید. لطفاً مراحل را از ابتدا دنبال کنید.'
    case 'mismatch':
      return 'کد اعلام شده با شماره موبایل منطبق نبود.'
    default:
      return ''
  }
})

const videoNumber = computed(() => {
  if (props.errorType === 'mismatch') return 7
  return 'خطا'
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
