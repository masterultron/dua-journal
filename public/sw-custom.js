// Custom service worker additions — merged by next-pwa
self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      for (const client of clientList) {
        if (client.url && 'focus' in client) return client.focus()
      }
      if (clients.openWindow) return clients.openWindow('/')
    })
  )
})

// Schedule notifications check every hour
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'noor-daily') {
    event.waitUntil(checkAndSendNotifications())
  }
})

async function checkAndSendNotifications() {
  const now = new Date()
  const hour = now.getHours()
  const minute = now.getMinutes()

  if (hour === 5 && minute < 10) {
    self.registration.showNotification('Noor — Morning Adhkar', {
      body: 'Begin your morning with the remembrance of Allah.',
      icon: '/icons/icon-192.png',
      tag: 'morning',
    })
  }
  if (hour === 19 && minute < 10) {
    self.registration.showNotification('Noor — Evening Adhkar', {
      body: 'Close your day with gratitude and remembrance.',
      icon: '/icons/icon-192.png',
      tag: 'evening',
    })
  }
}
