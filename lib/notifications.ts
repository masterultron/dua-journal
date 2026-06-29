export function scheduleDailyNotifications() {
  if (!('serviceWorker' in navigator) || Notification.permission !== 'granted') return

  // Store schedule in localStorage; SW will use it
  localStorage.setItem('noor-schedule', JSON.stringify({
    morning: '05:30',
    evening: '19:00',
  }))
}

export async function sendTestNotification() {
  if (Notification.permission === 'granted') {
    const reg = await navigator.serviceWorker.ready
    reg.showNotification('Noor — Morning Adhkar', {
      body: 'Your morning adhkar are ready. Begin with Bismillah.',
      icon: '/icons/icon-192.png',
      badge: '/icons/icon-192.png',
      tag: 'morning-adhkar',
    })
  }
}
