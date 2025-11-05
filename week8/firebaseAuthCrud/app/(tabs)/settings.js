// app/(tabs)/settings.js

import React from 'react';
import { View, Text, Button } from 'react-native';
import { useAuth } from '../../src/auth/AuthContext';
export default function Settings(){
  const { user, signOut } = useAuth();
  return (
    <View style={{ flex:1, padding:16, paddingTop:80 }}>
      <Text style={{ fontSize:22, fontWeight:'700', marginBottom:8 }}>Settings</Text>
      <Text style={{ marginBottom:12 }}>Signed in as {user?.email}</Text>
      <Button title="Sign Out" onPress={signOut} />
    </View>
  );
}