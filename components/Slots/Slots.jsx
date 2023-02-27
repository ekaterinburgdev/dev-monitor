import { Tab, Tabs, TabList, TabPanel } from "../Tabs/Tabs";
import { DeadBranchesSlots } from "./DeadBranchesSlots";
import { PullsSlots } from "./PullsSlots";
import { IssuesSlots } from "./IssuesSlots";
import { ReadyForReviewPullsSlots } from "./ReadyForReviewPullsSlots";

export function Slots({ repository, ...project }) {
  return (
    <>
      <Tabs>
        <TabList>
          <Tab>
            Issues{" "}
            {Boolean(project.fullStat?.issues) &&
              `(${project.fullStat?.issues})`}
          </Tab>
          <Tab>For review</Tab>
          <Tab>Pulls</Tab>
          <Tab>Dead branches</Tab>
        </TabList>

        <TabPanel>
          <IssuesSlots project={project} repositoryUrl={repository.html_url} />
        </TabPanel>

        <TabPanel>
          <ReadyForReviewPullsSlots
            project={project}
            repositoryUrl={repository.html_url}
          />
        </TabPanel>

        <TabPanel>
          <PullsSlots project={project} repositoryUrl={repository.html_url} />
        </TabPanel>

        <TabPanel>
          <DeadBranchesSlots
            project={project}
            url={project.url}
            repositoryUrl={repository.html_url}
          />
        </TabPanel>
      </Tabs>
    </>
  );
}
