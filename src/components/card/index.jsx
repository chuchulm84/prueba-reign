import React, { useState } from "react";
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

  const [heartSelect, setheartSelect] = useState(data.hits);
  const [favorite, setFavorite] = useState(hits);

  // console.log("heartSelect", heartSelect);

  console.log("data", data);

  const handleChange = (value) => {
    setdataSourse(value.value);
  };

  const toggle = (arr, item) => {
    if (item !== null) {
      setheartSelect(...heartSelect, arr);
    } else {
      setheartSelect([...heartSelect].filter((e) => e.objectID !== arr));
    }
  };

  const filterHeart = () => {
    if (hits.some((e) => e.points !== null)) {
      const filter = hits.filter((e) => e.points !== null);
      setFavorite(filter);
    }
  };
  return (
    <>
      <div className="container-button">
        <Button className="button-Seclect" onClick={() => setFavorite(hits)}>
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
          favorite.slice(0, 8).map((hi) => (
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
          total={60}
          onChange={(value) => setPage(value)}
        />
      </div>
    </>
  );
};
