import React from 'react'
import { axiosInstance } from '@/lib/http'


 const useOnDelete = (type: string, id: string, fetchData: () => void  ) => {
    const onDelete = async () => {
    try {
        const response = await axiosInstance.delete(`api/${type}/${id}`);
        fetchData();
      } catch (error) {
        console.error(error);
        }
    }
    return onDelete;    
}

export default useOnDelete;