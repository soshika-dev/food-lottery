<template>
  <div class="card bg-base-100 border border-base-200 shadow-md">
    <div class="card-body p-4 space-y-3">
      <div class="rounded-xl bg-base-200 h-40 flex items-center justify-center text-lg font-semibold">
        <span>ویدئوی شماره {{ videoNumber }}</span>
      </div>
      <p class="leading-relaxed text-base-content/80">{{ text }}</p>
      <slot />
    </div>
  </div>
</template>

<script setup>
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
</script>
