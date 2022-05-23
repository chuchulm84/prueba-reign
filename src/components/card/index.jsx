import React, { useState } from "react";
import "./index.scss";
import moment from "moment";
import { ClockCircleOutlined } from "@ant-design/icons";
import { Pagination } from "antd";
import { Select } from "antd";
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
  const [heartSelect, setheartSelect] = useState(false);
  const { hits } = data;

  console.log("data", data);

  const handleChange = (value) => {
    setdataSourse(value.value);
  };

  const toggle = (id, points) => {
    hits.slice(0, 8).map((di) => {
      let confirm;

      if (di.objectID === id) {
        if (di.points === points) {
          confirm = setheartSelect(true);
        } else {
          confirm = setheartSelect(false);
        }
      }

      return confirm;
    });
  };

  return (
    <>
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
          hits.slice(0, 8).map((hi) => (
            <>
              <div className="containerCard" key={hi}>
                <div className="containerClock">
                  <span className="-hours-ago-by-autho">
                    <ClockCircleOutlined className="clock" />
                    {moment(hi.created_at).endOf("day").fromNow()} by author
                  </span>
                  <br />
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
                  {heartSelect ? (
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
          total={60}
          onChange={(value) => setPage(value)}
        />
      </div>
    </>
  );
};
