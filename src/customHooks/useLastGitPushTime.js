import { useEffect, useState } from "react";
import LastGitPush from "../tools/lastGitPush";

export default function useLastGitPushTime(owner, repo) {
  const [lastPushTime, setLastPushTime] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGit() {
      try {
        const pushTime = await LastGitPush(owner, repo);
        setLastPushTime(pushTime);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
    fetchGit();
  }, [owner, repo]);

  return { lastPushTime, loading };
}
