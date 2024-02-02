import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Profile.scss";
import ChildProfile from "../ChildProfile/ChildProfile";
import AddProfile from "../AddProfile/AddProfile";
import DeleteProfile from "../DeleteProfile/DeleteProfile";

const URL = import.meta.env.VITE_API_URL;

const Profile = () => {
  const [children, setChildren] = useState();
  const [isAddProfileOpen, setIsAddProfileOpen] = useState(false);
  const [isDeleteProfileOpen, setIsDeleteProfileOpen] = useState(false);

  const getChildren = async () => {
    const response = await axios.get(`${URL}children`);
    setChildren(response.data);
  };

  const deleteChildProfile = async (childId) => {
    const payload = { id: childId };
    await axios.delete(`${URL}children/${childId}`, { data: payload });
    setIsDeleteProfileOpen(false);
    getChildren();
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
      <section className="profile__buttons">
        {isAddProfileOpen ? (
          <div className="profile__aligner">
            <AddProfile
              getChildren={getChildren}
              setIsAddProfileOpen={setIsAddProfileOpen}
            />
            <button
              onClick={() => setIsAddProfileOpen(false)}
              className="profile__button"
            >
              cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsAddProfileOpen(true)}
            className="profile__button"
          >
            add new profile
          </button>
        )}
        {!isDeleteProfileOpen ? (
          <button
            onClick={() => setIsDeleteProfileOpen(true)}
            className="profile__button"
          >
            delete profile
          </button>
        ) : (
          <button
            onClick={() => setIsDeleteProfileOpen(false)}
            className="profile__button"
          >
            cancel deleting
          </button>
        )}
      </section>
      <section>
        {isDeleteProfileOpen && (
          <DeleteProfile
            children={children}
            deleteChildProfile={deleteChildProfile}
          />
        )}
      </section>
    </main>
  );
};
export default Profile;
