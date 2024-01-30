import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Profile.scss";
import ChildProfile from "../ChildProfile/ChildProfile";
import AddProfile from "../AddProfile/AddProfile";

const URL = import.meta.env.VITE_API_URL;

const Profile = () => {
  const [children, setChildren] = useState();
  const [isAddProfileOpen, setIsAddProfileOpen] = useState(false);

  const getChildren = async () => {
    const response = await axios.get(`${URL}children`);
    setChildren(response.data);
  };
  useEffect(() => {
    getChildren();
  }, []);

  if (!children) {
    return <main>Loading...</main>;
  }

  return (
    <main className="profile">
      <section>
        {children.map((child) => (
          <Link
            to={`/family/${child.id}`}
            key={child.id}
            className="profile__child"
          >
            <ChildProfile child={child} />
          </Link>
        ))}
      </section>
      <section>
        {isAddProfileOpen ? (
          <AddProfile
            getChildren={getChildren}
            setIsAddProfileOpen={setIsAddProfileOpen}
          />
        ) : (
          <button
            onClick={() => setIsAddProfileOpen(true)}
            className="profile__button"
          >
            add new profile
          </button>
        )}
      </section>
    </main>
  );
};
export default Profile;
