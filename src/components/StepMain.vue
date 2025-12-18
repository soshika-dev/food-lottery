<template>
  <div class="relative min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white">
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.25),_transparent_45%)]" />

    <div class="relative z-10 flex min-h-screen items-center justify-center px-4 py-10">
      <div
        class="w-full max-w-xl space-y-6 rounded-3xl border border-base-200 bg-base-100/90 p-6 text-center shadow-2xl backdrop-blur-lg"
      >
        <div class="flex justify-center">
          <img
            :src="companyLogo"
            alt="Astan Quds Razavi logo"
            class="h-24 w-24 rounded-2xl bg-base-200/70 p-3 shadow-inner"
          />
        </div>

        <div class="space-y-2">
          <p class="text-sm text-base-content/80">جریان راهنمای پیش‌ثبت‌نام</p>
          <h1 class="text-2xl font-bold text-base-content">شروع فرآیند</h1>
        </div>

        <p class="text-base leading-relaxed text-base-content/80">
          برای آغاز راهنما روی دکمه زیر بزنید.
        </p>

        <div class="flex justify-center">
          <button class="btn btn-primary btn-lg" @click="$emit('start')">
            شروع
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import companyLogo from '../assets/company-logo.svg'

defineEmits(['start'])
</script>
