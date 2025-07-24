import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import EventList from './EventList';
import AddEvent from './AddEvent';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="EventList" component={EventList} options={{ title: 'Events' }} />
        <Stack.Screen name="AddEvent" component={AddEvent} options={{ title: 'Add Event' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
