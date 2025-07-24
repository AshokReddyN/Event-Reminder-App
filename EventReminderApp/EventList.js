import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import dayjs from 'dayjs';

const EventList = ({ navigation }) => {
  const [events, setEvents] = React.useState([]);
  const isFocused = useIsFocused();

  const getEvents = async () => {
    const eventsJson = await AsyncStorage.getItem('events');
    if (eventsJson) {
      const parsedEvents = JSON.parse(eventsJson);
      const sortedEvents = parsedEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
      setEvents(sortedEvents);
    }
  };

  React.useEffect(() => {
    if (isFocused) {
      getEvents();
    }
  }, [isFocused]);

  const renderItem = ({ item }) => {
    const daysToGo = dayjs(item.date).diff(dayjs(), 'day');
    return (
      <View style={styles.tile}>
        <Text style={styles.date}>{dayjs(item.date).format('MMM D, YYYY')}</Text>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.days}>{daysToGo} days to go</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {events.length === 0 ? (
        <Text style={styles.emptyText}>No events added yet</Text>
      ) : (
        <FlatList
          data={events}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      )}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddEvent')}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  tile: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  date: {
    fontSize: 16,
    color: '#888',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  days: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 18,
    color: '#888',
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#007bff',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default EventList;
