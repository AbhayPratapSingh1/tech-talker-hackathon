import React from 'react';

function UserProfile({ name, description, avatarLetter }) {
  return (
     <div className="flex items-center gap-4 bg-slate-300 w-72 p-2">
            
      <div className="w-12 h-12 bg-gray-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
        {avatarLetter || name[0].toUpperCase()}
      </div>

      <div>
        <div className="text-[20px]">{name}</div>
        <div className="text-[12px] font-bold text-gray-500">{description}</div>
      </div>
    </div>
  );
}

export default UserProfile;
