<template>
  <div class="relative min-h-screen text-base-content">
    <video
      ref="videoEl"
      class="fixed inset-0 h-full w-full object-contain object-center bg-black"
      :src="videoSrc"
      :aria-label="`ویدئوی شماره ${videoNumber}`"
      autoplay
      playsinline
      loop
    >
      مرورگر شما از پخش ویدئو پشتیبانی نمی‌کند.
    </video>

    <div class="pointer-events-none fixed inset-0 bg-gradient-to-t from-base-100/80 via-base-100/30 to-transparent" />

    <div class="relative z-10 flex min-h-screen items-end justify-center">
      <div class="w-full max-w-3xl lg:max-w-2xl px-4 pb-10 md:pb-14">
        <div class="space-y-3 rounded-3xl bg-base-100/80 p-4 shadow-2xl backdrop-blur-lg border border-base-200">
          <p class="text-lg font-semibold leading-relaxed text-base-content drop-shadow-sm md:text-xl">
            {{ text }}
          </p>
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue'

const props = defineProps({
  videoNumber: {
    type: [Number, String],
    required: true,
  },
  text: {
    type: String,
    default: '',
  },
})

const videoSrc = computed(() => `/videos/${props.videoNumber}.mp4`)

const videoEl = ref(null)

const playVideo = () => {
  const element = videoEl.value
  if (!element) return

  element.currentTime = 0
  element.play().catch(() => {})
}

onMounted(() => {
  playVideo()
})

watch(videoSrc, async () => {
  await nextTick()
  playVideo()
})
</script>
