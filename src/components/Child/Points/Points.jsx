import "./Points.scss";

const Points = ({ points }) => {
  return (
    <article className="points">
      <div>you have</div>
      <div className="points__number">{points}</div>
      <div>points!!!</div>
    </article>
  );
};

export default Points;
