import React, { useState } from 'react';
import SignOut from '../commonComponent/logOut';
import { useSelector } from 'react-redux';
import { capitalize } from '../commonFunction/string';

function UserProfileHeader() {
  const [openSignOut, setOpenSignOut] = useState(false)
  
  const data = useSelector((state) => state.app.data)

  const color1 = useSelector((state) => state.app.color1)
  const color2 = useSelector((state) => state.app.color2)
  const color3 = useSelector((state) => state.app.color3)

  return (
    <>
      {openSignOut && <SignOut setOpenDiv={setOpenSignOut} />}
      <div onClick={() => { setOpenSignOut(true) }} className=" flex flex-row-reverse items-center gap-4 cursor-pointer">

        <div style={{ color: color3, backgroundColor: color1 }} className="w-12 h-12  rounded-full flex items-center justify-center text-2xl font-semibold">
          {data?.name?.charAt(0).toUpperCase()}
        </div>

        <div className='text-right'>
          <div className="text-[18px] font-semibold">{capitalize(data?.name)}</div>
          <div className="text-[12px] font-bold text-gray-500">{data.id}</div>
        </div>
      </div>
    </>
  );
}

export default UserProfileHeader;
