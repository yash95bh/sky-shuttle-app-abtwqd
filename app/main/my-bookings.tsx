
import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { commonStyles, colors } from '../../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Button from '../../components/Button';
import Icon from '../../components/Icon';

interface Booking {
  id: string;
  bookingId: string;
  flightNumber: string;
  airline: string;
  departureAirport: string;
  arrivalAirport: string;
  departureDate: string;
  departureTime: string;
  passengers: number;
  totalAmount: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: string;
}

export default function MyBookingsScreen() {
  console.log('MyBookingsScreen rendered');

  // Mock bookings data
  const [bookings] = useState<Booking[]>([
    {
      id: '1',
      bookingId: 'SH123456',
      flightNumber: 'AA123',
      airline: 'American Airlines',
      departureAirport: 'JFK - New York',
      arrivalAirport: 'HIR - Honiara',
      departureDate: '2024-02-15',
      departureTime: '14:30',
      passengers: 2,
      totalAmount: 300,
      status: 'confirmed',
      createdAt: '2024-01-15',
    },
    {
      id: '2',
      bookingId: 'SH789012',
      flightNumber: 'UA456',
      airline: 'United Airlines',
      departureAirport: 'LAX - Los Angeles',
      arrivalAirport: 'HIR - Honiara',
      departureDate: '2024-03-20',
      departureTime: '09:15',
      passengers: 1,
      totalAmount: 150,
      status: 'pending',
      createdAt: '2024-01-20',
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return colors.success;
      case 'pending':
        return colors.accent;
      case 'cancelled':
        return colors.error;
      default:
        return colors.textLight;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'checkmark-circle' as const;
      case 'pending':
        return 'time' as const;
      case 'cancelled':
        return 'close-circle' as const;
      default:
        return 'help-circle' as const;
    }
  };

  const handleDownloadPDF = (booking: Booking) => {
    console.log('Download PDF for booking:', booking.bookingId);
    Alert.alert(
      'Download PDF',
      `PDF for booking ${booking.bookingId} would be downloaded here. This feature requires backend integration.`
    );
  };

  const handleBookingDetails = (booking: Booking) => {
    console.log('View booking details:', booking.bookingId);
    Alert.alert(
      'Booking Details',
      `Detailed view for booking ${booking.bookingId} would be shown here.`
    );
  };

  const handleNewBooking = () => {
    console.log('Navigate to new booking');
    router.push('/main/flight-info');
  };

  const handleBackToHome = () => {
    console.log('Navigate back to home');
    router.push('/main/home');
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={commonStyles.content}>
          {/* Header */}
          <View style={[commonStyles.row, { marginTop: 20, marginBottom: 40 }]}>
            <Button
              text=""
              onPress={handleBackToHome}
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
              <Text style={commonStyles.title}>My Bookings</Text>
              <Text style={commonStyles.subtitle}>
                View and manage your shuttle bookings
              </Text>
            </View>
          </View>

          {/* Bookings List */}
          {bookings.length > 0 ? (
            <View style={commonStyles.section}>
              {bookings.map((booking) => (
                <TouchableOpacity
                  key={booking.id}
                  style={[commonStyles.card, { marginBottom: 16 }]}
                  onPress={() => handleBookingDetails(booking)}
                >
                  {/* Booking Header */}
                  <View style={[commonStyles.row, { marginBottom: 12 }]}>
                    <View style={{ flex: 1 }}>
                      <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                        {booking.bookingId}
                      </Text>
                      <Text style={commonStyles.textLight}>
                        {booking.flightNumber} - {booking.airline}
                      </Text>
                    </View>
                    <View style={[commonStyles.row, { alignItems: 'center' }]}>
                      <Icon 
                        name={getStatusIcon(booking.status)} 
                        size={16} 
                        color={getStatusColor(booking.status)} 
                      />
                      <Text style={[
                        commonStyles.textLight, 
                        { 
                          marginLeft: 4, 
                          color: getStatusColor(booking.status),
                          fontWeight: '600',
                          textTransform: 'capitalize'
                        }
                      ]}>
                        {booking.status}
                      </Text>
                    </View>
                  </View>

                  {/* Flight Details */}
                  <View style={[commonStyles.row, { marginBottom: 8 }]}>
                    <Icon name="airplane" size={16} color={colors.textLight} />
                    <Text style={[commonStyles.textLight, { marginLeft: 8, flex: 1 }]}>
                      {booking.departureAirport} → {booking.arrivalAirport}
                    </Text>
                  </View>

                  <View style={[commonStyles.row, { marginBottom: 8 }]}>
                    <Icon name="calendar" size={16} color={colors.textLight} />
                    <Text style={[commonStyles.textLight, { marginLeft: 8, flex: 1 }]}>
                      {booking.departureDate} at {booking.departureTime}
                    </Text>
                  </View>

                  <View style={[commonStyles.row, { marginBottom: 16 }]}>
                    <Icon name="people" size={16} color={colors.textLight} />
                    <Text style={[commonStyles.textLight, { marginLeft: 8, flex: 1 }]}>
                      {booking.passengers} passenger{booking.passengers > 1 ? 's' : ''}
                    </Text>
                    <Text style={[commonStyles.text, { fontWeight: '600', color: colors.primary }]}>
                      SBD {booking.totalAmount}
                    </Text>
                  </View>

                  {/* Action Buttons */}
                  {booking.status === 'confirmed' && (
                    <View style={[commonStyles.row, { paddingTop: 16, borderTopWidth: 1, borderTopColor: colors.border }]}>
                      <TouchableOpacity
                        style={[
                          {
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 8,
                            borderRadius: 6,
                            backgroundColor: colors.backgroundAlt,
                            marginRight: 8,
                          }
                        ]}
                        onPress={() => handleDownloadPDF(booking)}
                      >
                        <Icon name="download" size={16} color={colors.primary} />
                        <Text style={[commonStyles.textLight, { marginLeft: 4, fontSize: 12 }]}>
                          Download PDF
                        </Text>
                      </TouchableOpacity>
                      
                      <TouchableOpacity
                        style={[
                          {
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 8,
                            borderRadius: 6,
                            backgroundColor: colors.primary,
                            marginLeft: 8,
                          }
                        ]}
                        onPress={() => handleBookingDetails(booking)}
                      >
                        <Icon name="eye" size={16} color="#FFFFFF" />
                        <Text style={[commonStyles.textLight, { marginLeft: 4, fontSize: 12, color: '#FFFFFF' }]}>
                          View Details
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            /* Empty State */
            <View style={[commonStyles.section, commonStyles.centerContent, { marginTop: 60 }]}>
              <Icon name="calendar-outline" size={64} color={colors.textLight} />
              <Text style={[commonStyles.title, { marginTop: 24, marginBottom: 8 }]}>
                No Bookings Yet
              </Text>
              <Text style={[commonStyles.textLight, { textAlign: 'center', marginBottom: 32 }]}>
                You haven&apos;t made any shuttle bookings yet.{'\n'}
                Book your first ride to get started!
              </Text>
            </View>
          )}

          {/* Action Button */}
          <View style={commonStyles.section}>
            <Button
              text="Book New Shuttle"
              onPress={handleNewBooking}
              style={{ backgroundColor: colors.primary }}
            />
          </View>

          {/* Info Card */}
          <View style={commonStyles.section}>
            <View style={[commonStyles.card, { backgroundColor: colors.backgroundAlt }]}>
              <View style={[commonStyles.row, { marginBottom: 8 }]}>
                <Icon name="mail" size={20} color={colors.primary} />
                <Text style={[commonStyles.text, { marginLeft: 8, fontWeight: '600' }]}>
                  Email Notifications
                </Text>
              </View>
              <Text style={[commonStyles.textLight, { fontSize: 12 }]}>
                Pickup and drop-off schedules are automatically sent to all passengers via email for the next calendar date.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
