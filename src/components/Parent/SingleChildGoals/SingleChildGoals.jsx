import "./SingleChildGoals.scss";
import Goal from "../Goal/Goal";

const SingleChildGoals = ({ goals, gettingGoals, id: idParams }) => {
  if (!goals) {
    return <main>Loading...</main>;
  }

  return (
    <main className="single-child-goals">
      {goals.map((goal) => (
        <article className="single-child-goals__card" key={goal.id}>
          <Goal idParams={idParams} goal={goal} gettingGoals={gettingGoals} />
        </article>
      ))}
    </main>
  );
};

export default SingleChildGoals;
