import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./Child.scss";
import leftArrow from "./../../assets/icons/left-arrow.svg";
import rightArrow from "./../../assets/icons/right-arrow.svg";

import ProfileKid from "../../components/Child/ProfileKid/ProfileKid";
import Points from "../../components/Child/Points/Points";
import Dreams from "../../components/Child/Dreams/Dreams";
import Tasks from "../../components/Child/Tasks/Tasks";

const URL = import.meta.env.VITE_API_URL;

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
const Child = () => {
  const [childState, setChildState] = useState(null);
  const [childProfile, setChildProfile] = useState(null);

  const { id } = useParams();

  const getChildInfo = async () => {
    const response = await axios.get(`${URL}children`);
    const filtered = response.data.filter((child) => child.id == id);
    setChildState(filtered);
  };

  const getPersonalFile = async () => {
    const response = await axios(`${URL}children/${id}`);
    setChildProfile(response.data);
  };

  useEffect(() => {
    getChildInfo();
    getPersonalFile();
  }, []);

  if (!childState || !childProfile) {
    return <main>Loading...</main>;
  }

  return (
    <main className="child">
      <section className="child__upper">
        <ProfileKid name={childState[0].name} />
        <Points points={childState[0].current_points} />
        <Dreams />
      </section>
      <section className="child__lower">
        <img className="child__arrow" alt="direction arrow" src={leftArrow} />
        <Carousel responsive={responsive}>
          <Tasks />
        </Carousel>
        <img className="child__arrow" alt="direction arrow" src={rightArrow} />
      </section>
    </main>
  );
};

export default Child;
