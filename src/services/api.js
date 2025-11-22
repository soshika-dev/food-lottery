// Mock API services to simulate latency and possible failures.
export async function sendOtp(mobile) {
  const waitTime = 800 + Math.floor(Math.random() * 400)
  await new Promise((resolve) => setTimeout(resolve, waitTime))

  const failChance = Math.random() < 0.1
  if (failChance) {
    throw new Error('system-error')
  }

  const code = Math.floor(10000 + Math.random() * 90000).toString()
  return code
}

export async function verifyOtp(mobile, code, otpServer) {
  const waitTime = 600 + Math.floor(Math.random() * 300)
  await new Promise((resolve) => setTimeout(resolve, waitTime))

  const failChance = Math.random() < 0.1
  if (failChance) {
    throw new Error('system-error')
  }

  return code === otpServer && Boolean(code) && Boolean(mobile)
}
