import React from 'react';
import { CreditCard, Landmark, Wallet } from 'lucide-react';

function AccountsPage() {
  const accounts = [
    { type: 'Checking', balance: 5000, icon: Wallet, color: 'blue' },
    { type: 'Savings', balance: 15000, icon: Landmark, color: 'green' },
    { type: 'Credit Card', balance: -2000, icon: CreditCard, color: 'red' }
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">Your Accounts</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accounts.map((account) => {
          const Icon = account.icon;
          return (
            <div key={account.type} className="glass-card rounded-xl p-6">
              <div className="flex items-center space-x-4">
                <div className={`p-3 bg-${account.color}-100 rounded-lg`}>
                  <Icon className={`h-6 w-6 text-${account.color}-600`} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{account.type}</h3>
                  <p className={`text-xl font-bold ${
                    account.balance >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    ${Math.abs(account.balance)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="glass-card rounded-xl p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Account Activity</h3>
        <div className="space-y-4">
          {/* Placeholder for account activity */}
          <p className="text-gray-500 text-center py-4">No recent activity to display</p>
        </div>
      </div>
    </div>
  );
}

export default AccountsPage;