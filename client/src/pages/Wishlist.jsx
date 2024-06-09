import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import WatchListCard from "../components/WatchListCard";

const Wishlist = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [user, setUser] = useState(null);
  const [showCard, setShowCard] = useState(false);
  const [clickData, setClickData] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const rest = await axios.get(
        `https://keisneaker-8da6.onrender.com/user/getUsers?userId=${currentUser?._id}`
      );
      if (rest.status == 200) {
        setUser(rest.data.users[0]);
      }
    };
    fetchUser();
  }, [currentUser]);
   

  return (
   <>
    <div className=" mt-28  w-full px-5 md:px-0 md:max-w-6xl mx-auto  flex flex-col ">
      <div
        className=" text-xl md:text-2xl uppercase font-semibold  "
        style={{ letterSpacing: 1.5 }}
      >
        Wishlist
      </div>
      <div className=" w-full h-full mt-8 grid grid-cols-2 md:grid-cols-4 md:flex-1 gap-4 md:gap-8  ">
        {
            user?.watchLists?.length > 0 ? (
                user?.watchLists?.map((data, index) => {
            
                    return <WatchListCard id={data} user={user} setUser={setUser} setClickData={setClickData} setShowCard={setShowCard} />
                  })

            )
            : (
                <h1>Your wishlist is empty</h1>
            )
        }
        
      </div>
    </div>
    {showCard && <AddCard setShowCard={setShowCard} clickData={clickData} />}
    
   </>
  );
};

export default Wishlist;
