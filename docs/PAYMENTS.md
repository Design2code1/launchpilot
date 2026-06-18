# Payment Providers Integration

LaunchPilot RN includes clean abstract layers for Razorpay and Stripe payments.

## Stripe SDK
Install the official Stripe SDK:
```bash
npm install @stripe/stripe-react-native --legacy-peer-deps
```
Follow configuration instructions at: [stripe-react-native](https://github.com/stripe/stripe-react-native#installation).

## Razorpay SDK
Install the Razorpay Native module:
```bash
npm install react-native-razorpay --legacy-peer-deps
```
Configure Razorpay merchant dashboard keys.

Ensure checkout components link to these service interfaces during production wiring.
