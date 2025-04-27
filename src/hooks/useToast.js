import { useState, useCallback } from 'react';

/**
 * Toast notification hook
 * @returns {Object} Toast state and functions
 */
const useToast = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState('');
  const [notificationType, setNotificationType] = useState('info');
  
  /**
   * Show a toast notification
   * @param {string} message - Notification message
   * @param {string} type - Notification type (info, success, warning, error)
   * @param {number} duration - Duration in ms (default: 3000)
   */
  const showToast = useCallback((message, type = 'info', duration = 3000) => {
    setNotificationMsg(message);
    setNotificationType(type);
    setShowNotification(true);
    
    // Auto-hide after duration
    setTimeout(() => {
      setShowNotification(false);
    }, duration);
  }, []);
  
  /**
   * Hide the toast notification
   */
  const hideToast = useCallback(() => {
    setShowNotification(false);
  }, []);
  
  return {
    showNotification,
    notificationMsg,
    notificationType,
    showToast,
    hideToast
  };
};

export default useToast;