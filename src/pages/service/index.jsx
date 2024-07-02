import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Service } from "@modal";
import { ServiceTable } from "@ui";
import { service } from "@service";

const Index = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getData = async () => {
    try {
      const response = await service.get();
      if(response.status === 200 && response?.data?.services) {
        setData(response?.data?.services)
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
      <Service open={open} handleClose={handleClose} />
      <div className="flex flex-col gap-4">
        <div className="flex justify-end">
          <Button className="hover:scale-110 transition-all duration-400" onClick={handleOpen} variant="contained" color="primary">
            Add
          </Button>
        </div>
        <ServiceTable data={data} />
      </div>
    </>
  );
};

export default Index;
