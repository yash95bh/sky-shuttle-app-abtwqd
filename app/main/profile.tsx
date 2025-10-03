
import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import { commonStyles, colors } from '../../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Button from '../../components/Button';
import Icon from '../../components/Icon';

export default function ProfileScreen() {
  console.log('ProfileScreen rendered');
  
  const [user] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    mobile: '+1234567890',
    joinDate: 'January 2024',
    totalBookings: 5,
  });

  const handleBack = () => {
    console.log('Navigate back to home');
    router.back();
  };

  const handleEditProfile = () => {
    console.log('Edit profile');
    Alert.alert('Edit Profile', 'Profile editing functionality would be implemented here.');
  };

  const handleChangePassword = () => {
    console.log('Change password');
    Alert.alert('Change Password', 'Password change functionality would be implemented here.');
  };

  const handleNotificationSettings = () => {
    console.log('Notification settings');
    Alert.alert('Notifications', 'Notification settings would be implemented here.');
  };

  const handleSupport = () => {
    console.log('Contact support');
    Alert.alert('Support', 'Contact support functionality would be implemented here.');
  };

  const handleLogout = () => {
    console.log('Logout');
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: () => {
            console.log('User logged out');
            router.replace('/');
          }
        }
      ]
    );
  };

  const handleDeleteAccount = () => {
    console.log('Delete account requested');
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone and will permanently remove all your data, including booking history.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete Account', 
          style: 'destructive',
          onPress: () => {
            // Second confirmation
            Alert.alert(
              'Final Confirmation',
              'This will permanently delete your account and all associated data. Type "DELETE" to confirm.',
              [
                { text: 'Cancel', style: 'cancel' },
                { 
                  text: 'Confirm Delete', 
                  style: 'destructive',
                  onPress: () => {
                    console.log('Account deletion confirmed');
                    // In a real app, this would call an API to delete the account
                    Alert.alert(
                      'Account Deleted',
                      'Your account has been successfully deleted.',
                      [
                        { 
                          text: 'OK', 
                          onPress: () => router.replace('/') 
                        }
                      ]
                    );
                  }
                }
              ]
            );
          }
        }
      ]
    );
  };

  const profileOptions = [
    {
      title: 'Edit Profile',
      subtitle: 'Update your personal information',
      icon: 'person-circle' as const,
      color: colors.primary,
      onPress: handleEditProfile,
    },
    {
      title: 'Change Password',
      subtitle: 'Update your account password',
      icon: 'lock-closed' as const,
      color: colors.secondary,
      onPress: handleChangePassword,
    },
    {
      title: 'Notifications',
      subtitle: 'Manage notification preferences',
      icon: 'notifications' as const,
      color: colors.accent,
      onPress: handleNotificationSettings,
    },
    {
      title: 'Support',
      subtitle: 'Get help and contact support',
      icon: 'help-circle' as const,
      color: colors.success,
      onPress: handleSupport,
    },
  ];

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={commonStyles.content}>
          {/* Header */}
          <View style={[commonStyles.row, { marginTop: 20, marginBottom: 30 }]}>
            <Button
              text=""
              onPress={handleBack}
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
              <Text style={commonStyles.title}>Profile</Text>
              <Text style={commonStyles.subtitle}>
                Manage your account settings
              </Text>
            </View>
          </View>

          {/* Profile Header */}
          <View style={commonStyles.section}>
            <View style={[commonStyles.card, { 
              backgroundColor: `${colors.primary}08`,
              borderColor: `${colors.primary}20`,
              borderWidth: 1
            }]}>
              <View style={[commonStyles.centerContent, { marginBottom: 20 }]}>
                <View style={{
                  backgroundColor: colors.primary,
                  borderRadius: 50,
                  padding: 20,
                  marginBottom: 16,
                }}>
                  <Icon name="person" size={40} color="#FFFFFF" />
                </View>
                <Text style={[commonStyles.text, { 
                  fontWeight: '700', 
                  fontSize: 20,
                  color: colors.secondary,
                  marginBottom: 4
                }]}>
                  {user.firstName} {user.lastName}
                </Text>
                <Text style={[commonStyles.textLight, { marginBottom: 8 }]}>
                  {user.email}
                </Text>
                <Text style={[commonStyles.textLight, { fontSize: 12 }]}>
                  Member since {user.joinDate}
                </Text>
              </View>

              <View style={[commonStyles.row, { justifyContent: 'center' }]}>
                <View style={[commonStyles.centerContent, { marginHorizontal: 20 }]}>
                  <Text style={[commonStyles.text, { 
                    fontWeight: '700', 
                    fontSize: 18,
                    color: colors.primary
                  }]}>
                    {user.totalBookings}
                  </Text>
                  <Text style={[commonStyles.textLight, { fontSize: 12 }]}>
                    Total Bookings
                  </Text>
                </View>
                <View style={[commonStyles.centerContent, { marginHorizontal: 20 }]}>
                  <Text style={[commonStyles.text, { 
                    fontWeight: '700', 
                    fontSize: 18,
                    color: colors.success
                  }]}>
                    5★
                  </Text>
                  <Text style={[commonStyles.textLight, { fontSize: 12 }]}>
                    Rating
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Profile Options */}
          <View style={commonStyles.section}>
            <Text style={[commonStyles.text, { fontWeight: '700', marginBottom: 16, fontSize: 18 }]}>
              Account Settings
            </Text>
            {profileOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[commonStyles.cardCompact, { marginBottom: 12 }]}
                onPress={option.onPress}
                activeOpacity={0.7}
              >
                <View style={commonStyles.row}>
                  <View style={{
                    backgroundColor: `${option.color}15`,
                    borderRadius: 12,
                    padding: 12,
                    marginRight: 16,
                  }}>
                    <Icon name={option.icon} size={20} color={option.color} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 2 }]}>
                      {option.title}
                    </Text>
                    <Text style={[commonStyles.textLight, { fontSize: 13 }]}>
                      {option.subtitle}
                    </Text>
                  </View>
                  <Icon name="chevron-forward" size={18} color={colors.textLight} />
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* App Info */}
          <View style={commonStyles.section}>
            <View style={[commonStyles.card, { backgroundColor: colors.backgroundAlt }]}>
              <View style={[commonStyles.row, { marginBottom: 12 }]}>
                <Image 
                  source={require('../../assets/images/97ebd3fd-4c30-4d09-9e37-c04e5e7faf5b.png')}
                  style={{ 
                    width: 32, 
                    height: 32,
                    resizeMode: 'contain',
                    marginRight: 12
                  }}
                />
                <View style={{ flex: 1 }}>
                  <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 2 }]}>
                    Speed Shuttle
                  </Text>
                  <Text style={[commonStyles.textLight, { fontSize: 12 }]}>
                    Version 1.0.0
                  </Text>
                </View>
              </View>
              <Text style={[commonStyles.textLight, { fontSize: 12, textAlign: 'center' }]}>
                Premium airport transfer service
              </Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={commonStyles.section}>
            <Button
              text="Logout"
              onPress={handleLogout}
              style={{ 
                backgroundColor: colors.backgroundAlt,
                borderWidth: 2,
                borderColor: colors.textLight,
                borderRadius: 12,
                padding: 16,
                marginBottom: 16
              }}
              textStyle={{ color: colors.text, fontWeight: '600' }}
            />
          </View>

          {/* Danger Zone */}
          <View style={commonStyles.section}>
            <View style={commonStyles.dangerZone}>
              <View style={[commonStyles.row, { marginBottom: 12, alignItems: 'flex-start' }]}>
                <Icon name="warning" size={20} color={colors.error} />
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={[commonStyles.text, { 
                    fontWeight: '600', 
                    color: colors.error,
                    marginBottom: 4
                  }]}>
                    Danger Zone
                  </Text>
                  <Text style={[commonStyles.textLight, { fontSize: 13, marginBottom: 16 }]}>
                    Once you delete your account, there is no going back. Please be certain.
                  </Text>
                  <Button
                    text="Delete Account"
                    onPress={handleDeleteAccount}
                    style={{ 
                      backgroundColor: colors.error,
                      borderRadius: 8,
                      padding: 12
                    }}
                    textStyle={{ fontSize: 14, fontWeight: '600' }}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
