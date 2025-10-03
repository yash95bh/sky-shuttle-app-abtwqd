
import React from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
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

  const handleProfile = () => {
    console.log('Navigate to profile');
    router.push('/main/profile');
  };

  const quickActions = [
    {
      title: 'Book Shuttle',
      subtitle: 'Schedule your airport transfer',
      icon: 'car-sport' as const,
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
    {
      title: 'Profile',
      subtitle: 'Manage your account settings',
      icon: 'person-circle' as const,
      color: colors.secondary,
      onPress: handleProfile,
    },
  ];

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={commonStyles.content}>
          {/* Header with Logo */}
          <View style={[commonStyles.section, { marginTop: 20 }]}>
            <View style={[commonStyles.row, { marginBottom: 20 }]}>
              <View style={{ flex: 1 }}>
                <Text style={[commonStyles.title, { fontSize: 28, color: colors.secondary }]}>
                  Welcome Back!
                </Text>
                <Text style={commonStyles.subtitle}>
                  Ready for your next journey?
                </Text>
              </View>
              <View style={{
                backgroundColor: colors.secondary,
                borderRadius: 16,
                padding: 12,
              }}>
                <Image 
                  source={require('../../assets/images/97ebd3fd-4c30-4d09-9e37-c04e5e7faf5b.png')}
                  style={{ 
                    width: 40, 
                    height: 40,
                    resizeMode: 'contain'
                  }}
                />
              </View>
            </View>
          </View>

          {/* Quick Actions */}
          <View style={commonStyles.section}>
            <Text style={[commonStyles.text, { fontWeight: '700', marginBottom: 16, fontSize: 18 }]}>
              Quick Actions
            </Text>
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={[commonStyles.cardCompact, { marginBottom: 12 }]}
                onPress={action.onPress}
                activeOpacity={0.7}
              >
                <View style={commonStyles.row}>
                  <View style={{
                    backgroundColor: `${action.color}15`,
                    borderRadius: 12,
                    padding: 12,
                    marginRight: 16,
                  }}>
                    <Icon name={action.icon} size={24} color={action.color} />
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
            <View style={[commonStyles.card, { 
              backgroundColor: `${colors.primary}08`,
              borderColor: `${colors.primary}20`,
              borderWidth: 1
            }]}>
              <View style={[commonStyles.centerContent, { marginBottom: 16 }]}>
                <View style={{
                  backgroundColor: colors.primary,
                  borderRadius: 50,
                  padding: 12,
                  marginBottom: 12,
                }}>
                  <Icon name="pricetag" size={24} color="#FFFFFF" />
                </View>
              </View>
              <Text style={[commonStyles.text, { 
                fontWeight: '700', 
                textAlign: 'center', 
                marginBottom: 8,
                fontSize: 18,
                color: colors.primary
              }]}>
                Transparent Pricing
              </Text>
              <Text style={[commonStyles.text, { 
                textAlign: 'center', 
                marginBottom: 16,
                fontWeight: '600',
                fontSize: 20,
                color: colors.secondary
              }]}>
                SBD 150 per person per trip
              </Text>
              <View style={[commonStyles.row, { justifyContent: 'center' }]}>
                <View style={[commonStyles.centerContent, { marginHorizontal: 12 }]}>
                  <Icon name="shield-checkmark" size={16} color={colors.success} />
                  <Text style={[commonStyles.textLight, { fontSize: 11, marginTop: 2 }]}>
                    No hidden fees
                  </Text>
                </View>
                <View style={[commonStyles.centerContent, { marginHorizontal: 12 }]}>
                  <Icon name="car-sport" size={16} color={colors.success} />
                  <Text style={[commonStyles.textLight, { fontSize: 11, marginTop: 2 }]}>
                    Premium vehicles
                  </Text>
                </View>
                <View style={[commonStyles.centerContent, { marginHorizontal: 12 }]}>
                  <Icon name="time" size={16} color={colors.success} />
                  <Text style={[commonStyles.textLight, { fontSize: 11, marginTop: 2 }]}>
                    24/7 service
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Features */}
          <View style={commonStyles.section}>
            <Text style={[commonStyles.text, { fontWeight: '700', marginBottom: 16, fontSize: 18 }]}>
              Why Choose Speed Shuttle?
            </Text>
            
            <View style={commonStyles.card}>
              <View style={[commonStyles.row, { marginBottom: 16, alignItems: 'flex-start' }]}>
                <View style={{
                  backgroundColor: `${colors.success}15`,
                  borderRadius: 8,
                  padding: 8,
                  marginRight: 12,
                }}>
                  <Icon name="time" size={18} color={colors.success} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 4 }]}>
                    Punctual Service
                  </Text>
                  <Text style={commonStyles.textLight}>
                    Always on time pickup and drop-off
                  </Text>
                </View>
              </View>
              
              <View style={[commonStyles.row, { marginBottom: 16, alignItems: 'flex-start' }]}>
                <View style={{
                  backgroundColor: `${colors.success}15`,
                  borderRadius: 8,
                  padding: 8,
                  marginRight: 12,
                }}>
                  <Icon name="shield-checkmark" size={18} color={colors.success} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 4 }]}>
                    Licensed & Insured
                  </Text>
                  <Text style={commonStyles.textLight}>
                    Professional drivers with full insurance coverage
                  </Text>
                </View>
              </View>
              
              <View style={[commonStyles.row, { marginBottom: 16, alignItems: 'flex-start' }]}>
                <View style={{
                  backgroundColor: `${colors.success}15`,
                  borderRadius: 8,
                  padding: 8,
                  marginRight: 12,
                }}>
                  <Icon name="car-sport" size={18} color={colors.success} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 4 }]}>
                    Premium Fleet
                  </Text>
                  <Text style={commonStyles.textLight}>
                    Comfortable and well-maintained vehicles
                  </Text>
                </View>
              </View>
              
              <View style={[commonStyles.row, { alignItems: 'flex-start' }]}>
                <View style={{
                  backgroundColor: `${colors.success}15`,
                  borderRadius: 8,
                  padding: 8,
                  marginRight: 12,
                }}>
                  <Icon name="headset" size={18} color={colors.success} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 4 }]}>
                    24/7 Support
                  </Text>
                  <Text style={commonStyles.textLight}>
                    Round-the-clock customer assistance
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* CTA Button */}
          <View style={commonStyles.section}>
            <Button
              text="Book Your Shuttle Now"
              onPress={handleBookShuttle}
              style={{ 
                backgroundColor: colors.primary,
                borderRadius: 12,
                padding: 18,
                boxShadow: `0px 6px 20px ${colors.primary}40`,
                elevation: 6
              }}
              textStyle={{ fontSize: 16, fontWeight: '700' }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
