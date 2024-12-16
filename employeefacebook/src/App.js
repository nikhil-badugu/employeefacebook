import React, { useState } from "react";
import ExcelReader from "./ExcelReader";
import CardDisplay from "./CardDisplay";

const App = () => {
  const [data, setData] = useState([]);

  return (
    <div align="center" style={{ padding: "20px" }}>
      <h1>BizAcuity Employee FaceBook</h1>
      <ExcelReader setData={setData} />
      {data.length > 0 && <CardDisplay data={data} />}
    </div>
  );
};

export default App;
