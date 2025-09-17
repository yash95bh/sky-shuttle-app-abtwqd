
import React, { useState } from 'react';
import { Text, View, ScrollView, Alert } from 'react-native';
import { commonStyles, colors } from '../../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Button from '../../components/Button';
import Icon from '../../components/Icon';

export default function BookingConfirmationScreen() {
  console.log('BookingConfirmationScreen rendered');

  const [isConfirming, setIsConfirming] = useState(false);

  // Mock data - in a real app, this would come from previous screens or state management
  const bookingData = {
    bookingId: 'SH' + Date.now().toString().slice(-6),
    flightNumber: 'AA123',
    airline: 'American Airlines',
    departureAirport: 'JFK - New York',
    arrivalAirport: 'HIR - Honiara',
    departureDate: new Date().toLocaleDateString(),
    departureTime: '14:30',
    passengers: [
      { name: 'John Doe', email: 'john@example.com' },
      { name: 'Jane Doe', email: 'jane@example.com' },
    ],
    totalAmount: 300,
    pricePerPerson: 150,
  };

  const handleConfirmBooking = async () => {
    console.log('Confirming booking:', bookingData);
    setIsConfirming(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Alert.alert(
        'Booking Confirmed!',
        `Your booking ${bookingData.bookingId} has been confirmed. You will receive a confirmation email shortly.`,
        [
          {
            text: 'View My Bookings',
            onPress: () => router.push('/main/my-bookings')
          }
        ]
      );
    } catch (error) {
      console.error('Booking confirmation error:', error);
      Alert.alert('Error', 'Failed to confirm booking. Please try again.');
    } finally {
      setIsConfirming(false);
    }
  };

  const handleBack = () => {
    console.log('Navigate back to passengers');
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
              <Text style={commonStyles.title}>Confirm Booking</Text>
              <Text style={commonStyles.subtitle}>
                Review your booking details
              </Text>
            </View>
          </View>

          {/* Booking Summary */}
          <View style={commonStyles.section}>
            <View style={commonStyles.card}>
              <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 16 }]}>
                Flight Details
              </Text>
              
              <View style={[commonStyles.row, { marginBottom: 8 }]}>
                <Text style={commonStyles.textLight}>Flight:</Text>
                <Text style={commonStyles.text}>
                  {bookingData.flightNumber} - {bookingData.airline}
                </Text>
              </View>
              
              <View style={[commonStyles.row, { marginBottom: 8 }]}>
                <Text style={commonStyles.textLight}>From:</Text>
                <Text style={commonStyles.text}>{bookingData.departureAirport}</Text>
              </View>
              
              <View style={[commonStyles.row, { marginBottom: 8 }]}>
                <Text style={commonStyles.textLight}>To:</Text>
                <Text style={commonStyles.text}>{bookingData.arrivalAirport}</Text>
              </View>
              
              <View style={[commonStyles.row, { marginBottom: 8 }]}>
                <Text style={commonStyles.textLight}>Date:</Text>
                <Text style={commonStyles.text}>{bookingData.departureDate}</Text>
              </View>
              
              <View style={commonStyles.row}>
                <Text style={commonStyles.textLight}>Time:</Text>
                <Text style={commonStyles.text}>{bookingData.departureTime}</Text>
              </View>
            </View>
          </View>

          {/* Passengers */}
          <View style={commonStyles.section}>
            <View style={commonStyles.card}>
              <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 16 }]}>
                Passengers ({bookingData.passengers.length})
              </Text>
              
              {bookingData.passengers.map((passenger, index) => (
                <View key={index} style={[commonStyles.row, { marginBottom: 8 }]}>
                  <Icon name="person" size={16} color={colors.textLight} />
                  <Text style={[commonStyles.text, { marginLeft: 8, flex: 1 }]}>
                    {passenger.name}
                  </Text>
                  <Text style={commonStyles.textLight}>
                    SBD {bookingData.pricePerPerson}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Price Breakdown */}
          <View style={commonStyles.section}>
            <View style={[commonStyles.card, { backgroundColor: colors.backgroundAlt }]}>
              <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 16 }]}>
                Price Breakdown
              </Text>
              
              <View style={[commonStyles.row, { marginBottom: 8 }]}>
                <Text style={commonStyles.textLight}>
                  Shuttle service ({bookingData.passengers.length} passengers)
                </Text>
                <Text style={commonStyles.text}>
                  SBD {bookingData.totalAmount}
                </Text>
              </View>
              
              <View style={[commonStyles.row, { marginBottom: 8 }]}>
                <Text style={commonStyles.textLight}>Taxes & fees</Text>
                <Text style={commonStyles.text}>SBD 0</Text>
              </View>
              
              <View style={[
                commonStyles.row, 
                { 
                  paddingTop: 16, 
                  borderTopWidth: 1, 
                  borderTopColor: colors.border 
                }
              ]}>
                <Text style={[commonStyles.text, { fontWeight: '700', fontSize: 18 }]}>
                  Total Amount
                </Text>
                <Text style={[commonStyles.text, { fontWeight: '700', fontSize: 18, color: colors.primary }]}>
                  SBD {bookingData.totalAmount}
                </Text>
              </View>
            </View>
          </View>

          {/* Terms Notice */}
          <View style={commonStyles.section}>
            <View style={[commonStyles.card, { backgroundColor: colors.backgroundAlt }]}>
              <View style={[commonStyles.row, { marginBottom: 8 }]}>
                <Icon name="information-circle" size={20} color={colors.primary} />
                <Text style={[commonStyles.text, { marginLeft: 8, fontWeight: '600' }]}>
                  Important Information
                </Text>
              </View>
              <Text style={[commonStyles.textLight, { fontSize: 12, lineHeight: 18 }]}>
                • Please arrive at pickup location 15 minutes early{'\n'}
                • Cancellation allowed up to 24 hours before departure{'\n'}
                • Confirmation email will be sent to all passengers{'\n'}
                • Driver contact details will be shared 2 hours before pickup
              </Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={commonStyles.section}>
            <Button
              text={isConfirming ? "Confirming..." : "Confirm & Pay"}
              onPress={handleConfirmBooking}
              style={{ 
                backgroundColor: isConfirming ? colors.grey : colors.primary,
                marginBottom: 12,
              }}
            />
            <Button
              text="Modify Booking"
              onPress={handleBack}
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
