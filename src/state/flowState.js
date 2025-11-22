import { reactive } from 'vue'

export const Steps = {
  WELCOME: 'WELCOME',
  GET_MOBILE: 'GET_MOBILE',
  CONFIRM_MOBILE: 'CONFIRM_MOBILE',
  ENTER_OTP: 'ENTER_OTP',
  CONFIRM_OTP: 'CONFIRM_OTP',
  SUCCESS: 'SUCCESS',
}

export const ErrorTypes = {
  INVALID: 'invalid',
  SYSTEM: 'system',
  TIMEOUT: 'timeout',
  MISMATCH: 'mismatch',
}

export const flowState = reactive({
  currentStep: Steps.WELCOME,
  mobile: '',
  otpInput: '',
  otpServer: '',
  errorType: null,
  timerRemaining: 30,
})

let timerId = null

function clearTimer() {
  if (timerId) {
    clearInterval(timerId)
    timerId = null
  }
}

export function startStepTimer() {
  clearTimer()

  if (flowState.currentStep === Steps.SUCCESS) {
    return
  }

  flowState.timerRemaining = 30
  timerId = setInterval(() => {
    flowState.timerRemaining -= 1

    if (flowState.timerRemaining <= 0) {
      triggerError(ErrorTypes.TIMEOUT)
    }
  }, 1000)
}

export function triggerError(type) {
  flowState.errorType = type
  clearTimer()
}

export function resolveError() {
  const activeError = flowState.errorType
  flowState.errorType = null

  if (activeError === ErrorTypes.SYSTEM || activeError === ErrorTypes.TIMEOUT) {
    resetFlow()
    return
  }

  if (activeError === ErrorTypes.MISMATCH) {
    flowState.otpInput = ''
    setStep(Steps.ENTER_OTP)
    return
  }

  if (activeError === ErrorTypes.INVALID) {
    startStepTimer()
  }
}

export function setStep(step) {
  flowState.currentStep = step

  if (step === Steps.SUCCESS) {
    clearTimer()
  } else {
    startStepTimer()
  }
}

export function resetFlow() {
  flowState.mobile = ''
  flowState.otpInput = ''
  flowState.otpServer = ''
  setStep(Steps.WELCOME)
}
