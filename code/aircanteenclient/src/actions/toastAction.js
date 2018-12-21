export const newToastNotification = payload => (
  {
    type: 'SHOW_TOAST_NOTIFICATION',
    payload
  }
)

export const resetNotifications = () => (
  {
    type: 'RESET_NOTIFICATION'
  }
)