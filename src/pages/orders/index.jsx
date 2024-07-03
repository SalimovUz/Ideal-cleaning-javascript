import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Order } from "@modal";
import { ServiceTable } from "@ui";
import { order } from "@service";

const Index = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getData = async () => {
    try {
      const response = await order.get();
      if (response.status === 200 && response?.data?.order) {
        setData(response?.data?.order);
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
        <ServiceTable data={data} />
      </div>
    </>
  );
};

export default Index;
