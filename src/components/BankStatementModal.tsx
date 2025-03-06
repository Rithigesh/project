import React, { useRef, useState } from 'react';
import { Upload, X, FileText, AlertCircle } from 'lucide-react';
import { useTransactions } from '../context/TransactionContext';
import { LoadingSpinner } from './LoadingSpinner';

interface BankStatementModalProps {
  onClose: () => void;
}

function BankStatementModal({ onClose }: BankStatementModalProps) {
  const { handlePDFUpload, isProcessing } = useTransactions();
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    await processFile(files[0]);
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      await processFile(e.target.files[0]);
    }
  };

  const processFile = async (file: File) => {
    if (!file) return;
    
    if (file.type !== 'application/pdf') {
      setError('Please upload a PDF file');
      return;
    }

    setError(null);
    setExtractedText(null);
    
    try {
      const text = await handlePDFUpload(file);
      setExtractedText(text);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error processing the PDF. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-2xl w-full m-4 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Upload Bank Statement</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 rounded-lg flex items-center text-red-800">
            <AlertCircle className="h-5 w-5 mr-2" />
            {error}
          </div>
        )}

        {!extractedText && (
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`
              border-2 border-dashed rounded-xl p-8 mb-4
              ${dragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'}
              ${isProcessing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              transition-all duration-200
            `}
            onClick={() => inputRef.current?.click()}
          >
            <input
              ref={inputRef}
              type="file"
              accept=".pdf"
              onChange={handleChange}
              disabled={isProcessing}
              className="hidden"
            />
            
            <div className="text-center">
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-900">
                  Drop your bank statement here
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  or click to select PDF file
                </p>
              </div>
            </div>
          </div>
        )}

        {isProcessing && <LoadingSpinner />}

        {extractedText && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Extracted Content:</h3>
            <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap font-mono text-sm">
              {extractedText}
            </div>
          </div>
        )}

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Only PDF files are supported</p>
        </div>
      </div>
    </div>
  );
}

export default BankStatementModal;