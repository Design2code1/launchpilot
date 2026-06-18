import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import { ScreenWrapper } from '@/components/common/ScreenWrapper';
import { Header } from '@/components/common/Header';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { paymentService } from '@/services/paymentService';
import { PlanId } from '@/types/payment.types';

export default function PlansScreen() {
  const { colors } = useTheme();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const plans = paymentService.getPlans();

  const handleSelectPlan = (planId: PlanId) => {
    router.push({
      pathname: '/payments/checkout',
      params: { planId, billingCycle },
    });
  };

  return (
    <ScreenWrapper scrollable>
      <Header title="Plans" showBack />

      <View style={styles.content}>
        {/* Cycle Toggle */}
        <View style={[styles.toggleContainer, { backgroundColor: colors.surface }]}>
          <Pressable
            style={[styles.toggleBtn, billingCycle === 'monthly' && { backgroundColor: colors.surface2 }]}
            onPress={() => setBillingCycle('monthly')}
          >
            <Text style={[styles.toggleText, { color: colors.foreground }]}>Monthly</Text>
          </Pressable>
          <Pressable
            style={[styles.toggleBtn, billingCycle === 'annual' && { backgroundColor: colors.surface2 }]}
            onPress={() => setBillingCycle('annual')}
          >
            <Text style={[styles.toggleText, { color: colors.foreground }]}>Annual</Text>
          </Pressable>
        </View>

        {/* Plans List */}
        <View style={styles.plansWrap}>
          {plans.map((plan) => {
            const price = billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice;
            const savings = paymentService.getAnnualSavings(plan);

            return (
              <Card key={plan.id} style={styles.planCard}>
                <View style={styles.planHeader}>
                  <View>
                    <Text style={[styles.planName, { color: colors.foreground }]}>{plan.name}</Text>
                    <Text style={[styles.planDesc, { color: colors.foregroundMuted }]}>{plan.description}</Text>
                  </View>
                  {plan.isPopular && <Badge label="Popular" variant="accent" />}
                </View>

                <View style={styles.priceRow}>
                  <Text style={[styles.price, { color: colors.foreground }]}>${price}</Text>
                  <Text style={[styles.period, { color: colors.foregroundSubtle }]}>
                    /{billingCycle === 'annual' ? 'yr' : 'mo'}
                  </Text>
                </View>

                {billingCycle === 'annual' && savings > 0 && (
                  <Text style={[styles.savings, { color: colors.success }]}>Save ${savings} yearly</Text>
                )}

                {/* Features */}
                <View style={styles.featuresList}>
                  {plan.features.map((feat, idx) => (
                    <View key={idx} style={styles.featRow}>
                      <Feather name="check" size={16} color={colors.accent} />
                      <Text style={[styles.featText, { color: colors.foreground }]}>{feat}</Text>
                    </View>
                  ))}
                </View>

                <Button
                  label={plan.id === 'free' ? 'Current Plan' : 'Get Started'}
                  onPress={() => handleSelectPlan(plan.id)}
                  variant={plan.isPopular ? 'primary' : 'outline'}
                  disabled={plan.id === 'free'}
                  style={styles.planBtn}
                />
              </Card>
            );
          })}
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
  },
  toggleContainer: {
    flexDirection: 'row',
    padding: 4,
    borderRadius: 12,
    marginBottom: 24,
    maxWidth: 240,
    alignSelf: 'center',
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: 'center',
  },
  toggleText: {
    fontSize: 13,
    fontFamily: 'Inter_600SemiBold',
  },
  plansWrap: {
    gap: 16,
  },
  planCard: {
    marginBottom: 8,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  planName: {
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
  },
  planDesc: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    marginTop: 2,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 4,
  },
  price: {
    fontSize: 28,
    fontFamily: 'Inter_700Bold',
    letterSpacing: -0.5,
  },
  period: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    marginBottom: 4,
  },
  savings: {
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 16,
  },
  featuresList: {
    gap: 8,
    marginVertical: 16,
  },
  featRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  featText: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
  },
  planBtn: {
    marginTop: 8,
  },
});
