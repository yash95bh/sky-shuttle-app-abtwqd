
import React, { useState } from 'react';
import { Text, View, ScrollView, TextInput, Alert, TouchableOpacity } from 'react-native';
import { commonStyles, colors } from '../../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Button from '../../components/Button';
import Icon from '../../components/Icon';

interface Passenger {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
}

export default function PassengersScreen() {
  console.log('PassengersScreen rendered');

  const [passengers, setPassengers] = useState<Passenger[]>([
    {
      id: '1',
      firstName: '',
      lastName: '',
      email: '',
      mobile: '',
    }
  ]);

  const pricePerPerson = 150;
  const totalPrice = passengers.length * pricePerPerson;

  const handlePassengerChange = (id: string, field: keyof Passenger, value: string) => {
    setPassengers(prev => prev.map(passenger => 
      passenger.id === id ? { ...passenger, [field]: value } : passenger
    ));
  };

  const addPassenger = () => {
    console.log('Adding new passenger');
    const newPassenger: Passenger = {
      id: Date.now().toString(),
      firstName: '',
      lastName: '',
      email: '',
      mobile: '',
    };
    setPassengers(prev => [...prev, newPassenger]);
  };

  const removePassenger = (id: string) => {
    console.log('Removing passenger:', id);
    if (passengers.length > 1) {
      setPassengers(prev => prev.filter(passenger => passenger.id !== id));
    } else {
      Alert.alert('Error', 'At least one passenger is required');
    }
  };

  const handleContinue = () => {
    console.log('Continue with passengers:', passengers);
    console.log('Total price:', totalPrice);
    
    // Validate all passengers have required fields
    const isValid = passengers.every(passenger => 
      passenger.firstName && passenger.lastName && passenger.email && passenger.mobile
    );

    if (!isValid) {
      Alert.alert('Error', 'Please fill in all passenger details');
      return;
    }

    // Check if documents are uploaded (in a real app, this would be stored in state/context)
    Alert.alert(
      'Document Upload Required',
      'Before confirming your booking, please ensure you have uploaded copies of your passport and credit card details.',
      [
        {
          text: 'Upload Documents',
          onPress: () => router.push('/auth/document-upload')
        },
        {
          text: 'Continue to Booking',
          onPress: () => router.push('/main/booking-confirmation')
        }
      ]
    );
  };

  const handleBack = () => {
    console.log('Navigate back to flight info');
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
              <Text style={commonStyles.title}>Passenger Details</Text>
              <Text style={commonStyles.subtitle}>
                Add passengers for your trip
              </Text>
            </View>
          </View>

          {/* Price Summary at Top */}
          <View style={commonStyles.section}>
            <View style={[commonStyles.card, { backgroundColor: colors.backgroundAlt }]}>
              <View style={[commonStyles.row, { marginBottom: 8 }]}>
                <Icon name="calculator" size={20} color={colors.primary} />
                <Text style={[commonStyles.text, { marginLeft: 8, fontWeight: '600' }]}>
                  Price Calculator
                </Text>
              </View>
              
              <View style={[commonStyles.row, { marginBottom: 8 }]}>
                <Text style={commonStyles.textLight}>
                  {passengers.length} passenger{passengers.length > 1 ? 's' : ''} × SBD {pricePerPerson} per person
                </Text>
                <Text style={[commonStyles.text, { fontWeight: '600', color: colors.primary }]}>
                  SBD {totalPrice}
                </Text>
              </View>
              
              <Text style={[commonStyles.textLight, { fontSize: 12 }]}>
                Price updates automatically as you add or remove passengers
              </Text>
            </View>
          </View>

          {/* Passengers List */}
          <View style={commonStyles.section}>
            {passengers.map((passenger, index) => (
              <View key={passenger.id} style={[commonStyles.card, { marginBottom: 16 }]}>
                <View style={[commonStyles.row, { marginBottom: 16 }]}>
                  <Text style={[commonStyles.text, { fontWeight: '600', flex: 1 }]}>
                    Passenger {index + 1}
                  </Text>
                  {passengers.length > 1 && (
                    <TouchableOpacity
                      onPress={() => removePassenger(passenger.id)}
                      style={{ padding: 4 }}
                    >
                      <Icon name="close-circle" size={20} color={colors.error} />
                    </TouchableOpacity>
                  )}
                </View>

                <Text style={commonStyles.inputLabel}>First Name *</Text>
                <TextInput
                  style={commonStyles.input}
                  value={passenger.firstName}
                  onChangeText={(value) => handlePassengerChange(passenger.id, 'firstName', value)}
                  placeholder="Enter first name"
                  placeholderTextColor={colors.textLight}
                />

                <Text style={commonStyles.inputLabel}>Last Name *</Text>
                <TextInput
                  style={commonStyles.input}
                  value={passenger.lastName}
                  onChangeText={(value) => handlePassengerChange(passenger.id, 'lastName', value)}
                  placeholder="Enter last name"
                  placeholderTextColor={colors.textLight}
                />

                <Text style={commonStyles.inputLabel}>Email Address *</Text>
                <TextInput
                  style={commonStyles.input}
                  value={passenger.email}
                  onChangeText={(value) => handlePassengerChange(passenger.id, 'email', value)}
                  placeholder="Enter email address"
                  placeholderTextColor={colors.textLight}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />

                <Text style={commonStyles.inputLabel}>Mobile Number *</Text>
                <TextInput
                  style={[commonStyles.input, { marginBottom: 0 }]}
                  value={passenger.mobile}
                  onChangeText={(value) => handlePassengerChange(passenger.id, 'mobile', value)}
                  placeholder="Enter mobile number"
                  placeholderTextColor={colors.textLight}
                  keyboardType="phone-pad"
                />
              </View>
            ))}

            {/* Add Passenger Button */}
            <TouchableOpacity
              style={[
                commonStyles.card,
                { 
                  backgroundColor: colors.backgroundAlt,
                  borderStyle: 'dashed',
                  borderWidth: 2,
                  borderColor: colors.primary,
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 30,
                }
              ]}
              onPress={addPassenger}
            >
              <Icon name="add-circle" size={32} color={colors.primary} />
              <Text style={[commonStyles.text, { color: colors.primary, marginTop: 8 }]}>
                Add Another Passenger
              </Text>
              <Text style={[commonStyles.textLight, { marginTop: 4, fontSize: 12 }]}>
                +SBD {pricePerPerson} per additional passenger
              </Text>
            </TouchableOpacity>
          </View>

          {/* Document Requirements */}
          <View style={commonStyles.section}>
            <View style={[commonStyles.card, { backgroundColor: colors.backgroundAlt }]}>
              <View style={[commonStyles.row, { marginBottom: 8 }]}>
                <Icon name="document-text" size={20} color={colors.primary} />
                <Text style={[commonStyles.text, { marginLeft: 8, fontWeight: '600' }]}>
                  Required Documents
                </Text>
              </View>
              <Text style={commonStyles.textLight}>
                Before booking, ensure you have uploaded:
              </Text>
              <View style={[commonStyles.row, { marginTop: 8, alignItems: 'center' }]}>
                <Icon name="checkmark-circle" size={16} color={colors.success} />
                <Text style={[commonStyles.textLight, { marginLeft: 8 }]}>
                  Copy of passport
                </Text>
              </View>
              <View style={[commonStyles.row, { marginTop: 4, alignItems: 'center' }]}>
                <Icon name="checkmark-circle" size={16} color={colors.success} />
                <Text style={[commonStyles.textLight, { marginLeft: 8 }]}>
                  Copy of credit card details
                </Text>
              </View>
            </View>
          </View>

          {/* Final Price Summary */}
          <View style={commonStyles.section}>
            <View style={[commonStyles.card, { backgroundColor: colors.primary, opacity: 0.1 }]}>
              <View style={[commonStyles.row, { alignItems: 'center' }]}>
                <View style={{ flex: 1 }}>
                  <Text style={[commonStyles.text, { fontWeight: '600', color: colors.primary }]}>
                    Total Amount
                  </Text>
                  <Text style={[commonStyles.textLight, { fontSize: 12 }]}>
                    {passengers.length} passenger{passengers.length > 1 ? 's' : ''} × SBD {pricePerPerson}
                  </Text>
                </View>
                <Text style={[commonStyles.text, { fontWeight: '700', fontSize: 24, color: colors.primary }]}>
                  SBD {totalPrice}
                </Text>
              </View>
            </View>
          </View>

          {/* Action Button */}
          <View style={commonStyles.section}>
            <Button
              text={`Continue - SBD ${totalPrice}`}
              onPress={handleContinue}
              style={{ backgroundColor: colors.primary }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
