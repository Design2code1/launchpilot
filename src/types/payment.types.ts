export type PlanId = 'free' | 'pro' | 'team';
export type BillingCycle = 'monthly' | 'annual';
export type PaymentProvider = 'razorpay' | 'stripe';
export type PaymentStatus = 'pending' | 'processing' | 'succeeded' | 'failed' | 'cancelled';

export interface Plan {
  id: PlanId;
  name: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  currency: string;
  features: string[];
  isPopular?: boolean;
  limits: {
    messages: number;
    storage_gb: number;
    team_members: number;
  };
}

export interface Subscription {
  id: string;
  plan: PlanId;
  billing_cycle: BillingCycle;
  status: 'active' | 'cancelled' | 'past_due' | 'trialing';
  current_period_end: string;
  cancel_at_period_end: boolean;
  provider: PaymentProvider;
}

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  provider: PaymentProvider;
  metadata?: Record<string, string>;
}
