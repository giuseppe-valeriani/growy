import React from "react";
import "./ChildProfile.scss";

const ChildProfile = ({ child: { name, current_points } }) => {
  return (
    <article className="child-profile">
      <div className="child-profile__name">{name}</div>
      <div className="child-profile__points">{current_points}</div>
    </article>
  );
};

export default ChildProfile;
