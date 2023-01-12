import { Tab, Tabs, TabList, TabPanel } from "../Tabs/Tabs";
import { DeadBranchesSlots } from "./DeadBranchesSlots";
import { PullsSlots } from "./PullsSlots";
import { IssuesSlots } from "./IssuesSlots";
import { ReadyForReviewPullsSlots } from "./ReadyForReviewPullsSlots";

export function Slots({ repository, ...project }) {
  const pulls = project.stats.pulls;
  const hasPulls = Boolean(pulls.length);

  return (
    <>
      <Tabs>
        <TabList>
          <Tab>Dead branches</Tab>
          <Tab>For review</Tab>
          <Tab disabled={!hasPulls}>Pulls ({pulls.length})</Tab>
          <Tab>
            Issues{" "}
            {Boolean(repository.open_issues_count) &&
              `(${repository.open_issues_count})`}
          </Tab>
        </TabList>

        <TabPanel>
          <DeadBranchesSlots {...project} repositoryUrl={repository.html_url} />
        </TabPanel>

        <TabPanel>
          <ReadyForReviewPullsSlots
            {...project}
            pulls={pulls}
            repositoryUrl={repository.html_url}
          />
        </TabPanel>

        <TabPanel>
          <PullsSlots
            {...project}
            pulls={pulls}
            repositoryUrl={repository.html_url}
          />
        </TabPanel>

        <TabPanel>
          <IssuesSlots {...project} repositoryUrl={repository.html_url} />
        </TabPanel>
      </Tabs>
    </>
  );
}
