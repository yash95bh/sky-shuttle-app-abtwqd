
import React, { useState } from 'react';
import { Text, View, ScrollView, TextInput, Alert } from 'react-native';
import { commonStyles, colors } from '../../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity } from 'react-native';

export default function FlightInfoScreen() {
  console.log('FlightInfoScreen rendered');

  const [flightData, setFlightData] = useState({
    flightNumber: '',
    airline: '',
    departureDate: new Date(),
    departureTime: new Date(),
    arrivalDate: new Date(),
    arrivalTime: new Date(),
    departureAirport: '',
    arrivalAirport: '',
    tripType: 'one-way', // 'one-way' or 'round-trip'
  });

  const [showDatePicker, setShowDatePicker] = useState<{
    show: boolean;
    mode: 'date' | 'time';
    field: string;
  }>({ show: false, mode: 'date', field: '' });

  const handleInputChange = (field: string, value: string) => {
    setFlightData(prev => ({ ...prev, [field]: value }));
  };

  const handleDateTimeChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker({ show: false, mode: 'date', field: '' });
    if (selectedDate) {
      setFlightData(prev => ({ ...prev, [showDatePicker.field]: selectedDate }));
    }
  };

  const showDateTimePicker = (field: string, mode: 'date' | 'time') => {
    setShowDatePicker({ show: true, mode, field });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString();
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleContinue = () => {
    console.log('Continue with flight data:', flightData);
    
    if (!flightData.flightNumber || !flightData.airline || 
        !flightData.departureAirport || !flightData.arrivalAirport) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    router.push('/main/passengers');
  };

  const handleBack = () => {
    console.log('Navigate back to home');
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
              <Text style={commonStyles.title}>Flight Information</Text>
              <Text style={commonStyles.subtitle}>
                Enter your flight details
              </Text>
            </View>
          </View>

          {/* Trip Type Selection */}
          <View style={commonStyles.section}>
            <Text style={commonStyles.inputLabel}>Trip Type</Text>
            <View style={[commonStyles.row, { marginBottom: 16 }]}>
              <TouchableOpacity
                style={[
                  {
                    flex: 1,
                    padding: 12,
                    borderRadius: 8,
                    borderWidth: 2,
                    marginRight: 8,
                    alignItems: 'center',
                  },
                  flightData.tripType === 'one-way' 
                    ? { borderColor: colors.primary, backgroundColor: colors.backgroundAlt }
                    : { borderColor: colors.border, backgroundColor: colors.background }
                ]}
                onPress={() => handleInputChange('tripType', 'one-way')}
              >
                <Text style={[
                  commonStyles.text,
                  { color: flightData.tripType === 'one-way' ? colors.primary : colors.textLight }
                ]}>
                  One Way
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  {
                    flex: 1,
                    padding: 12,
                    borderRadius: 8,
                    borderWidth: 2,
                    marginLeft: 8,
                    alignItems: 'center',
                  },
                  flightData.tripType === 'round-trip' 
                    ? { borderColor: colors.primary, backgroundColor: colors.backgroundAlt }
                    : { borderColor: colors.border, backgroundColor: colors.background }
                ]}
                onPress={() => handleInputChange('tripType', 'round-trip')}
              >
                <Text style={[
                  commonStyles.text,
                  { color: flightData.tripType === 'round-trip' ? colors.primary : colors.textLight }
                ]}>
                  Round Trip
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Flight Details */}
          <View style={commonStyles.section}>
            <View style={commonStyles.card}>
              <Text style={commonStyles.inputLabel}>Flight Number *</Text>
              <TextInput
                style={commonStyles.input}
                value={flightData.flightNumber}
                onChangeText={(value) => handleInputChange('flightNumber', value)}
                placeholder="e.g., AA123"
                placeholderTextColor={colors.textLight}
                autoCapitalize="characters"
              />

              <Text style={commonStyles.inputLabel}>Airline *</Text>
              <TextInput
                style={commonStyles.input}
                value={flightData.airline}
                onChangeText={(value) => handleInputChange('airline', value)}
                placeholder="e.g., American Airlines"
                placeholderTextColor={colors.textLight}
              />

              <Text style={commonStyles.inputLabel}>Departure Airport *</Text>
              <TextInput
                style={commonStyles.input}
                value={flightData.departureAirport}
                onChangeText={(value) => handleInputChange('departureAirport', value)}
                placeholder="e.g., JFK - New York"
                placeholderTextColor={colors.textLight}
              />

              <Text style={commonStyles.inputLabel}>Arrival Airport *</Text>
              <TextInput
                style={[commonStyles.input, { marginBottom: 0 }]}
                value={flightData.arrivalAirport}
                onChangeText={(value) => handleInputChange('arrivalAirport', value)}
                placeholder="e.g., HIR - Honiara"
                placeholderTextColor={colors.textLight}
              />
            </View>
          </View>

          {/* Date and Time */}
          <View style={commonStyles.section}>
            <View style={commonStyles.card}>
              <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 16 }]}>
                Departure Details
              </Text>
              
              <View style={[commonStyles.row, { marginBottom: 16 }]}>
                <View style={{ flex: 1, marginRight: 8 }}>
                  <Text style={commonStyles.inputLabel}>Date</Text>
                  <TouchableOpacity
                    style={[commonStyles.input, { justifyContent: 'center' }]}
                    onPress={() => showDateTimePicker('departureDate', 'date')}
                  >
                    <Text style={{ color: colors.text }}>
                      {formatDate(flightData.departureDate)}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{ flex: 1, marginLeft: 8 }}>
                  <Text style={commonStyles.inputLabel}>Time</Text>
                  <TouchableOpacity
                    style={[commonStyles.input, { justifyContent: 'center' }]}
                    onPress={() => showDateTimePicker('departureTime', 'time')}
                  >
                    <Text style={{ color: colors.text }}>
                      {formatTime(flightData.departureTime)}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {flightData.tripType === 'round-trip' && (
                <>
                  <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 16 }]}>
                    Return Details
                  </Text>
                  
                  <View style={commonStyles.row}>
                    <View style={{ flex: 1, marginRight: 8 }}>
                      <Text style={commonStyles.inputLabel}>Date</Text>
                      <TouchableOpacity
                        style={[commonStyles.input, { justifyContent: 'center' }]}
                        onPress={() => showDateTimePicker('arrivalDate', 'date')}
                      >
                        <Text style={{ color: colors.text }}>
                          {formatDate(flightData.arrivalDate)}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, marginLeft: 8 }}>
                      <Text style={commonStyles.inputLabel}>Time</Text>
                      <TouchableOpacity
                        style={[commonStyles.input, { justifyContent: 'center', marginBottom: 0 }]}
                        onPress={() => showDateTimePicker('arrivalTime', 'time')}
                      >
                        <Text style={{ color: colors.text }}>
                          {formatTime(flightData.arrivalTime)}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </>
              )}
            </View>
          </View>

          {/* Action Button */}
          <View style={commonStyles.section}>
            <Button
              text="Continue to Passengers"
              onPress={handleContinue}
              style={{ backgroundColor: colors.primary }}
            />
          </View>

          {/* Date/Time Picker */}
          {showDatePicker.show && (
            <DateTimePicker
              value={flightData[showDatePicker.field as keyof typeof flightData] as Date}
              mode={showDatePicker.mode}
              display="default"
              onChange={handleDateTimeChange}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
