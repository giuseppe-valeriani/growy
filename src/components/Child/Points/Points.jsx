import "./Points.scss";

const Points = ({ points }) => {
  return (
    <article className="points">
      <div className="points__text">
        you have <span className="points__number">{points}</span> points!
      </div>
    </article>
  );
};

export default Points;
