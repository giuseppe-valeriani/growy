import "./DeleteProfile.scss";
import React from "react";

const DeleteProfile = ({ children, deleteChildProfile }) => {
  return (
    <article className="delete-profile">
      {children.map((child) => (
        <div
          className="delete-profile__name"
          key={child.id}
          onClick={() => deleteChildProfile(child.id)}
        >
          {child.name}
        </div>
      ))}
    </article>
  );
};

export default DeleteProfile;
