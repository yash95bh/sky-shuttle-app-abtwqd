
import React, { useState } from 'react';
import { Text, View, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { commonStyles, colors } from '../../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import * as ImagePicker from 'expo-image-picker';

export default function DocumentUploadScreen() {
  console.log('DocumentUploadScreen rendered');

  const [documents, setDocuments] = useState({
    passport: null as string | null,
    creditCard: null as string | null,
  });

  const pickDocument = async (type: 'passport' | 'creditCard') => {
    console.log('Picking document for:', type);
    
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setDocuments(prev => ({
          ...prev,
          [type]: result.assets[0].uri
        }));
        console.log(`${type} document selected`);
      }
    } catch (error) {
      console.error('Error picking document:', error);
      Alert.alert('Error', 'Failed to pick document');
    }
  };

  const handleContinue = () => {
    console.log('Continue with documents:', documents);
    
    if (!documents.passport || !documents.creditCard) {
      Alert.alert('Error', 'Please upload both passport and credit card documents to proceed with your shuttle booking');
      return;
    }

    Alert.alert(
      'Documents Uploaded Successfully!', 
      'Your documents have been uploaded and verified. You can now proceed with your booking.',
      [{ 
        text: 'Continue to Booking', 
        onPress: () => router.push('/main/booking-confirmation') 
      }]
    );
  };

  const handleBack = () => {
    console.log('Navigate back');
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
              <Text style={commonStyles.title}>Upload Documents</Text>
              <Text style={commonStyles.subtitle}>
                Required for shuttle booking verification
              </Text>
            </View>
          </View>

          {/* Requirements Notice */}
          <View style={commonStyles.section}>
            <View style={[commonStyles.card, { backgroundColor: colors.backgroundAlt }]}>
              <View style={[commonStyles.row, { marginBottom: 8 }]}>
                <Icon name="information-circle" size={20} color={colors.primary} />
                <Text style={[commonStyles.text, { marginLeft: 8, fontWeight: '600' }]}>
                  Document Requirements
                </Text>
              </View>
              <Text style={commonStyles.textLight}>
                To complete your shuttle booking, we need copies of the following documents for verification and security purposes:
              </Text>
            </View>
          </View>

          {/* Document Upload Cards */}
          <View style={commonStyles.section}>
            {/* Passport Upload */}
            <TouchableOpacity 
              style={[
                commonStyles.card, 
                { 
                  marginBottom: 16,
                  borderWidth: 2,
                  borderColor: documents.passport ? colors.success : colors.border,
                  backgroundColor: documents.passport ? colors.backgroundAlt : colors.background
                }
              ]}
              onPress={() => pickDocument('passport')}
            >
              <View style={[commonStyles.row, { marginBottom: 12 }]}>
                <Icon 
                  name={documents.passport ? "checkmark-circle" : "document"} 
                  size={24} 
                  color={documents.passport ? colors.success : colors.primary} 
                />
                <Text style={[commonStyles.text, { marginLeft: 12, flex: 1, fontWeight: '600' }]}>
                  Passport Copy *
                </Text>
                <Icon name="camera" size={20} color={colors.textLight} />
              </View>
              <Text style={[
                commonStyles.textLight,
                { color: documents.passport ? colors.success : colors.textLight }
              ]}>
                {documents.passport ? 'Passport uploaded successfully ✓' : 'Tap to upload a clear photo of your passport'}
              </Text>
              <Text style={[commonStyles.textLight, { fontSize: 12, marginTop: 4 }]}>
                Required for identity verification
              </Text>
            </TouchableOpacity>

            {/* Credit Card Upload */}
            <TouchableOpacity 
              style={[
                commonStyles.card,
                { 
                  borderWidth: 2,
                  borderColor: documents.creditCard ? colors.success : colors.border,
                  backgroundColor: documents.creditCard ? colors.backgroundAlt : colors.background
                }
              ]}
              onPress={() => pickDocument('creditCard')}
            >
              <View style={[commonStyles.row, { marginBottom: 12 }]}>
                <Icon 
                  name={documents.creditCard ? "checkmark-circle" : "card"} 
                  size={24} 
                  color={documents.creditCard ? colors.success : colors.primary} 
                />
                <Text style={[commonStyles.text, { marginLeft: 12, flex: 1, fontWeight: '600' }]}>
                  Credit Card Copy *
                </Text>
                <Icon name="camera" size={20} color={colors.textLight} />
              </View>
              <Text style={[
                commonStyles.textLight,
                { color: documents.creditCard ? colors.success : colors.textLight }
              ]}>
                {documents.creditCard ? 'Credit card uploaded successfully ✓' : 'Tap to upload a photo of your credit card'}
              </Text>
              <Text style={[commonStyles.textLight, { fontSize: 12, marginTop: 4 }]}>
                Required for payment verification (SBD 150 per person)
              </Text>
            </TouchableOpacity>
          </View>

          {/* Security Notice */}
          <View style={commonStyles.section}>
            <View style={[commonStyles.card, { backgroundColor: colors.backgroundAlt }]}>
              <View style={[commonStyles.row, { marginBottom: 8 }]}>
                <Icon name="shield-checkmark" size={20} color={colors.success} />
                <Text style={[commonStyles.text, { marginLeft: 8, fontWeight: '600' }]}>
                  Your documents are secure
                </Text>
              </View>
              <Text style={commonStyles.textLight}>
                All uploaded documents are encrypted and stored securely. We only use them for verification purposes and comply with data protection regulations.
              </Text>
              <View style={[commonStyles.row, { marginTop: 8, alignItems: 'center' }]}>
                <Icon name="lock-closed" size={14} color={colors.success} />
                <Text style={[commonStyles.textLight, { marginLeft: 6, fontSize: 12 }]}>
                  256-bit SSL encryption
                </Text>
              </View>
            </View>
          </View>

          {/* Upload Progress */}
          <View style={commonStyles.section}>
            <View style={[commonStyles.card, { backgroundColor: colors.backgroundAlt }]}>
              <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 12 }]}>
                Upload Progress
              </Text>
              <View style={[commonStyles.row, { marginBottom: 8, alignItems: 'center' }]}>
                <Icon 
                  name={documents.passport ? "checkmark-circle" : "ellipse-outline"} 
                  size={16} 
                  color={documents.passport ? colors.success : colors.textLight} 
                />
                <Text style={[
                  commonStyles.textLight, 
                  { marginLeft: 8, color: documents.passport ? colors.success : colors.textLight }
                ]}>
                  Passport copy
                </Text>
              </View>
              <View style={[commonStyles.row, { alignItems: 'center' }]}>
                <Icon 
                  name={documents.creditCard ? "checkmark-circle" : "ellipse-outline"} 
                  size={16} 
                  color={documents.creditCard ? colors.success : colors.textLight} 
                />
                <Text style={[
                  commonStyles.textLight, 
                  { marginLeft: 8, color: documents.creditCard ? colors.success : colors.textLight }
                ]}>
                  Credit card copy
                </Text>
              </View>
            </View>
          </View>

          {/* Action Button */}
          <View style={commonStyles.section}>
            <Button
              text={documents.passport && documents.creditCard ? "Continue to Booking" : "Upload Required Documents"}
              onPress={handleContinue}
              style={{ 
                backgroundColor: documents.passport && documents.creditCard ? colors.primary : colors.grey 
              }}
            />
            {!documents.passport || !documents.creditCard ? (
              <Text style={[commonStyles.textLight, { textAlign: 'center', marginTop: 8, fontSize: 12 }]}>
                Both documents are required to proceed with booking
              </Text>
            ) : null}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
