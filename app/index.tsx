
import React from 'react';
import { Text, View, ScrollView, Image } from 'react-native';
import { commonStyles, colors } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Button from '../components/Button';
import Icon from '../components/Icon';

export default function WelcomeScreen() {
  console.log('WelcomeScreen rendered');

  const handleSignUp = () => {
    console.log('Navigate to signup');
    router.push('/auth/signup');
  };

  const handleLogin = () => {
    console.log('Navigate to login');
    router.push('/auth/login');
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={[commonStyles.content, { paddingTop: 60, paddingBottom: 40 }]}>
          {/* Header Section with New Logo */}
          <View style={[commonStyles.centerContent, { marginBottom: 60 }]}>
            <View style={commonStyles.logoContainer}>
              <Image 
                source={require('../assets/images/97ebd3fd-4c30-4d09-9e37-c04e5e7faf5b.png')}
                style={{ 
                  width: 80, 
                  height: 80,
                  resizeMode: 'contain'
                }}
              />
            </View>
            <Text style={[commonStyles.title, { color: colors.secondary }]}>Speed Shuttle</Text>
            <Text style={commonStyles.subtitle}>
              Premium airport transfers with style and comfort
            </Text>
          </View>

          {/* Features Section */}
          <View style={commonStyles.section}>
            <View style={commonStyles.card}>
              <View style={[commonStyles.row, { marginBottom: 20 }]}>
                <Icon name="checkmark-circle" size={24} color={colors.success} />
                <Text style={[commonStyles.text, { marginLeft: 12, flex: 1, fontWeight: '500' }]}>
                  Seamless booking experience
                </Text>
              </View>
              <View style={[commonStyles.row, { marginBottom: 20 }]}>
                <Icon name="people" size={24} color={colors.success} />
                <Text style={[commonStyles.text, { marginLeft: 12, flex: 1, fontWeight: '500' }]}>
                  Group bookings made easy
                </Text>
              </View>
              <View style={[commonStyles.row, { marginBottom: 20 }]}>
                <Icon name="shield-checkmark" size={24} color={colors.success} />
                <Text style={[commonStyles.text, { marginLeft: 12, flex: 1, fontWeight: '500' }]}>
                  Secure & reliable service
                </Text>
              </View>
              <View style={commonStyles.row}>
                <Icon name="time" size={24} color={colors.success} />
                <Text style={[commonStyles.text, { marginLeft: 12, flex: 1, fontWeight: '500' }]}>
                  24/7 customer support
                </Text>
              </View>
            </View>
          </View>

          {/* Pricing Info */}
          <View style={commonStyles.section}>
            <View style={[commonStyles.card, { 
              backgroundColor: `${colors.primary}10`,
              borderColor: `${colors.primary}30`,
              borderWidth: 1
            }]}>
              <View style={[commonStyles.centerContent, { marginBottom: 12 }]}>
                <Icon name="pricetag" size={28} color={colors.primary} />
              </View>
              <Text style={[commonStyles.text, { 
                fontWeight: '700', 
                textAlign: 'center',
                color: colors.primary,
                fontSize: 18
              }]}>
                Starting from SBD 150 per person
              </Text>
              <Text style={[commonStyles.textLight, { textAlign: 'center', marginTop: 4 }]}>
                Transparent pricing • No hidden fees
              </Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={commonStyles.section}>
            <Button
              text="Create Account"
              onPress={handleSignUp}
              style={{ 
                backgroundColor: colors.primary, 
                marginBottom: 16,
                borderRadius: 12,
                padding: 18
              }}
              textStyle={{ fontSize: 16, fontWeight: '600' }}
            />
            <Button
              text="Sign In"
              onPress={handleLogin}
              style={{ 
                backgroundColor: colors.background, 
                borderWidth: 2, 
                borderColor: colors.primary,
                borderRadius: 12,
                padding: 18
              }}
              textStyle={{ color: colors.primary, fontSize: 16, fontWeight: '600' }}
            />
          </View>

          {/* Trust Indicators */}
          <View style={[commonStyles.section, { marginTop: 40 }]}>
            <View style={[commonStyles.row, { justifyContent: 'center' }]}>
              <View style={[commonStyles.centerContent, { marginHorizontal: 20 }]}>
                <Icon name="star" size={20} color={colors.accent} />
                <Text style={[commonStyles.textLight, { fontSize: 12, marginTop: 4 }]}>
                  5-Star Service
                </Text>
              </View>
              <View style={[commonStyles.centerContent, { marginHorizontal: 20 }]}>
                <Icon name="shield-checkmark" size={20} color={colors.success} />
                <Text style={[commonStyles.textLight, { fontSize: 12, marginTop: 4 }]}>
                  Licensed & Insured
                </Text>
              </View>
              <View style={[commonStyles.centerContent, { marginHorizontal: 20 }]}>
                <Icon name="time" size={20} color={colors.primary} />
                <Text style={[commonStyles.textLight, { fontSize: 12, marginTop: 4 }]}>
                  Always On Time
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
