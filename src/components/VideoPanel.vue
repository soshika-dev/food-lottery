<template>
  <div class="card bg-base-100 border border-base-200 shadow-md">
    <div class="card-body p-4 space-y-3">
      <div class="rounded-xl bg-base-200 overflow-hidden border border-base-300">
        <video
          ref="videoEl"
          class="w-full aspect-video bg-black"
          :src="videoSrc"
          :aria-label="`ویدئوی شماره ${videoNumber}`"
          autoplay
          muted
          controls
          playsinline
        >
          مرورگر شما از پخش ویدئو پشتیبانی نمی‌کند.
        </video>
      </div>
      <p class="leading-relaxed text-base-content/80">{{ text }}</p>
      <slot />
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
