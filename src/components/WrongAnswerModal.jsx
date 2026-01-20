import React, { useEffect } from 'react';

const WrongAnswerModal = ({ isOpen, onClose, message = "Wrong Answer! Try Again." }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(onClose, 2500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" />
      
      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
        <div className="pointer-events-auto animate-bounce">
          <div className="bg-red-50 border-2 border-red-500 rounded-lg shadow-2xl p-8 max-w-sm mx-4">
            <div className="text-center">
              <div className="text-6xl mb-4">❌</div>
              <h2 className="text-2xl font-bold text-red-700 mb-2">Wrong Answer!</h2>
              <p className="text-red-600 mb-4">{message}</p>
              <p className="text-sm text-red-500">Try again...</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WrongAnswerModal;
