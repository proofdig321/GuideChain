/**
 * Notification Center Component
 * Real-time notifications with pagination
 */

"use client";

import React, { useState } from "react";
import { useNotifications } from "@/hooks/useNotifications";
import { Pagination } from "@/components/ui/Pagination";
import { usePagination } from "@/hooks/usePagination";
import { EmptyState } from "@/components/ui/EmptyState";

export function NotificationCenter(): React.JSX.Element {
  const {
    notifications,
    unreadCount,
    loading,
    error,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  } = useNotifications();

  const [filter, setFilter] = useState<"all" | "unread" | "booking" | "payment" | "review">("all");

  const filteredNotifications = notifications.filter(notification => {
    if (filter === "all") return true;
    if (filter === "unread") return !notification.read;
    return notification.type === filter;
  });

  const {
    currentPage,
    totalPages,
    totalItems,
    currentData,
    goToPage,
  } = usePagination({
    data: filteredNotifications,
    itemsPerPage: 10,
  });

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "booking": return "📅";
      case "payment": return "💰";
      case "review": return "⭐";
      case "system": return "🔧";
      case "verification": return "✅";
      default: return "📢";
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "booking": return "bg-blue-100 text-blue-800";
      case "payment": return "bg-green-100 text-green-800";
      case "review": return "bg-yellow-100 text-yellow-800";
      case "system": return "bg-gray-100 text-gray-800";
      case "verification": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${Math.floor(diffInHours)}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(8px)',
        borderRadius: '24px',
        padding: '24px',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{
            height: '24px',
            background: '#e5e7eb',
            borderRadius: '4px',
            width: '192px',
            animation: 'pulse 2s infinite'
          }}></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[...Array(5)].map((_, i) => (
              <div key={i} style={{
                height: '64px',
                background: '#e5e7eb',
                borderRadius: '8px',
                animation: 'pulse 2s infinite'
              }}></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        background: '#fef2f2',
        border: '1px solid #fecaca',
        borderRadius: '24px',
        padding: '24px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            background: '#ef4444',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg style={{ width: '16px', height: '16px', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <div>
            <h3 style={{
              fontWeight: '600',
              color: '#991b1b'
            }}>Failed to Load Notifications</h3>
            <p style={{
              color: '#dc2626',
              fontSize: '14px'
            }}>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(8px)',
      borderRadius: '24px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden'
    }}>
      <div style={{
        padding: '24px',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '16px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <h2 style={{
              fontSize: 'clamp(18px, 4vw, 24px)',
              fontWeight: '700',
              color: '#1f2937'
            }}>Notifications</h2>
            {unreadCount > 0 && (
              <span style={{
                background: '#ef4444',
                color: 'white',
                padding: '4px 8px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '500'
              }}>
                {unreadCount}
              </span>
            )}
          </div>
          
          <div style={{
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
            width: '100%'
          }}>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as typeof filter)}
              style={{
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '12px',
                fontSize: '14px',
                background: 'white',
                outline: 'none',
                minWidth: '150px',
                flex: '1'
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.currentTarget.style.borderColor = '#d1d5db'}
            >
              <option value="all">All Notifications</option>
              <option value="unread">Unread</option>
              <option value="booking">Bookings</option>
              <option value="payment">Payments</option>
              <option value="review">Reviews</option>
            </select>
            
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                style={{
                  padding: '8px 12px',
                  background: '#2563eb',
                  color: 'white',
                  borderRadius: '12px',
                  fontSize: '14px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                  whiteSpace: 'nowrap'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#1d4ed8'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#2563eb'}
              >
                Mark All Read
              </button>
            )}
          </div>
        </div>
      </div>

      <div style={{
        maxHeight: '384px',
        overflowY: 'auto'
      }}>
        {currentData.length === 0 ? (
          <div style={{ padding: '32px' }}>
            <EmptyState
              icon="📭"
              title="No Notifications"
              description="You're all caught up! Notifications will appear here when there's activity on your account."
              size="sm"
            />
          </div>
        ) : (
          <div>
            {currentData.map((notification, index) => (
              <div
                key={notification.id}
                style={{
                  padding: '16px',
                  borderBottom: index < currentData.length - 1 ? '1px solid #e5e7eb' : 'none',
                  background: !notification.read ? 'rgba(239, 246, 255, 0.5)' : 'transparent',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => {
                  if (notification.read) {
                    e.currentTarget.style.backgroundColor = '#f9fafb';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = !notification.read ? 'rgba(239, 246, 255, 0.5)' : 'transparent';
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px'
                }}>
                  <div style={{ flexShrink: 0 }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '14px',
                      ...(notification.type === 'booking' ? { background: '#dbeafe', color: '#1e40af' } :
                         notification.type === 'payment' ? { background: '#dcfce7', color: '#166534' } :
                         notification.type === 'review' ? { background: '#fef3c7', color: '#a16207' } :
                         notification.type === 'system' ? { background: '#f3f4f6', color: '#374151' } :
                         notification.type === 'verification' ? { background: '#f3e8ff', color: '#7c3aed' } :
                         { background: '#f3f4f6', color: '#374151' })
                    }}>
                      {getNotificationIcon(notification.type)}
                    </div>
                  </div>
                  
                  <div style={{
                    flex: 1,
                    minWidth: 0
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between'
                    }}>
                      <div style={{ flex: 1 }}>
                        <h4 style={{
                          fontSize: '14px',
                          fontWeight: '500',
                          color: !notification.read ? '#1f2937' : '#374151'
                        }}>
                          {notification.title}
                        </h4>
                        <p style={{
                          fontSize: '14px',
                          color: '#6b7280',
                          marginTop: '4px'
                        }}>
                          {notification.message}
                        </p>
                        <p style={{
                          fontSize: '12px',
                          color: '#9ca3af',
                          marginTop: '8px'
                        }}>
                          {formatTime(notification.createdAt)}
                        </p>
                      </div>
                      
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginLeft: '16px'
                      }}>
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            style={{
                              color: '#2563eb',
                              fontSize: '12px',
                              fontWeight: '500',
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.color = '#1d4ed8'}
                            onMouseLeave={(e) => e.currentTarget.style.color = '#2563eb'}
                          >
                            Mark Read
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          style={{
                            color: '#9ca3af',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'color 0.2s'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.color = '#ef4444'}
                          onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
                        >
                          <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div style={{
          padding: '16px 24px',
          borderTop: '1px solid #e5e7eb'
        }}>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
            totalItems={totalItems}
            itemsPerPage={10}
            showInfo={false}
          />
        </div>
      )}
    </div>
  );
}