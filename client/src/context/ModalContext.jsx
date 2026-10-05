import React, { createContext, useContext, useState, useCallback } from 'react';
import { AlertTriangle, CheckCircle2, Info } from 'lucide-react';

const ModalContext = createContext(null);

export function ModalProvider({ children }) {
  const [modal, setModal] = useState(null);
  // modal shape: { type: 'alert' | 'confirm', message, variant, onConfirm }

  const alert = useCallback((message, variant = 'info') => {
    return new Promise((resolve) => {
      setModal({
        type: 'alert',
        message,
        variant,
        onClose: () => {
          setModal(null);
          resolve();
        },
      });
    });
  }, []);

  const confirm = useCallback((message, variant = 'danger') => {
    return new Promise((resolve) => {
      setModal({
        type: 'confirm',
        message,
        variant,
        onConfirm: () => {
          setModal(null);
          resolve(true);
        },
        onCancel: () => {
          setModal(null);
          resolve(false);
        },
      });
    });
  }, []);

  const icons = {
    success: <CheckCircle2 className="w-6 h-6 text-emerald-700" />,
    danger: <AlertTriangle className="w-6 h-6 text-red-600" />,
    info: <Info className="w-6 h-6 text-emerald-700" />,
  };

  const iconBg = {
    success: 'bg-emerald-50',
    danger: 'bg-red-50',
    info: 'bg-emerald-50',
  };

  return (
    <ModalContext.Provider value={{ alert, confirm }}>
      {children}

      {modal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999] p-4"
          onClick={modal.type === 'alert' ? modal.onClose : undefined}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl p-6 sm:p-7 w-full max-w-sm shadow-2xl space-y-4 text-center"
          >
            <div className={`w-12 h-12 rounded-full ${iconBg[modal.variant]} flex items-center justify-center mx-auto`}>
              {icons[modal.variant]}
            </div>

            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
              {modal.message}
            </p>

            {modal.type === 'alert' ? (
              <button
                onClick={modal.onClose}
                className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm py-2.5 rounded-xl transition-colors"
              >
                OK
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={modal.onCancel}
                  className="flex-1 border border-gray-300 text-gray-700 font-bold text-sm py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={modal.onConfirm}
                  className={`flex-1 font-bold text-sm py-2.5 rounded-xl text-white transition-colors ${
                    modal.variant === 'danger'
                      ? 'bg-red-600 hover:bg-red-700'
                      : 'bg-emerald-800 hover:bg-emerald-900'
                  }`}
                >
                  Confirm
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('useModal must be used inside a ModalProvider');
  return ctx;
}