import { ENV } from '@/config/env';
import { Plan, Subscription, PaymentIntent, PlanId, BillingCycle } from '@/types/payment.types';

/**
 * Payment Service — Razorpay + Stripe scaffold.
 * Wire up real SDK when ready to process payments.
 */

export const PLANS: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    description: 'Perfect to get started',
    monthlyPrice: 0,
    annualPrice: 0,
    currency: 'USD',
    features: ['10 AI messages/month', '1 GB storage', 'Community support'],
    limits: { messages: 10, storage_gb: 1, team_members: 1 },
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'For serious builders',
    monthlyPrice: 19,
    annualPrice: 190,
    currency: 'USD',
    isPopular: true,
    features: [
      'Unlimited AI messages',
      '25 GB storage',
      'Priority support',
      'Custom integrations',
      'Analytics dashboard',
    ],
    limits: { messages: -1, storage_gb: 25, team_members: 1 },
  },
  {
    id: 'team',
    name: 'Team',
    description: 'Built for collaboration',
    monthlyPrice: 49,
    annualPrice: 490,
    currency: 'USD',
    features: [
      'Everything in Pro',
      'Up to 10 team members',
      '100 GB storage',
      'Dedicated support',
      'SSO & SAML',
      'Audit logs',
    ],
    limits: { messages: -1, storage_gb: 100, team_members: 10 },
  },
];

export const paymentService = {
  getPlans(): Plan[] {
    return PLANS;
  },

  getPlan(id: PlanId): Plan | undefined {
    return PLANS.find((p) => p.id === id);
  },

  getPlanPrice(plan: Plan, cycle: BillingCycle): number {
    return cycle === 'annual' ? plan.annualPrice : plan.monthlyPrice;
  },

  getAnnualSavings(plan: Plan): number {
    return plan.monthlyPrice * 12 - plan.annualPrice;
  },

  /**
   * Razorpay payment initiation scaffold.
   * Install `react-native-razorpay` and replace with real implementation.
   */
  async initiateRazorpay(
    amount: number,
    currency: string,
    description: string
  ): Promise<PaymentIntent> {
    // TODO: Implement with react-native-razorpay SDK
    // const Razorpay = require('react-native-razorpay').default;
    // const options = { key: ENV.RAZORPAY_KEY_ID, amount: amount * 100, currency, description };
    // const data = await Razorpay.open(options);
    console.log('[Payment] Razorpay scaffold:', { amount, currency, description });
    throw new Error('Razorpay integration: install react-native-razorpay and configure your key.');
  },

  /**
   * Stripe payment scaffold.
   * Install `@stripe/stripe-react-native` and replace with real implementation.
   */
  async initiateStripe(
    clientSecret: string
  ): Promise<PaymentIntent> {
    // TODO: Implement with @stripe/stripe-react-native
    // const { confirmPayment } = useStripe();
    // const { error, paymentIntent } = await confirmPayment(clientSecret, { paymentMethodType: 'Card' });
    console.log('[Payment] Stripe scaffold:', { clientSecret });
    throw new Error('Stripe integration: install @stripe/stripe-react-native and configure your key.');
  },

  async getSubscription(_userId: string): Promise<Subscription | null> {
    // TODO: Fetch from Supabase subscriptions table
    return null;
  },

  async cancelSubscription(_subscriptionId: string): Promise<void> {
    // TODO: Call your backend to cancel
    throw new Error('Not implemented');
  },
};
