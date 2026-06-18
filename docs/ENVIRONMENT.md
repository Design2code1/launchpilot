# Environment Variables Configuration

LaunchPilot RN uses `.env` files loaded into the Expo runtime via `EXPO_PUBLIC_` variables.

## Supported Keys

| Key | Description | Example |
|-----|-------------|---------|
| `EXPO_PUBLIC_SUPABASE_URL` | Your Supabase backend project URL | `https://xxxx.supabase.co` |
| `EXPO_PUBLIC_SUPABASE_ANON_KEY` | Public anonymous API key from Supabase API tab | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |
| `EXPO_PUBLIC_API_BASE_URL` | API base URL for custom backend service | `https://api.myapp.com/v1` |
| `EXPO_PUBLIC_AI_API_URL` | Base URL for OpenAI-compatible completions | `https://api.openai.com/v1` |
| `AI_API_KEY` | Secret API key for OpenAI service | `sk-proj-xxxx` |
| `EXPO_PUBLIC_RAZORPAY_KEY_ID` | Razorpay Merchant key ID | `rzp_test_xxxx` |
| `EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | `pk_test_xxxx` |
| `EXPO_PUBLIC_APP_NAME` | Name displaying across the application | `LaunchPilot RN` |
| `EXPO_PUBLIC_APP_VERSION` | Current build version | `1.0.0` |
| `EXPO_PUBLIC_APP_ENV` | Development environment context | `development` / `production` |
