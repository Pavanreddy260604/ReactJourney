import React from 'react';

const NetworkStatusIndicator = ({ isOnline }) => {
  if (isOnline) return null;

  return (
    <div className="network-status offline">
      <div className="network-status-content">
        <span className="network-icon">⚠️</span>
        <span>You are currently offline</span>
      </div>
      <style jsx>{`
        .network-status {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: #f56565;
          color: white;
          padding: 8px 16px;
          text-align: center;
          z-index: 1000;
          animation: slideDown 0.3s ease;
        }
        
        .network-status-content {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-weight: 500;
        }
        
        .network-icon {
          font-size: 16px;
        }
        
        @keyframes slideDown {
          from { transform: translateY(-100%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default NetworkStatusIndicator;