import { Tab, Tabs, TabList, TabPanel } from "../Tabs/Tabs";
import { BranchesSlots } from "./BranchesSlots";
import { PullsSlots } from "./PullsSlots";
import { IssuesSlots } from "./IssuesSlots";

export function Slots({ repository, ...project }) {
  const pulls = project.stats.pulls;
  const hasPulls = Boolean(pulls.length);

  return (
    <>
      <Tabs>
        <TabList>
          <Tab>Branches</Tab>
          <Tab disabled={!hasPulls}>
            Pulls ({pulls.length})
          </Tab>
          <Tab>
            Issues{" "}
            {Boolean(repository.open_issues_count) &&
              `(${repository.open_issues_count})`}
          </Tab>
        </TabList>

        <TabPanel>
          <BranchesSlots {...project} repositoryUrl={repository.html_url} />
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
