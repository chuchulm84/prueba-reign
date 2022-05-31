import React, { useState, useEffect } from "react";
import api from "../utils/api";
import { Card } from "../components/card";
import "./index.scss";
import { LoadingBox } from "../utils/loading/LoadingBox";

function App() {
  const [data, setdata] = useState({});
  const [dataSourse, setdataSourse] = useState("angular");
  const [page, setPage] = useState(0);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setloading(true);
    api
      .get(
        `api/v1/search_by_date?query=${dataSourse}&page=${page}&hitsPerPage=${8}`
      )
      .then((response) => {
        setloading(false);

        setdata(response.data);
      });
  }, [dataSourse, page]);

  return (
    <div className="container-app">
      {loading ? (
        <LoadingBox />
      ) : (
        <Card
          data={data}
          dataSourse={dataSourse}
          setdataSourse={setdataSourse}
          page={page}
          setPage={setPage}
          loading={loading}
        />
      )}
    </div>
  );
}

export default App;
