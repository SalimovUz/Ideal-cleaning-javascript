import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Order } from "@modal";
import { OrderTable } from "@ui";
import { order } from "@service";

const Index = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getData = async () => {
    try {
      const response = await order.get();
      if (response.status === 200 && response?.data?.orders_list) {
        setData(response?.data?.orders_list);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Order open={open} handleClose={handleClose} />
      <div className="flex flex-col gap-4">
        <div className="flex justify-end">
          <Button
            className="hover:scale-110 transition-all duration-400"
            onClick={handleOpen}
            variant="contained"
            color="primary"
          >
            Add
          </Button>
        </div>
        <OrderTable data={data} setData={setData} />
      </div>
    </>
  );
};

export default Index;
