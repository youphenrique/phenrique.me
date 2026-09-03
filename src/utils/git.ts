import { execFileSync } from "node:child_process";

export interface LatestCommit {
  sha: string;
  shortSha: string;
  date: string;
  additions: number;
  deletions: number;
}

function git(args: string[]): string {
  return execFileSync("git", args, { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] });
}

/**
 * Reads the latest commit from the local repository at build time.
 * Returns null when git or the commit data is unavailable (e.g. a clone
 * without history), so callers can simply skip rendering.
 */
export function getLatestCommit(): LatestCommit | null {
  try {
    const [sha, date] = git(["show", "--no-patch", "--format=%H%n%cI", "HEAD"]).trim().split("\n");

    if (!sha || !date) return null;

    // In a shallow clone the parent commit may be missing, which would make
    // git report the whole tree as additions. Skip rather than lie.
    const isShallow = git(["rev-parse", "--is-shallow-repository"]).trim() === "true";
    const hasParent = (() => {
      try {
        git(["rev-parse", "--verify", `${sha}^`]);
        return true;
      } catch {
        return false;
      }
    })();

    if (isShallow && !hasParent) return null;

    let additions = 0;
    let deletions = 0;

    for (const line of git(["show", "--numstat", "--format=", "-m", "--first-parent", sha]).trim().split("\n")) {
      const [added, removed] = line.trim().split("\t");
      additions += Number.parseInt(added, 10) || 0;
      deletions += Number.parseInt(removed, 10) || 0;
    }

    return { sha, shortSha: sha.slice(0, 7), date, additions, deletions };
  } catch {
    return null;
  }
}
