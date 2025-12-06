<template>
  <div class="relative min-h-screen text-base-content">
    <video
      ref="videoEl"
      class="fixed inset-0 h-full w-full object-contain object-center bg-black"
      :src="videoSrc"
      :aria-label="`ویدئوی شماره ${videoNumber}`"
      autoplay
      playsinline
    >
      مرورگر شما از پخش ویدئو پشتیبانی نمی‌کند.
    </video>

    <div class="pointer-events-none fixed inset-0 bg-gradient-to-t from-base-100/80 via-base-100/30 to-transparent" />

    <div class="fixed inset-0 z-10 flex items-end justify-center pb-6 md:pb-8">
      <div class="w-full max-w-xl md:max-w-2xl px-3 md:px-4">
        <div
          class="space-y-1 rounded-2xl"
          :class="hasFrame
            ? 'bg-base-100/80 p-3 shadow-2xl backdrop-blur-lg border border-base-200'
            : 'p-0 shadow-none backdrop-blur-0 border-none'
          "
        >
          <p
            v-if="text"
            class="text-sm font-semibold leading-relaxed text-base-content drop-shadow-sm md:text-base"
          >
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
  hasFrame: {
    type: Boolean,
    default: true,
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
