
import React from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { commonStyles, colors } from '../../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Button from '../../components/Button';
import Icon from '../../components/Icon';

export default function HomeScreen() {
  console.log('HomeScreen rendered');

  const handleBookShuttle = () => {
    console.log('Navigate to flight info');
    router.push('/main/flight-info');
  };

  const handleMyBookings = () => {
    console.log('Navigate to my bookings');
    router.push('/main/my-bookings');
  };

  const quickActions = [
    {
      title: 'Book Shuttle',
      subtitle: 'Schedule your airport transfer',
      icon: 'airplane' as const,
      color: colors.primary,
      onPress: handleBookShuttle,
    },
    {
      title: 'My Bookings',
      subtitle: 'View your upcoming trips',
      icon: 'list' as const,
      color: colors.accent,
      onPress: handleMyBookings,
    },
  ];

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={commonStyles.content}>
          {/* Header */}
          <View style={[commonStyles.section, { marginTop: 20 }]}>
            <Text style={commonStyles.title}>Welcome Back!</Text>
            <Text style={commonStyles.subtitle}>
              Ready for your next airport transfer?
            </Text>
          </View>

          {/* Quick Actions */}
          <View style={commonStyles.section}>
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={[commonStyles.card, { marginBottom: 16 }]}
                onPress={action.onPress}
              >
                <View style={commonStyles.row}>
                  <View style={{
                    backgroundColor: action.color,
                    borderRadius: 12,
                    padding: 12,
                    marginRight: 16,
                  }}>
                    <Icon name={action.icon} size={24} color="#FFFFFF" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 4 }]}>
                      {action.title}
                    </Text>
                    <Text style={commonStyles.textLight}>
                      {action.subtitle}
                    </Text>
                  </View>
                  <Icon name="chevron-forward" size={20} color={colors.textLight} />
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Pricing Info */}
          <View style={commonStyles.section}>
            <View style={[commonStyles.card, { backgroundColor: colors.backgroundAlt }]}>
              <View style={[commonStyles.centerContent, { marginBottom: 16 }]}>
                <Icon name="pricetag" size={32} color={colors.primary} />
              </View>
              <Text style={[commonStyles.text, { fontWeight: '600', textAlign: 'center', marginBottom: 8 }]}>
                Transparent Pricing
              </Text>
              <Text style={[commonStyles.textLight, { textAlign: 'center', marginBottom: 16 }]}>
                SBD 150 per person per trip
              </Text>
              <Text style={[commonStyles.textLight, { textAlign: 'center', fontSize: 12 }]}>
                No hidden fees • Safe & reliable • 24/7 service
              </Text>
            </View>
          </View>

          {/* Features */}
          <View style={commonStyles.section}>
            <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 16 }]}>
              Why Choose Our Service?
            </Text>
            
            <View style={commonStyles.card}>
              <View style={[commonStyles.row, { marginBottom: 12 }]}>
                <Icon name="time" size={20} color={colors.success} />
                <Text style={[commonStyles.textLight, { marginLeft: 12 }]}>
                  Punctual pickup and drop-off
                </Text>
              </View>
              <View style={[commonStyles.row, { marginBottom: 12 }]}>
                <Icon name="shield-checkmark" size={20} color={colors.success} />
                <Text style={[commonStyles.textLight, { marginLeft: 12 }]}>
                  Licensed and insured drivers
                </Text>
              </View>
              <View style={[commonStyles.row, { marginBottom: 12 }]}>
                <Icon name="car-sport" size={20} color={colors.success} />
                <Text style={[commonStyles.textLight, { marginLeft: 12 }]}>
                  Comfortable and clean vehicles
                </Text>
              </View>
              <View style={commonStyles.row}>
                <Icon name="call" size={20} color={colors.success} />
                <Text style={[commonStyles.textLight, { marginLeft: 12 }]}>
                  24/7 customer support
                </Text>
              </View>
            </View>
          </View>

          {/* CTA Button */}
          <View style={commonStyles.section}>
            <Button
              text="Book Your Shuttle Now"
              onPress={handleBookShuttle}
              style={{ backgroundColor: colors.primary }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
