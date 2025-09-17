import React from 'react';
import { Text, View, ScrollView } from 'react-native';
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
          {/* Header Section */}
          <View style={[commonStyles.centerContent, { marginBottom: 60 }]}>
            <View style={{
              backgroundColor: colors.primary,
              borderRadius: 30,
              padding: 20,
              marginBottom: 24,
            }}>
              <Icon name="airplane" size={40} color="#FFFFFF" />
            </View>
            <Text style={commonStyles.title}>Airport Shuttle</Text>
            <Text style={commonStyles.subtitle}>
              Book your comfortable ride to and from the airport
            </Text>
          </View>

          {/* Features Section */}
          <View style={commonStyles.section}>
            <View style={commonStyles.card}>
              <View style={[commonStyles.row, { marginBottom: 16 }]}>
                <Icon name="checkmark-circle" size={24} color={colors.success} />
                <Text style={[commonStyles.text, { marginLeft: 12, flex: 1 }]}>
                  Easy booking process
                </Text>
              </View>
              <View style={[commonStyles.row, { marginBottom: 16 }]}>
                <Icon name="people" size={24} color={colors.success} />
                <Text style={[commonStyles.text, { marginLeft: 12, flex: 1 }]}>
                  Add multiple passengers
                </Text>
              </View>
              <View style={commonStyles.row}>
                <Icon name="card" size={24} color={colors.success} />
                <Text style={[commonStyles.text, { marginLeft: 12, flex: 1 }]}>
                  Secure payment processing
                </Text>
              </View>
            </View>
          </View>

          {/* Pricing Info */}
          <View style={commonStyles.section}>
            <View style={[commonStyles.card, { backgroundColor: colors.backgroundAlt }]}>
              <Text style={[commonStyles.text, { fontWeight: '600', textAlign: 'center' }]}>
                Starting from SBD 150 per person
              </Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={commonStyles.section}>
            <Button
              text="Create Account"
              onPress={handleSignUp}
              style={{ backgroundColor: colors.primary, marginBottom: 12 }}
            />
            <Button
              text="Sign In"
              onPress={handleLogin}
              style={{ 
                backgroundColor: colors.background, 
                borderWidth: 2, 
                borderColor: colors.primary 
              }}
              textStyle={{ color: colors.primary }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
