
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
    arrivalDate: new Date(),
    arrivalTime: new Date(),
    departureDate: new Date(),
    departureTime: new Date(),
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
                boxShadow: 'none',
                elevation: 0,
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
            <Text style={[commonStyles.text, { fontWeight: '700', marginBottom: 16, fontSize: 18 }]}>
              Trip Type
            </Text>
            <View style={[commonStyles.row, { marginBottom: 16 }]}>
              <TouchableOpacity
                style={[
                  {
                    flex: 1,
                    padding: 16,
                    borderRadius: 12,
                    borderWidth: 2,
                    marginRight: 8,
                    alignItems: 'center',
                  },
                  flightData.tripType === 'one-way' 
                    ? { 
                        borderColor: colors.primary, 
                        backgroundColor: `${colors.primary}10`,
                        boxShadow: `0px 2px 8px ${colors.primary}30`,
                        elevation: 3
                      }
                    : { borderColor: colors.border, backgroundColor: colors.background }
                ]}
                onPress={() => handleInputChange('tripType', 'one-way')}
                activeOpacity={0.7}
              >
                <Icon 
                  name="arrow-forward" 
                  size={20} 
                  color={flightData.tripType === 'one-way' ? colors.primary : colors.textLight} 
                />
                <Text style={[
                  commonStyles.text,
                  { 
                    color: flightData.tripType === 'one-way' ? colors.primary : colors.textLight,
                    fontWeight: '600',
                    marginTop: 8
                  }
                ]}>
                  One Way
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  {
                    flex: 1,
                    padding: 16,
                    borderRadius: 12,
                    borderWidth: 2,
                    marginLeft: 8,
                    alignItems: 'center',
                  },
                  flightData.tripType === 'round-trip' 
                    ? { 
                        borderColor: colors.primary, 
                        backgroundColor: `${colors.primary}10`,
                        boxShadow: `0px 2px 8px ${colors.primary}30`,
                        elevation: 3
                      }
                    : { borderColor: colors.border, backgroundColor: colors.background }
                ]}
                onPress={() => handleInputChange('tripType', 'round-trip')}
                activeOpacity={0.7}
              >
                <Icon 
                  name="swap-horizontal" 
                  size={20} 
                  color={flightData.tripType === 'round-trip' ? colors.primary : colors.textLight} 
                />
                <Text style={[
                  commonStyles.text,
                  { 
                    color: flightData.tripType === 'round-trip' ? colors.primary : colors.textLight,
                    fontWeight: '600',
                    marginTop: 8
                  }
                ]}>
                  Round Trip
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Flight Details */}
          <View style={commonStyles.section}>
            <Text style={[commonStyles.text, { fontWeight: '700', marginBottom: 16, fontSize: 18 }]}>
              Flight Details
            </Text>
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
            <Text style={[commonStyles.text, { fontWeight: '700', marginBottom: 16, fontSize: 18 }]}>
              Schedule
            </Text>
            <View style={commonStyles.card}>
              <View style={[commonStyles.row, { marginBottom: 16, alignItems: 'center' }]}>
                <View style={{
                  backgroundColor: `${colors.primary}15`,
                  borderRadius: 10,
                  padding: 8,
                  marginRight: 12,
                }}>
                  <Icon name="airplane" size={18} color={colors.primary} />
                </View>
                <Text style={[commonStyles.text, { fontWeight: '600', fontSize: 16 }]}>
                  Arrival Details
                </Text>
              </View>
              
              <View style={[commonStyles.row, { marginBottom: 16 }]}>
                <View style={{ flex: 1, marginRight: 8 }}>
                  <Text style={commonStyles.inputLabel}>Date</Text>
                  <TouchableOpacity
                    style={[commonStyles.input, { 
                      justifyContent: 'center',
                      backgroundColor: colors.backgroundAlt,
                      borderColor: colors.primary
                    }]}
                    onPress={() => showDateTimePicker('arrivalDate', 'date')}
                    activeOpacity={0.7}
                  >
                    <View style={[commonStyles.row, { justifyContent: 'space-between' }]}>
                      <Text style={{ color: colors.text, fontWeight: '500' }}>
                        {formatDate(flightData.arrivalDate)}
                      </Text>
                      <Icon name="calendar" size={16} color={colors.primary} />
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={{ flex: 1, marginLeft: 8 }}>
                  <Text style={commonStyles.inputLabel}>Time</Text>
                  <TouchableOpacity
                    style={[commonStyles.input, { 
                      justifyContent: 'center',
                      backgroundColor: colors.backgroundAlt,
                      borderColor: colors.primary
                    }]}
                    onPress={() => showDateTimePicker('arrivalTime', 'time')}
                    activeOpacity={0.7}
                  >
                    <View style={[commonStyles.row, { justifyContent: 'space-between' }]}>
                      <Text style={{ color: colors.text, fontWeight: '500' }}>
                        {formatTime(flightData.arrivalTime)}
                      </Text>
                      <Icon name="time" size={16} color={colors.primary} />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

              {flightData.tripType === 'round-trip' && (
                <>
                  <View style={[commonStyles.row, { marginBottom: 16, alignItems: 'center' }]}>
                    <View style={{
                      backgroundColor: `${colors.secondary}15`,
                      borderRadius: 10,
                      padding: 8,
                      marginRight: 12,
                    }}>
                      <Icon name="airplane" size={18} color={colors.secondary} />
                    </View>
                    <Text style={[commonStyles.text, { fontWeight: '600', fontSize: 16 }]}>
                      Return Departure Details
                    </Text>
                  </View>
                  
                  <View style={commonStyles.row}>
                    <View style={{ flex: 1, marginRight: 8 }}>
                      <Text style={commonStyles.inputLabel}>Date</Text>
                      <TouchableOpacity
                        style={[commonStyles.input, { 
                          justifyContent: 'center',
                          backgroundColor: colors.backgroundAlt,
                          borderColor: colors.secondary
                        }]}
                        onPress={() => showDateTimePicker('departureDate', 'date')}
                        activeOpacity={0.7}
                      >
                        <View style={[commonStyles.row, { justifyContent: 'space-between' }]}>
                          <Text style={{ color: colors.text, fontWeight: '500' }}>
                            {formatDate(flightData.departureDate)}
                          </Text>
                          <Icon name="calendar" size={16} color={colors.secondary} />
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, marginLeft: 8 }}>
                      <Text style={commonStyles.inputLabel}>Time</Text>
                      <TouchableOpacity
                        style={[commonStyles.input, { 
                          justifyContent: 'center', 
                          marginBottom: 0,
                          backgroundColor: colors.backgroundAlt,
                          borderColor: colors.secondary
                        }]}
                        onPress={() => showDateTimePicker('departureTime', 'time')}
                        activeOpacity={0.7}
                      >
                        <View style={[commonStyles.row, { justifyContent: 'space-between' }]}>
                          <Text style={{ color: colors.text, fontWeight: '500' }}>
                            {formatTime(flightData.departureTime)}
                          </Text>
                          <Icon name="time" size={16} color={colors.secondary} />
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </>
              )}
            </View>
          </View>

          {/* Document Requirements Notice */}
          <View style={commonStyles.section}>
            <View style={[commonStyles.card, { 
              backgroundColor: `${colors.accent}08`,
              borderColor: `${colors.accent}20`,
              borderWidth: 1
            }]}>
              <View style={[commonStyles.row, { marginBottom: 12, alignItems: 'center' }]}>
                <View style={{
                  backgroundColor: colors.accent,
                  borderRadius: 10,
                  padding: 8,
                  marginRight: 12,
                }}>
                  <Icon name="information-circle" size={18} color="#FFFFFF" />
                </View>
                <Text style={[commonStyles.text, { fontWeight: '700', fontSize: 16 }]}>
                  Required Documents
                </Text>
              </View>
              <Text style={[commonStyles.textLight, { marginBottom: 8 }]}>
                To complete your shuttle booking, you&apos;ll need to upload:
              </Text>
              <View style={[commonStyles.row, { marginBottom: 4, alignItems: 'center', justifyContent: 'flex-start' }]}>
                <Icon name="document-text" size={14} color={colors.success} />
                <Text style={[commonStyles.textLight, { marginLeft: 8 }]}>
                  Copy of passport
                </Text>
              </View>
              <View style={[commonStyles.row, { alignItems: 'center', justifyContent: 'flex-start' }]}>
                <Icon name="card" size={14} color={colors.success} />
                <Text style={[commonStyles.textLight, { marginLeft: 8 }]}>
                  Copy of credit card details
                </Text>
              </View>
            </View>
          </View>

          {/* Action Button */}
          <View style={commonStyles.section}>
            <Button
              text="Continue to Passengers"
              onPress={handleContinue}
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
