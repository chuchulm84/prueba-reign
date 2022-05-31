import React, { useCallback, useEffect, useState } from "react";
import "./index.scss";
import moment from "moment";
import { ClockCircleOutlined } from "@ant-design/icons";
import { Pagination } from "antd";
import { Select, Button } from "antd";
import { FaAngular } from "react-icons/fa";
import { FaReact } from "react-icons/fa";
import { FaVuejs } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";

const { Option } = Select;

export const Card = ({
  data,
  dataSourse,
  setdataSourse,
  page,
  setPage,
  loading,
}) => {
  const { hits } = data;

  const [heartSelect, setheartSelect] = useState(hits);

  // useEffect(() => {
  //   const getLocal = () => {
  //     const local =
  //       JSON.parse(localStorage.getItem("heartSelect")) ?? heartSelect;
  //     setheartSelect(local);
  //   };

  //   getLocal();
  // }, []);

  useEffect(() => {
    localStorage.setItem("heartSelect", JSON.stringify(heartSelect));
  }, [heartSelect]);

  const handleChange = (value) => {
    setdataSourse(value.value);
  };

  const toggle = useCallback((arr, item) => {
    const result = heartSelect.map((e) => {
      let change = item === null ? 1 : null;
      if (e.objectID === arr) {
        e.points = change;
      }
      return e;
    });

    setheartSelect(result);
  }, []);

  const filterHeart = () => {
    if (heartSelect.some((e) => e.points !== null)) {
      const filter = heartSelect.filter((e) => e.points !== null);
      setheartSelect(filter);
    }
  };
  return (
    <>
      <div className="container-button">
        <Button className="button-Seclect" onClick={toggle}>
          All
        </Button>
        <Button className="button-Seclect" onClick={filterHeart}>
          My faves
        </Button>
      </div>
      <div className="containerSelect">
        <Select
          loading={loading}
          labelInValue
          defaultValue={dataSourse}
          style={{
            width: 200,
          }}
          onChange={handleChange}
        >
          <Option value="angular">
            <FaAngular className="angular" /> Angular
          </Option>
          <Option value="Reactjs">
            <FaReact className="react" /> Reactjs
          </Option>
          <Option value="Vuejs">
            <FaVuejs className="vue" /> Vuejs
          </Option>
        </Select>
      </div>

      <div className="containerInfo">
        {hits &&
          heartSelect.map((hi) => (
            <>
              <div className="containerCard" key={hi}>
                <div className="containerClock">
                  <span className="-hours-ago-by-autho">
                    <ClockCircleOutlined className="clock" />
                    {moment(hi.created_at).endOf("day").fromNow()} by author
                  </span>
                  <br />
                  <div></div>
                  <span className="Event-driven-state-m">
                    <a
                      href={hi.autor}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {hi.story_title}
                    </a>
                  </span>
                </div>

                <div
                  className="Rectangle"
                  onClick={() => toggle(hi.objectID, hi.points)}
                >
                  {hi.points === null ? (
                    <FaRegHeart className="heart" />
                  ) : (
                    <FaHeart className="heart" />
                  )}
                </div>
              </div>
            </>
          ))}
      </div>
      <div className="pagination">
        <Pagination
          current={page}
          pageSize={7}
          total={50}
          onChange={(value) => setPage(value)}
          responsive={true}
        />
      </div>
    </>
  );
};
