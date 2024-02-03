import "./ProfileKid.scss";
import boyIcon from "../../../assets/icons/boy.png";

const ProfileKid = ({ name }) => {
  return (
    <div className="profile-kid">
      <img className="profile-kid__icon" alt="boy icon" src={boyIcon} />
      <h2 className="profile-kid__text">Hi {name}!</h2>
    </div>
  );
};

export default ProfileKid;
