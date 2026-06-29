'use client'
import { useState, useEffect } from 'react'
import { Bell, Moon, Sun, Smartphone } from 'lucide-react'

export function SettingsPage() {
  const [notifEnabled, setNotifEnabled] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  const requestNotifications = async () => {
    if ('Notification' in window) {
      const perm = await Notification.requestPermission()
      setNotifEnabled(perm === 'granted')
      if (perm === 'granted') {
        localStorage.setItem('noor-notifications', 'true')
      }
    }
  }

  useEffect(() => {
    setNotifEnabled(localStorage.getItem('noor-notifications') === 'true')
  }, [])

  return (
    <div className="px-5 py-6 max-w-md mx-auto">
      <div className="mb-6">
        <h2 className="text-noor-text font-semibold text-lg">Settings</h2>
        <p className="text-noor-muted text-sm">Personalize your Noor</p>
      </div>

      <div className="space-y-3">
        {/* Notifications */}
        <div className="bg-white rounded-2xl border border-noor-border p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-noor-lavender flex items-center justify-center">
              <Bell className="w-5 h-5 text-noor-purple" />
            </div>
            <div>
              <p className="text-noor-text font-medium text-sm">Reminders</p>
              <p className="text-noor-muted text-xs">Morning & evening adhkar notifications</p>
            </div>
          </div>
          <button
            onClick={requestNotifications}
            className={`w-full py-2.5 rounded-xl text-sm font-medium transition-colors ${
              notifEnabled
                ? 'bg-noor-lavender text-noor-purple'
                : 'bg-noor-gradient text-white'
            }`}
          >
            {notifEnabled ? 'Notifications Enabled' : 'Enable Notifications'}
          </button>
          {notifEnabled && (
            <div className="mt-3 space-y-1">
              <p className="text-noor-muted text-xs">Morning reminder: 5:30 AM</p>
              <p className="text-noor-muted text-xs">Evening reminder: 7:00 PM</p>
            </div>
          )}
        </div>

        {/* PWA install prompt */}
        <div className="bg-white rounded-2xl border border-noor-border p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-noor-lavender flex items-center justify-center">
              <Smartphone className="w-5 h-5 text-noor-purple" />
            </div>
            <div>
              <p className="text-noor-text font-medium text-sm">Install App</p>
              <p className="text-noor-muted text-xs">Add Noor to your home screen</p>
            </div>
          </div>
          <p className="text-noor-muted text-xs leading-relaxed">
            On Safari: tap the Share button, then "Add to Home Screen". On Chrome: tap the menu, then "Install app".
          </p>
        </div>

        {/* About */}
        <div className="bg-white rounded-2xl border border-noor-border p-5 text-center">
          <p
            className="text-3xl text-noor-purple mb-1"
            style={{ fontFamily: 'Amiri, serif' }}
          >
            النور
          </p>
          <p className="text-noor-muted text-xs">Version 1.0</p>
          <p className="text-noor-muted text-xs mt-1">Built with love by Abdul</p>
        </div>
      </div>
    </div>
  )
}
