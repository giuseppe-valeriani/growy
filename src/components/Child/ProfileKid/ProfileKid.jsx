import "./ProfileKid.scss";

const ProfileKid = ({ name }) => {
  return (
    <article className="profile-kid">
      <div>Hey,</div>
      <div className="profile-kid__name">{name}!</div>
    </article>
  );
};

export default ProfileKid;
