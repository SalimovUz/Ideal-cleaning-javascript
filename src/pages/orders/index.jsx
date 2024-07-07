import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Order } from "@modal";
import { EditOrder } from "@modal";
import { OrderTable } from "@ui";
import { order } from "@service";
import Pagination from "@mui/material/Pagination";

const Index = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [params, setParams] = useState({
    limit: 5,
    page: 1,
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getData = async () => {
    try {
      const response = await order.get(params);
      if (response.status === 200 && response?.data?.orders_list) {
        setData(response?.data?.orders_list);
        let total = Math.ceil(response.data.total / params.limit);
        setCount(total);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [params]);

  const handleChange = (event, value) => {
    setParams({
      ...params,
      page: value,
    });
  };

  return (
    <>
      <Order open={open} handleClose={handleClose} />
      <EditOrder open={open} handleClose={handleClose} />
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
        <Pagination count={count} page={params.total} onChange={handleChange} />
      </div>
    </>
  );
};

export default Index;
