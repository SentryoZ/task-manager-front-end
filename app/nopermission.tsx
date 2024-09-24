import React from 'react';

const NoPermissionPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <h1 className="text-4xl font-bold mb-4">Access Denied</h1>
      <p className="text-lg">You do not have permission to view this page.</p>
    </div>
  );
};

export default NoPermissionPage;