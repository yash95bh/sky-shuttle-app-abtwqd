
import React, { useState } from 'react';
import { Text, View, ScrollView, TextInput, Alert } from 'react-native';
import { commonStyles, colors } from '../../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Button from '../../components/Button';
import Icon from '../../components/Icon';

export default function SignUpScreen() {
  console.log('SignUpScreen rendered');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSignUp = () => {
    console.log('Sign up attempt with:', formData);
    
    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || 
        !formData.mobile || !formData.password || !formData.confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }

    // Navigate to document upload
    router.push('/auth/document-upload');
  };

  const handleBackToWelcome = () => {
    console.log('Navigate back to welcome');
    router.back();
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={commonStyles.content}>
          {/* Header */}
          <View style={[commonStyles.row, { marginTop: 20, marginBottom: 40 }]}>
            <Button
              text=""
              onPress={handleBackToWelcome}
              style={{
                backgroundColor: 'transparent',
                width: 40,
                height: 40,
                padding: 0,
                marginRight: 16,
              }}
              textStyle={{ display: 'none' }}
            >
              <Icon name="arrow-back" size={24} color={colors.text} />
            </Button>
            <View style={{ flex: 1 }}>
              <Text style={commonStyles.title}>Create Account</Text>
              <Text style={commonStyles.subtitle}>
                Join us for seamless airport transfers
              </Text>
            </View>
          </View>

          {/* Form */}
          <View style={commonStyles.section}>
            <View style={commonStyles.card}>
              <Text style={commonStyles.inputLabel}>First Name</Text>
              <TextInput
                style={commonStyles.input}
                value={formData.firstName}
                onChangeText={(value) => handleInputChange('firstName', value)}
                placeholder="Enter your first name"
                placeholderTextColor={colors.textLight}
              />

              <Text style={commonStyles.inputLabel}>Last Name</Text>
              <TextInput
                style={commonStyles.input}
                value={formData.lastName}
                onChangeText={(value) => handleInputChange('lastName', value)}
                placeholder="Enter your last name"
                placeholderTextColor={colors.textLight}
              />

              <Text style={commonStyles.inputLabel}>Email Address</Text>
              <TextInput
                style={commonStyles.input}
                value={formData.email}
                onChangeText={(value) => handleInputChange('email', value)}
                placeholder="Enter your email"
                placeholderTextColor={colors.textLight}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <Text style={commonStyles.inputLabel}>Mobile Number</Text>
              <TextInput
                style={commonStyles.input}
                value={formData.mobile}
                onChangeText={(value) => handleInputChange('mobile', value)}
                placeholder="Enter your mobile number"
                placeholderTextColor={colors.textLight}
                keyboardType="phone-pad"
              />

              <Text style={commonStyles.inputLabel}>Password</Text>
              <TextInput
                style={commonStyles.input}
                value={formData.password}
                onChangeText={(value) => handleInputChange('password', value)}
                placeholder="Create a password"
                placeholderTextColor={colors.textLight}
                secureTextEntry
              />

              <Text style={commonStyles.inputLabel}>Confirm Password</Text>
              <TextInput
                style={[commonStyles.input, { marginBottom: 0 }]}
                value={formData.confirmPassword}
                onChangeText={(value) => handleInputChange('confirmPassword', value)}
                placeholder="Confirm your password"
                placeholderTextColor={colors.textLight}
                secureTextEntry
              />
            </View>
          </View>

          {/* Action Button */}
          <View style={commonStyles.section}>
            <Button
              text="Continue"
              onPress={handleSignUp}
              style={{ backgroundColor: colors.primary }}
            />
          </View>

          {/* Login Link */}
          <View style={[commonStyles.centerContent, { marginTop: 20 }]}>
            <Text style={commonStyles.textLight}>
              Already have an account?{' '}
              <Text 
                style={{ color: colors.primary, fontWeight: '600' }}
                onPress={() => router.push('/auth/login')}
              >
                Sign In
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
