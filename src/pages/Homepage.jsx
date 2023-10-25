import { Link } from "react-router-dom";
import styles from "./Homepage.module.css";
import PageNav from "../components/PageNav";
import useLastGitPushTime from "../customHooks/useLastGitPushTime";
import { Toaster, toast } from "sonner";

export default function Homepage() {
  const { lastPushTime, isLoading } = useLastGitPushTime(
    "cherrydub",
    "worldwise"
  );

  // let lastPushDisplay = "Loading...";

  if (!isLoading && lastPushTime) {
    const datePart = lastPushTime.split("T")[0];
    const timePart = lastPushTime.split("T")[1].substring(0, 5) + " UTC";
    let lastPushDisplay = `${datePart} @ ${timePart}`;

    toast(`Welcome😎 Last Push: ${lastPushDisplay}`);
  }

  return (
    <main className={styles.homepage}>
      <PageNav />
      <section>
        {/* <h1>{lastPushDisplay}</h1> */}
        <h1>
          You travel the world.
          <br />
          WorldWise keeps track of your adventures.
        </h1>
        <h2>
          A world map that tracks your footsteps into every city you can think
          of. Never forget your wonderful experiences, and show your friends how
          you have wandered the world.
        </h2>
        <Link to="/login" className="cta">
          Start tracking now
        </Link>
      </section>
    </main>
  );
}
