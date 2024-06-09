import React, { useEffect, useState } from "react";
import { Table } from "flowbite-react";
import moment from "moment";
import { CiTrash } from "react-icons/ci";
import { Dropdown } from "flowbite-react";

import axios from "axios";
const TableRev = ({ data, index, hadleSubmit }) => {
  const [user, setUser] = useState(null);
  const[status ,setStatus] = useState('');
  useEffect(() => {
    const fetchUser = async () => {
      const rest = await axios.get(
        `http://localhost:3000/user/getUsers?userId=${data.userId}`
      );
      if (rest.status == 200) {
        setUser(rest.data.users[0]);
        
      }
    };
    fetchUser();
  }, [data]);
  return (
    <Table.Row
      key={index}
      className="bg-white dark:border-gray-700 dark:bg-gray-800"
    >
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        {index + 1}
      </Table.Cell>
      <Table.Cell>{user?.username}</Table.Cell>
      <Table.Cell>{data?.headLine}</Table.Cell>
      <Table.Cell>{data?.comment}</Table.Cell>

      {/* <Table.Cell>{data?.brand}</Table.Cell>
                  <Table.Cell>{data?.category}</Table.Cell>
                 */}

      <Table.Cell>{moment(data?.createdAt).format("LL")}</Table.Cell>
      <Table.Cell className="  flex  items-center justify-center" >
        <Dropdown
          label=<div className={`border p-2 px-4 rounded   ${data?.isSubmit ==='pending'? "text-blue-400 border-blue-400" : data?.isSubmit==='submited' ? 'text-green-800 border-green-600' : 'text-red-400 border-red-400'}`}>
          {status||data?.isSubmit}
          </div>
          inline
          arrowIcon={false}
         
        >
          <Dropdown.Item className=" text-sm"  onClick={() => {
            hadleSubmit(data?._id, 'submited',user?.username,user?.email)
            setStatus('Submited')
        } 
       }>Submited</Dropdown.Item>
          <Dropdown.Item className="text-sm"  onClick={() =>{hadleSubmit(data?._id, 'banned',user?.username,user?.email)

            setStatus('Banned')
          }}>Banned</Dropdown.Item>
          
          
        </Dropdown>
       
      </Table.Cell>
      {/* <Table.Cell>
                    status
                  </Table.Cell> */}
      <Table.Cell>
        <div className="flex items-center gap-2">
          {/* <Link to={`/dashboard?tab=editProduct&slug=${shoe?.slug}`}>
                      <div className="border border-slate-500 p-2 flex items-center gap-1 text-[12px]   cursor-pointer text-slate-500 rounded-md transition duration-500  hover:bg-slate-500 hover:text-white">
                        <CiEdit className=" text-lg " />
                      </div>
                      </Link> */}
          <div
            className="border cursor-pointer border-red-500 p-2 gap-1 flex items-center text-[12px] text-red-500 rounded-md transition duration-500  hover:bg-red-500 hover:text-white"
            // onClick={() => {
            //   setShowModel(true);
            // }}
          >
            <CiTrash
              className=" text-lg "
              //   onClick={() => setDeleteItem(shoe?._id)}
            />
          </div>
        </div>
       
      </Table.Cell>
    </Table.Row>
  );
};

export default TableRev;
