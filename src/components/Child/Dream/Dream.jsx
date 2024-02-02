import "./Dream.scss";
import noCircle from "../../../assets/icons/noCircle.png";
import redCircle from "../../../assets/icons/red-circle.svg";
import orangeCircle from "../../../assets/icons/orange-circle.svg";
import greenCircle from "../../../assets/icons/green-circle.svg";

const Dream = ({ dream: { goal, points, id }, redeemPoints, childPoints }) => {
  const iconRendering = [noCircle, redCircle, orangeCircle, greenCircle];

  return (
    <div className="dream">
      <div className="dream__card">{goal}</div>
      <div>
        {childPoints >= points && (
          <img
            onClick={() => redeemPoints(points, id)}
            className="dream__circle dream__success"
            alt="position"
            src={iconRendering[3]}
          />
        )}
        {childPoints == points && (
          <img
            className="dream__circle"
            alt="position"
            src={iconRendering[2]}
          />
        )}
        {childPoints <= points && (
          <img
            className="dream__circle"
            alt="position"
            src={iconRendering[1]}
          />
        )}
        {!points && (
          <img
            className="dream__circle"
            alt="position"
            src={iconRendering[0]}
          />
        )}
      </div>
    </div>
  );
};

export default Dream;
