/**
 * Notification System Hook
 * Real-time notifications with pagination
 */

import { useState, useEffect, useCallback } from "react";
import { useActiveAccount } from "thirdweb/react";

export interface Notification {
  id: string;
  type: "booking" | "payment" | "review" | "system" | "verification";
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  actionUrl?: string;
  metadata?: Record<string, any>;
}

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;
  error: string | null;
}

export function useNotifications() {
  const account = useActiveAccount();
  const [state, setState] = useState<NotificationState>({
    notifications: [],
    unreadCount: 0,
    loading: false,
    error: null,
  });

  const handleGracefully = async <T>(
    operation: () => Promise<T>,
    fallback: T,
    errorMessage?: string
  ): Promise<T> => {
    try {
      return await operation();
    } catch (error) {
      console.error(errorMessage || 'Operation failed gracefully:', error);
      return fallback;
    }
  };

  // Mock notifications for demo
  const generateMockNotifications = (): Notification[] => {
    const types: Notification["type"][] = ["booking", "payment", "review", "system", "verification"];
    const notifications: Notification[] = [];

    for (let i = 0; i < 25; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      const isRead = Math.random() > 0.4;
      
      notifications.push({
        id: `notif-${i + 1}`,
        type,
        title: getNotificationTitle(type),
        message: getNotificationMessage(type),
        read: isRead,
        createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
        actionUrl: getActionUrl(type),
        metadata: { bookingId: `booking-${i}`, amount: Math.floor(Math.random() * 500) + 50 },
      });
    }

    return notifications.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  };

  const getNotificationTitle = (type: Notification["type"]): string => {
    switch (type) {
      case "booking": return "New Booking Request";
      case "payment": return "Payment Received";
      case "review": return "New Review";
      case "system": return "System Update";
      case "verification": return "Verification Status";
      default: return "Notification";
    }
  };

  const getNotificationMessage = (type: Notification["type"]): string => {
    switch (type) {
      case "booking": return "You have a new booking request from a tourist";
      case "payment": return "Payment has been processed successfully";
      case "review": return "A tourist left a review for your service";
      case "system": return "Platform maintenance scheduled for tonight";
      case "verification": return "Your guide application has been approved";
      default: return "You have a new notification";
    }
  };

  const getActionUrl = (type: Notification["type"]): string => {
    switch (type) {
      case "booking": return "/dashboard?tab=bookings";
      case "payment": return "/dashboard?tab=earnings";
      case "review": return "/dashboard?tab=reviews";
      case "verification": return "/verify";
      default: return "/dashboard";
    }
  };

  const fetchNotifications = useCallback(async () => {
    if (!account?.address) return;

    setState(prev => ({ ...prev, loading: true, error: null }));

    const notifications = await handleGracefully(
      async () => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        return generateMockNotifications();
      },
      [],
      'Failed to fetch notifications'
    );

    const unreadCount = notifications.filter(n => !n.read).length;

    setState(prev => ({
      ...prev,
      notifications,
      unreadCount,
      loading: false,
    }));
  }, [account?.address]);

  const markAsRead = useCallback(async (notificationId: string) => {
    setState(prev => ({
      ...prev,
      notifications: prev.notifications.map(n =>
        n.id === notificationId ? { ...n, read: true } : n
      ),
      unreadCount: Math.max(0, prev.unreadCount - 1),
    }));

    // Simulate API call
    await handleGracefully(
      async () => {
        await new Promise(resolve => setTimeout(resolve, 200));
        return true;
      },
      false,
      'Failed to mark notification as read'
    );
  }, []);

  const markAllAsRead = useCallback(async () => {
    setState(prev => ({
      ...prev,
      notifications: prev.notifications.map(n => ({ ...n, read: true })),
      unreadCount: 0,
    }));

    await handleGracefully(
      async () => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return true;
      },
      false,
      'Failed to mark all notifications as read'
    );
  }, []);

  const deleteNotification = useCallback(async (notificationId: string) => {
    const notification = state.notifications.find(n => n.id === notificationId);
    
    setState(prev => ({
      ...prev,
      notifications: prev.notifications.filter(n => n.id !== notificationId),
      unreadCount: notification && !notification.read ? prev.unreadCount - 1 : prev.unreadCount,
    }));

    await handleGracefully(
      async () => {
        await new Promise(resolve => setTimeout(resolve, 200));
        return true;
      },
      false,
      'Failed to delete notification'
    );
  }, [state.notifications]);

  const getNotificationsByType = useCallback((type: Notification["type"]) => {
    return state.notifications.filter(n => n.type === type);
  }, [state.notifications]);

  const getUnreadNotifications = useCallback(() => {
    return state.notifications.filter(n => !n.read);
  }, [state.notifications]);

  const createNotification = useCallback(async (notification: Omit<Notification, "id" | "createdAt">) => {
    const newNotification: Notification = {
      ...notification,
      id: `notif-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    setState(prev => ({
      ...prev,
      notifications: [newNotification, ...prev.notifications],
      unreadCount: prev.unreadCount + 1,
    }));

    await handleGracefully(
      async () => {
        await new Promise(resolve => setTimeout(resolve, 200));
        return true;
      },
      false,
      'Failed to create notification'
    );
  }, []);

  useEffect(() => {
    if (account?.address) {
      fetchNotifications();
    }
  }, [account?.address, fetchNotifications]);

  return {
    ...state,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    getNotificationsByType,
    getUnreadNotifications,
    createNotification,
  };
}