import { Tab, Tabs, TabList, TabPanel } from "../Tabs/Tabs";
import { DeadBranchesSlots } from "./DeadBranchesSlots";
import { PullsSlots } from "./PullsSlots";
import { IssuesSlots } from "./IssuesSlots";
import { ReadyForReviewPullsSlots } from "./ReadyForReviewPullsSlots";

export function Slots({ repository, ...project }) {
  const repos = [project.git].concat(
    project?.children?.map((c) => c.git) || []
  );

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
          <IssuesSlots repos={repos} repositoryUrl={repository.html_url} />
        </TabPanel>

        <TabPanel>
          <ReadyForReviewPullsSlots
            repos={repos}
            repositoryUrl={repository.html_url}
          />
        </TabPanel>

        <TabPanel>
          <PullsSlots repos={repos} repositoryUrl={repository.html_url} />
        </TabPanel>

        <TabPanel>
          <DeadBranchesSlots
            repos={repos}
            url={project.url}
            repositoryUrl={repository.html_url}
          />
        </TabPanel>
      </Tabs>
    </>
  );
}
