import * as Notifications from 'expo-notifications';
import dayjs from 'dayjs';

export const scheduleNotification = async (event) => {
  const trigger = dayjs(event.date).subtract(10, 'day').toDate();

  const notificationId = await Notifications.scheduleNotificationAsync({
    content: {
      title: `Upcoming Event: ${event.name}`,
      body: `Only 10 days left. Don’t forget to celebrate!`,
    },
    trigger,
  });

  return notificationId;
};

export const requestPermissions = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
        alert('You need to enable notifications in your settings.');
        return false;
    }
    return true;
}
