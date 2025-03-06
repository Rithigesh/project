import React, { useState } from 'react';
import { PlusCircle, Wallet, TrendingDown, Landmark, DollarSign, Upload } from 'lucide-react';
import { useTransactions } from '../context/TransactionContext';
import AddTransactionModal from '../components/AddTransactionModal';
import BankStatementModal from '../components/BankStatementModal';

function HomePage() {
  const { transactions } = useTransactions();
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [showBankStatementModal, setShowBankStatementModal] = useState(false);

  const totals = transactions.reduce(
    (acc, curr) => {
      if (curr.type === 'income') acc.income += curr.amount;
      if (curr.type === 'expense') acc.expenses += curr.amount;
      if (curr.type === 'saving') acc.savings += curr.amount;
      return acc;
    },
    { income: 0, expenses: 0, savings: 0 }
  );

  const balance = totals.income - totals.expenses;

  // Separate transactions by type
  const incomeTransactions = transactions.filter(t => t.type === 'income');
  const expenseTransactions = transactions.filter(t => t.type === 'expense');

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card rounded-xl p-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <Wallet className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Income</p>
              <p className="text-2xl font-bold text-gray-900">${totals.income}</p>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-xl p-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center">
            <div className="p-3 bg-red-100 rounded-lg">
              <TrendingDown className="h-8 w-8 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Expenses</p>
              <p className="text-2xl font-bold text-gray-900">${totals.expenses}</p>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-xl p-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Landmark className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Savings</p>
              <p className="text-2xl font-bold text-gray-900">${totals.savings}</p>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-xl p-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <DollarSign className="h-8 w-8 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Balance</p>
              <p className={`text-2xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${balance}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => setShowTransactionForm(true)}
          className="inline-flex items-center px-6 py-3 border border-transparent rounded-xl text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          Add Transaction
        </button>

        <button
          onClick={() => setShowBankStatementModal(true)}
          className="inline-flex items-center px-6 py-3 border border-transparent rounded-xl text-base font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <Upload className="h-5 w-5 mr-2" />
          Upload Bank Statement
        </button>
      </div>

      {/* Transactions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Income Transactions */}
        <div className="glass-card rounded-xl overflow-hidden">
          <div className="px-6 py-4 bg-green-50">
            <div className="flex items-center">
              <Wallet className="h-6 w-6 text-green-600 mr-2" />
              <h3 className="text-xl font-semibold text-green-900">Income Transactions</h3>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {incomeTransactions.length === 0 ? (
              <p className="text-center py-6 text-gray-500">No income transactions yet</p>
            ) : (
              incomeTransactions.map((transaction) => (
                <div key={transaction.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-gray-900">{transaction.description}</p>
                      <p className="text-sm text-gray-500">{transaction.date}</p>
                    </div>
                    <p className="text-green-600 font-semibold">+${transaction.amount}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Expense Transactions */}
        <div className="glass-card rounded-xl overflow-hidden">
          <div className="px-6 py-4 bg-red-50">
            <div className="flex items-center">
              <TrendingDown className="h-6 w-6 text-red-600 mr-2" />
              <h3 className="text-xl font-semibold text-red-900">Expense Transactions</h3>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {expenseTransactions.length === 0 ? (
              <p className="text-center py-6 text-gray-500">No expense transactions yet</p>
            ) : (
              expenseTransactions.map((transaction) => (
                <div key={transaction.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-gray-900">{transaction.description}</p>
                      <div className="flex items-center">
                        <span className="text-sm text-gray-500">{transaction.date}</span>
                        {transaction.category && (
                          <span className="ml-2 px-2 py-1 text-xs font-medium bg-gray-100 rounded-full text-gray-600">
                            {transaction.category}
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-red-600 font-semibold">-${transaction.amount}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {showTransactionForm && <AddTransactionModal onClose={() => setShowTransactionForm(false)} />}
      {showBankStatementModal && <BankStatementModal onClose={() => setShowBankStatementModal(false)} />}
    </div>
  );
}

export default HomePage