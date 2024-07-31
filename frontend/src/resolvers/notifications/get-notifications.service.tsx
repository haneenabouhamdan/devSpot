import { useQuery } from '@apollo/client';
import { NotificationStatus } from './enums';
import { FETCH_NOTIFICATIONS, NotificationDto } from './Queries';

interface NotificationsFilters {
  userId?: string;
  statuses?: NotificationStatus[];
}

export const useFetchNotifications = (filters: NotificationsFilters) => {
  const { data, loading, error, refetch } = useQuery<NotificationDto>(
    FETCH_NOTIFICATIONS,
    {
      variables: { filters },
    }
  );
  return {
    notifications: data?.notifications,
    loading,
    error,
    refetch,
  };
};
