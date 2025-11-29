<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import AppShell from './components/AppShell.vue'
import ErrorOverlay from './components/ErrorOverlay.vue'
import StepConfirmMobile from './components/StepConfirmMobile.vue'
import StepConfirmOtp from './components/StepConfirmOtp.vue'
import StepEnterOtp from './components/StepEnterOtp.vue'
import StepGetMobile from './components/StepGetMobile.vue'
import StepSuccess from './components/StepSuccess.vue'
import StepWelcome from './components/StepWelcome.vue'
import { sendOtp, verifyOtp } from './services/api'
import {
  ErrorTypes,
  Steps,
  flowState,
  resetFlow,
  resolveError,
  setStep,
  startStepTimer,
  triggerError,
} from './state/flowState'

const stepsOrder = [
  Steps.WELCOME,
  Steps.GET_MOBILE,
  Steps.CONFIRM_MOBILE,
  Steps.ENTER_OTP,
  Steps.CONFIRM_OTP,
  Steps.SUCCESS,
]

const sendingOtp = ref(false)
const verifyingOtp = ref(false)

const currentComponent = computed(() => ({
  [Steps.WELCOME]: StepWelcome,
  [Steps.GET_MOBILE]: StepGetMobile,
  [Steps.CONFIRM_MOBILE]: StepConfirmMobile,
  [Steps.ENTER_OTP]: StepEnterOtp,
  [Steps.CONFIRM_OTP]: StepConfirmOtp,
  [Steps.SUCCESS]: StepSuccess,
}[flowState.currentStep]))

const currentStepNumber = computed(
  () => stepsOrder.indexOf(flowState.currentStep) + 1
)

const componentBindings = computed(() => {
  switch (flowState.currentStep) {
    case Steps.WELCOME:
      return { onNext: handleWelcomeNext }
    case Steps.GET_MOBILE:
      return {
        modelValue: flowState.mobile,
        'onUpdate:modelValue': (value) => (flowState.mobile = value),
        onSubmit: handleMobileSubmit,
        onInvalid: handleInvalidInput,
      }
    case Steps.CONFIRM_MOBILE:
      return {
        mobile: flowState.mobile,
        onConfirm: () => handleConfirmMobile(true),
        onEdit: () => handleConfirmMobile(false),
      }
    case Steps.ENTER_OTP:
      return {
        mobile: flowState.mobile,
        modelValue: flowState.otpInput,
        sending: sendingOtp.value,
        'onUpdate:modelValue': (value) => (flowState.otpInput = value),
        onSubmit: handleOtpEntrySubmit,
        onInvalid: handleInvalidInput,
      }
    case Steps.CONFIRM_OTP:
      return {
        mobile: flowState.mobile,
        otp: flowState.otpInput,
        processing: verifyingOtp.value,
        onRetry: () => handleOtpDecision(false),
        onConfirm: () => handleOtpDecision(true),
      }
    case Steps.SUCCESS:
      return {
        onRestart: handleRestart,
      }
    default:
      return {}
  }
})

onMounted(() => {
  startStepTimer()
})

watch(
  () => flowState.currentStep,
  (step) => {
    if (step === Steps.ENTER_OTP) {
      flowState.otpInput = ''
      initiateOtpSend()
    }
  }
)

async function initiateOtpSend() {
  sendingOtp.value = true
  try {
    const code = await sendOtp(flowState.mobile)
    flowState.otpServer = code
  } catch (error) {
    triggerError(ErrorTypes.SYSTEM)
  } finally {
    sendingOtp.value = false
  }
}

function handleWelcomeNext() {
  setStep(Steps.GET_MOBILE)
}

function handleMobileSubmit() {
  setStep(Steps.CONFIRM_MOBILE)
}

function handleConfirmMobile(confirm) {
  if (confirm) {
    setStep(Steps.ENTER_OTP)
  } else {
    setStep(Steps.GET_MOBILE)
  }
}

function handleOtpEntrySubmit() {
  setStep(Steps.CONFIRM_OTP)
}

function handleOtpDecision(confirm) {
  if (!confirm) {
    setStep(Steps.ENTER_OTP)
    return
  }

  verifyCurrentOtp()
}

async function verifyCurrentOtp() {
  verifyingOtp.value = true
  try {
    const result = await verifyOtp(
      flowState.mobile,
      flowState.otpInput,
      flowState.otpServer
    )

    if (result) {
      setStep(Steps.SUCCESS)
    } else {
      triggerError(ErrorTypes.MISMATCH)
    }
  } catch (error) {
    triggerError(ErrorTypes.SYSTEM)
  } finally {
    verifyingOtp.value = false
  }
}

function handleInvalidInput() {
  triggerError(ErrorTypes.INVALID)
}

function handleRestart() {
  resetFlow()
}
</script>

<template>
  <div class="relative min-h-screen overflow-hidden">
    <!-- Full-screen background video -->
    <div class="fixed inset-0 -z-10 pointer-events-none">
      <video
        autoplay
        muted
        loop
        playsinline
        class="h-full w-full object-cover pointer-events-none"
      >
        <source src="/videos/10.mp4" type="video/mp4" />
        مرورگر شما از پخش ویدئو پشتیبانی نمی‌کند.
      </video>
    </div>

    <div class="relative z-10 flex min-h-screen items-center justify-center px-4 py-6">
      <AppShell
        :current-step-number="currentStepNumber"
        :total-steps="stepsOrder.length"
        :timer-remaining="flowState.timerRemaining"
      >
        <Transition name="fade" mode="out-in">
          <component :is="currentComponent" :key="flowState.currentStep" v-bind="componentBindings" />
        </Transition>
      </AppShell>
    </div>

    <ErrorOverlay
      :active="Boolean(flowState.errorType)"
      :error-type="flowState.errorType"
      @resolve="resolveError"
    />
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(6px);
}
</style>
