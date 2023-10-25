import axios from "axios";

export default async function LastGitPush(owner, repo) {
  try {
    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/commits/main`
    );

    const lastPushTime = response.data.commit.author.date;
    return lastPushTime;
  } catch (error) {
    console.error("Error fetching last push time:", error);
    return null;
  }
}
