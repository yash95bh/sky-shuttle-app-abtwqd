
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
    }
  };

  const handleContinue = () => {
    console.log('Continue with passengers:', passengers);
    
    // Validate all passengers have required fields
    const isValid = passengers.every(passenger => 
      passenger.firstName && passenger.lastName && passenger.email && passenger.mobile
    );

    if (!isValid) {
      Alert.alert('Error', 'Please fill in all passenger details');
      return;
    }

    router.push('/main/booking-confirmation');
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

                <Text style={commonStyles.inputLabel}>First Name</Text>
                <TextInput
                  style={commonStyles.input}
                  value={passenger.firstName}
                  onChangeText={(value) => handlePassengerChange(passenger.id, 'firstName', value)}
                  placeholder="Enter first name"
                  placeholderTextColor={colors.textLight}
                />

                <Text style={commonStyles.inputLabel}>Last Name</Text>
                <TextInput
                  style={commonStyles.input}
                  value={passenger.lastName}
                  onChangeText={(value) => handlePassengerChange(passenger.id, 'lastName', value)}
                  placeholder="Enter last name"
                  placeholderTextColor={colors.textLight}
                />

                <Text style={commonStyles.inputLabel}>Email Address</Text>
                <TextInput
                  style={commonStyles.input}
                  value={passenger.email}
                  onChangeText={(value) => handlePassengerChange(passenger.id, 'email', value)}
                  placeholder="Enter email address"
                  placeholderTextColor={colors.textLight}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />

                <Text style={commonStyles.inputLabel}>Mobile Number</Text>
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
            </TouchableOpacity>
          </View>

          {/* Price Summary */}
          <View style={commonStyles.section}>
            <View style={[commonStyles.card, { backgroundColor: colors.backgroundAlt }]}>
              <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 16 }]}>
                Price Summary
              </Text>
              
              <View style={[commonStyles.row, { marginBottom: 8 }]}>
                <Text style={commonStyles.textLight}>
                  {passengers.length} passenger{passengers.length > 1 ? 's' : ''} × SBD {pricePerPerson}
                </Text>
                <Text style={commonStyles.text}>
                  SBD {passengers.length * pricePerPerson}
                </Text>
              </View>
              
              <View style={[commonStyles.row, { paddingTop: 16, borderTopWidth: 1, borderTopColor: colors.border }]}>
                <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                  Total Amount
                </Text>
                <Text style={[commonStyles.text, { fontWeight: '700', fontSize: 18, color: colors.primary }]}>
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
