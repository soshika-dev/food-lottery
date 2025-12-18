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
        mobile,
        otpCode,
      }),
    }
  )

  if (!response.ok) {
    throw new Error('system-error')
  }

  return otpCode
}

export async function verifyOtp(mobile, code, otpServer) {
  return code === otpServer && Boolean(code) && Boolean(mobile)
}
