import React, { createContext, useContext, useState } from 'react';
import { extractTextFromPDF } from '../pdfParser';

interface Transaction {
  id: string;
  type: 'income' | 'expense' | 'saving';
  amount: number;
  description: string;
  category?: string;
  date: string;
}

interface TransactionContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  handlePDFUpload: (file: File) => Promise<string>;
  isProcessing: boolean;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export function TransactionProvider({ children }: { children: React.ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = {
      ...transaction,
      id: Date.now().toString(),
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const handlePDFUpload = async (file: File) => {
    if (!file || file.type !== 'application/pdf') {
      throw new Error('Please upload a valid PDF file');
    }

    setIsProcessing(true);
    try {
      const extractedText = await extractTextFromPDF(file);
      return extractedText;
    } catch (error) {
      console.error('Error processing PDF:', error);
      throw error;
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <TransactionContext.Provider value={{ transactions, addTransaction, handlePDFUpload, isProcessing }}>
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
}