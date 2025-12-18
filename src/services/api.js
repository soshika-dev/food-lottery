export async function sendOtp(mobile) {
  const otpCode = String(Math.floor(10000 + Math.random() * 90000))

  const response = await fetch(
    'https://haram-api-dev.razavi.ir/api/v1/kiosk/otp/send-otp',
    {
      method: 'POST',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer 3d7ca9150e-02342530',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mobileNumber: mobile,
        otpCode,
      }),
    }
  )

  const payload = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(payload?.message || 'system-error')
  }

  return payload?.otpCode ? String(payload.otpCode) : otpCode
}

export async function verifyOtp(mobile, code, otpServer) {
  return code === otpServer && Boolean(code) && Boolean(mobile)
}
