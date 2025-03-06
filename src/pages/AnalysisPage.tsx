import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { useTransactions } from '../context/TransactionContext';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function AnalysisPage() {
  const { transactions } = useTransactions();

  // Group transactions by date and type
  const transactionsByDate = transactions.reduce((acc, transaction) => {
    const date = transaction.date;
    if (!acc[date]) {
      acc[date] = { income: 0, expense: 0 };
    }
    if (transaction.type === 'income') {
      acc[date].income += transaction.amount;
    } else if (transaction.type === 'expense') {
      acc[date].expense += transaction.amount;
    }
    return acc;
  }, {} as Record<string, { income: number; expense: number }>);

  // Sort dates and prepare data for line chart
  const dates = Object.keys(transactionsByDate).sort();
  const incomeData = dates.map(date => transactionsByDate[date].income);
  const expenseData = dates.map(date => transactionsByDate[date].expense);

  // Calculate cumulative totals for line chart
  const cumulativeIncome = incomeData.reduce((acc, val, i) => {
    acc.push((acc[i - 1] || 0) + val);
    return acc;
  }, [] as number[]);

  const cumulativeExpenses = expenseData.reduce((acc, val, i) => {
    acc.push((acc[i - 1] || 0) + val);
    return acc;
  }, [] as number[]);

  // Prepare expense categories data
  const expensesByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, curr) => {
      const category = curr.category || 'Others';
      acc[category] = (acc[category] || 0) + curr.amount;
      return acc;
    }, {} as Record<string, number>);

  // Line chart data
  const lineChartData = {
    labels: dates,
    datasets: [
      {
        label: 'Cumulative Income',
        data: cumulativeIncome,
        borderColor: 'rgba(34, 197, 94, 1)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Cumulative Expenses',
        data: cumulativeExpenses,
        borderColor: 'rgba(239, 68, 68, 1)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Bar chart data for income vs expenses
  const barChartData = {
    labels: dates,
    datasets: [
      {
        label: 'Income',
        data: incomeData,
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 1,
      },
      {
        label: 'Expenses',
        data: expenseData,
        backgroundColor: 'rgba(239, 68, 68, 0.8)',
        borderColor: 'rgba(239, 68, 68, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Pie chart data for expense categories
  const pieChartData = {
    labels: Object.keys(expensesByCategory),
    datasets: [
      {
        data: Object.values(expensesByCategory),
        backgroundColor: [
          'rgba(99, 102, 241, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(236, 72, 153, 0.8)',
          'rgba(14, 165, 233, 0.8)',
          'rgba(168, 162, 158, 0.8)',
        ],
        borderColor: 'white',
        borderWidth: 2,
      },
    ],
  };

  // Chart options
  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Income vs Expenses Over Time',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Daily Income and Expenses',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="space-y-8">
      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <div className="glass-card rounded-xl p-6 chart-container">
          <Line data={lineChartData} options={lineChartOptions} />
        </div>

        {/* Bar Chart */}
        <div className="glass-card rounded-xl p-6 chart-container">
          <Bar data={barChartData} options={barChartOptions} />
        </div>
      </div>

      {/* Summary Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="glass-card rounded-xl p-6 chart-container">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Expense Distribution</h3>
          <div className="h-64">
            <Pie data={pieChartData} />
          </div>
        </div>

        {/* Stats and Insights */}
        <div className="glass-card rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Insights</h3>
          <div className="space-y-4">
            {Object.entries(expensesByCategory).length > 0 ? (
              <>
                <div className="flex items-center text-yellow-600">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  <span className="text-sm">
                    Highest spending category: <strong>{
                      Object.entries(expensesByCategory).reduce((a, b) => a[1] > b[1] ? a : b)[0]
                    }</strong>
                  </span>
                </div>
                <div className="space-y-2">
                  {Object.entries(expensesByCategory)
                    .sort(([,a], [,b]) => b - a)
                    .map(([category, amount]) => (
                      <div key={category} className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">{category}</span>
                        <span className="text-sm font-medium">${amount}</span>
                      </div>
                    ))
                  }
                </div>
              </>
            ) : (
              <p className="text-gray-500 text-center">No expense data available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalysisPage;