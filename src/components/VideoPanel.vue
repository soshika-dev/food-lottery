<template>
  <div class="relative min-h-screen text-base-content">
    <video
      ref="videoEl"
      class="fixed inset-0 h-full w-full object-contain object-center bg-black"
      :src="videoSrc"
      :aria-label="`ویدئوی شماره ${videoNumber}`"
      autoplay
      playsinline
      :muted="isMuted"
    >
      مرورگر شما از پخش ویدئو پشتیبانی نمی‌کند.
    </video>

    <div class="pointer-events-none fixed inset-0 bg-gradient-to-t from-base-100/80 via-base-100/30 to-transparent" />

    <div class="relative z-10 flex min-h-screen items-end justify-center">
      <div class="w-full max-w-3xl lg:max-w-2xl px-4 pb-10 md:pb-12">
        <div class="space-y-2 rounded-3xl bg-base-100/80 p-3 shadow-2xl backdrop-blur-lg border border-base-200">
          <p class="text-base font-semibold leading-relaxed text-base-content drop-shadow-sm md:text-lg">
            {{ text }}
          </p>
          <slot />
        </div>
        <div class="mt-3 flex justify-end">
          <button
            type="button"
            class="btn btn-sm gap-2 rounded-full bg-base-100/90 text-base-content shadow-lg backdrop-blur"
            :aria-pressed="!isMuted"
            :title="isMuted ? 'فعال کردن صدا' : 'قطع صدا'"
            @click="toggleMute"
          >
            <span aria-hidden="true">{{ isMuted ? '🔇' : '🔊' }}</span>
            <span class="font-medium">{{ isMuted ? 'فعال کردن صدا' : 'قطع صدا' }}</span>
          </button>
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
const isMuted = ref(true)

const playVideo = () => {
  const element = videoEl.value
  if (!element) return

  element.currentTime = 0
  element.muted = isMuted.value
  element.play().catch(() => {})
}

const toggleMute = () => {
  const element = videoEl.value
  if (!element) return

  const nextMuted = !isMuted.value
  isMuted.value = nextMuted
  element.muted = nextMuted

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
