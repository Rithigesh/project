import React from 'react';
import { Settings, User, Bell, Shield, HelpCircle, LogOut } from 'lucide-react';

function MorePage() {
  const menuItems = [
    { icon: User, label: 'Profile Settings', description: 'Manage your personal information' },
    { icon: Bell, label: 'Notifications', description: 'Configure your notification preferences' },
    { icon: Settings, label: 'App Settings', description: 'Customize your app experience' },
    { icon: Shield, label: 'Privacy & Security', description: 'Manage your security settings' },
    { icon: HelpCircle, label: 'Help & Support', description: 'Get help with using the app' },
    { icon: LogOut, label: 'Sign Out', description: 'Sign out of your account' },
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">Settings & More</h2>

      <div className="glass-card rounded-xl divide-y divide-gray-200">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              className="w-full px-6 py-4 flex items-center space-x-4 hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex-shrink-0">
                <Icon className="h-6 w-6 text-gray-500" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-base font-medium text-gray-900">{item.label}</h3>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="text-center text-sm text-gray-500">
        <p>Version 1.0.0</p>
        <p className="mt-1">© 2024 Personal Expense Manager. All rights reserved.</p>
      </div>
    </div>
  );
}

export default MorePage;