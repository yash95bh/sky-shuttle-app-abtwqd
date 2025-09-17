
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
      Alert.alert('Error', 'Please upload both passport and credit card documents');
      return;
    }

    Alert.alert(
      'Account Created!', 
      'Your account has been created successfully. You can now start booking your shuttle rides.',
      [{ text: 'OK', onPress: () => router.push('/main/home') }]
    );
  };

  const handleBack = () => {
    console.log('Navigate back to signup');
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
                We need to verify your identity
              </Text>
            </View>
          </View>

          {/* Document Upload Cards */}
          <View style={commonStyles.section}>
            {/* Passport Upload */}
            <TouchableOpacity 
              style={[commonStyles.card, { marginBottom: 16 }]}
              onPress={() => pickDocument('passport')}
            >
              <View style={[commonStyles.row, { marginBottom: 12 }]}>
                <Icon 
                  name={documents.passport ? "checkmark-circle" : "document"} 
                  size={24} 
                  color={documents.passport ? colors.success : colors.primary} 
                />
                <Text style={[commonStyles.text, { marginLeft: 12, flex: 1, fontWeight: '600' }]}>
                  Passport Copy
                </Text>
                <Icon name="camera" size={20} color={colors.textLight} />
              </View>
              <Text style={commonStyles.textLight}>
                {documents.passport ? 'Document uploaded successfully' : 'Tap to upload your passport'}
              </Text>
            </TouchableOpacity>

            {/* Credit Card Upload */}
            <TouchableOpacity 
              style={commonStyles.card}
              onPress={() => pickDocument('creditCard')}
            >
              <View style={[commonStyles.row, { marginBottom: 12 }]}>
                <Icon 
                  name={documents.creditCard ? "checkmark-circle" : "card"} 
                  size={24} 
                  color={documents.creditCard ? colors.success : colors.primary} 
                />
                <Text style={[commonStyles.text, { marginLeft: 12, flex: 1, fontWeight: '600' }]}>
                  Credit Card Copy
                </Text>
                <Icon name="camera" size={20} color={colors.textLight} />
              </View>
              <Text style={commonStyles.textLight}>
                {documents.creditCard ? 'Document uploaded successfully' : 'Tap to upload your credit card'}
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
                All uploaded documents are encrypted and stored securely. We only use them for verification purposes.
              </Text>
            </View>
          </View>

          {/* Action Button */}
          <View style={commonStyles.section}>
            <Button
              text="Complete Registration"
              onPress={handleContinue}
              style={{ 
                backgroundColor: documents.passport && documents.creditCard ? colors.primary : colors.grey 
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
