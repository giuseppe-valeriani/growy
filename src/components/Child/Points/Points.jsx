import "./Points.scss";

const Points = ({ points }) => {
  return (
    <article className="points">
      <div className="points__divider">
        <div>you have</div>
        <div>points!</div>
      </div>
      <div className="points__number">{points}</div>
    </article>
  );
};

export default Points;
