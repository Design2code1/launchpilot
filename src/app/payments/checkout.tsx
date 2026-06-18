import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';
import { ScreenWrapper } from '@/components/common/ScreenWrapper';
import { Header } from '@/components/common/Header';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { paymentService } from '@/services/paymentService';
import { useToast } from '@/components/ui/Toast';
import { PlanId } from '@/types/payment.types';

export default function CheckoutScreen() {
  const { colors } = useTheme();
  const { updateUser } = useAuth();
  const { showToast } = useToast();
  const { planId, billingCycle } = useLocalSearchParams<{ planId: PlanId; billingCycle: 'monthly' | 'annual' }>();

  const plan = paymentService.getPlan(planId);
  const [loading, setLoading] = useState(false);

  const handlePayment = () => {
    if (!plan) return;
    setLoading(true);

    // Mock payment gateway delay
    setTimeout(() => {
      updateUser({ plan: plan.id });
      setLoading(false);
      showToast(`Welcome to ${plan.name}! Transaction completed.`, 'success');
      router.replace('/(tabs)');
    }, 2000);
  };

  if (!plan) {
    return (
      <ScreenWrapper>
        <Header title="Checkout" showBack />
        <View style={styles.errorContainer}>
          <Text style={{ color: colors.destructive }}>Plan details not found.</Text>
        </View>
      </ScreenWrapper>
    );
  }

  const price = billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice;

  return (
    <ScreenWrapper>
      <Header title="Secure Checkout" showBack />

      <View style={styles.content}>
        <Card style={styles.checkoutCard}>
          <Text style={[styles.summaryTitle, { color: colors.foregroundMuted }]}>Order Summary</Text>
          <Text style={[styles.planTitle, { color: colors.foreground }]}>{plan.name} Plan</Text>
          <Text style={[styles.billingPeriod, { color: colors.foregroundMuted }]}>
            Billing: {billingCycle === 'annual' ? 'Annually' : 'Monthly'}
          </Text>

          <View style={[styles.divider, { backgroundColor: colors.borderSubtle }]} />

          <View style={styles.priceRow}>
            <Text style={[styles.totalText, { color: colors.foreground }]}>Total due now</Text>
            <Text style={[styles.totalPrice, { color: colors.foreground }]}>${price}</Text>
          </View>
        </Card>

        <Text style={[styles.disclaimer, { color: colors.foregroundSubtle }]}>
          This is a simulated secure checkout environment demonstrating payment processing flows.
        </Text>

        <Button
          label={loading ? 'Processing...' : `Pay $${price}`}
          onPress={handlePayment}
          isLoading={loading}
          fullWidth
          style={styles.payBtn}
        />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
  },
  checkoutCard: {
    marginBottom: 24,
  },
  summaryTitle: {
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 12,
  },
  planTitle: {
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
  },
  billingPeriod: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    marginTop: 4,
  },
  divider: {
    height: 1,
    marginVertical: 16,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalText: {
    fontSize: 15,
    fontFamily: 'Inter_600SemiBold',
  },
  totalPrice: {
    fontSize: 22,
    fontFamily: 'Inter_700Bold',
  },
  disclaimer: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  payBtn: {
    marginTop: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
