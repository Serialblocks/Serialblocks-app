import { useEffect, useState } from "react";
import { request, gql } from "graphql-request";
import { ReactComponent as Star } from "@/assets/star.svg";
import { ReactComponent as Issue } from "@/assets/issue.svg";
import { ReactComponent as Repo } from "@/assets/repo.svg";
import { ReactComponent as Fork } from "@/assets/fork.svg";
import { ReactComponent as Contributors } from "@/assets/contributors.svg";
import tinycolor from "tinycolor2";
let SUPER_SECRET_APIKEY;
if (import.meta.env.MODE === "development") {
  console.log("devvvvvvvv");
  SUPER_SECRET_APIKEY = "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";
} else {
  console.log("PRODDDDD");
  SUPER_SECRET_APIKEY = import.meta.env.VITE_SUPER_SECRET_APIKEY;
}

function GitCards() {
  const [data, setData] = useState({
    repository: {
      stargazerCount: 0,
      openedIssues: { totalCount: 0 },
      forks: { totalCount: 0 },
      contributors: { totalCount: 0 },
      goodFirstIssues: { totalCount: 0 },
      backendIssues: { totalCount: 0 },
      frontEndIssues: { totalCount: 0 },
      microcontrollersIssues: { totalCount: 0 },
      goodFirstIssueLabel: { color: "", description: "" },
      MicrocontrollersLabel: {
        color: "",
        description: "",
      },
      FrontendLabel: { color: "", description: "" },
      BackendLabel: { color: "", description: "" },
    },
  });
  const toRGB = (color) =>
    Object.values(tinycolor(color).toRgb()).slice(0, -1).join(" ");
  const invertRgb = (color) =>
    tinycolor(color).getLuminance() > 0.179 ? "000 000 000" : "255 255 255";
  useEffect(() => {
    const document = gql`
      query ($last: Int, $owner: String!, $repoName: String!) {
        repository(owner: $owner, name: $repoName) {
          stargazerCount

          openedIssues: issues(last: $last, states: OPEN) {
            totalCount
          }

          goodFirstIssues: issues(last: $last, labels: ["good first issue"]) {
            totalCount
          }

          backendIssues: issues(last: $last, labels: ["Backend"]) {
            totalCount
          }

          frontEndIssues: issues(last: $last, labels: ["Frontend"]) {
            totalCount
          }

          microcontrollersIssues: issues(
            last: $last
            labels: ["Microcontrollers"]
          ) {
            totalCount
          }
          goodFirstIssueLabel: label(name: "good first issue") {
            color
            description
          }
          MicrocontrollersLabel: label(name: "Microcontrollers") {
            color
            description
          }
          FrontendLabel: label(name: "Frontend") {
            color
            description
          }
          BackendLabel: label(name: "Backend") {
            color
            description
          }
          forks: forks(last: $last) {
            totalCount
          }
          contributors: collaborators {
            totalCount
          }
        }
      }
    `;
    const url = "https://api.github.com/graphql";
    const variables = {
      last: 100,
      owner: "ahmadghoniem",
      repoName: "serialSocket",
    };
    const requestHeaders = {
      "Content-Type": "application/json",
      Authorization: `bearer ${SUPER_SECRET_APIKEY}`,
    };
    request({
      url,
      document,
      variables,
      requestHeaders,
    }).then((data) => {
      console.log(data);
      setData(data);
    });
  }, []);
  // buckleUp destrcturing..

  const {
    stargazerCount,
    openedIssues: { totalCount: openedIssuesCount },
    forks: { totalCount: forksCount },
    contributors: { totalCount: contributorsCount },
    goodFirstIssues: { totalCount: goodFirstIssuesCount },
    backendIssues: { totalCount: backendIssuesCount },
    frontEndIssues: { totalCount: frontEndIssuesCount },
    microcontrollersIssues: { totalCount: microcontrollersIssuesCount },
    goodFirstIssueLabel: {
      color: goodFirstIssueIssueLabelColor,
      description: goodFirstIssueLabelDesc,
    },
    MicrocontrollersLabel: {
      color: MicrocontrollersIssueLabelColor,
      description: MicrocontrollersLabelDesc,
    },
    FrontendLabel: {
      color: FrontendIssueLabelColor,
      description: FrontendLabelDesc,
    },
    BackendLabel: {
      color: BackendIssueLabelColor,
      description: BackendLabelDesc,
    },
  } = data.repository;

  document.documentElement.style.setProperty(
    "--good-first-issue-label-color",
    toRGB(goodFirstIssueIssueLabelColor),
  );
  document.documentElement.style.setProperty(
    "--frontend-issue-label-color",
    toRGB(FrontendIssueLabelColor),
  );
  document.documentElement.style.setProperty(
    "--backend-issue-label-color",
    toRGB(BackendIssueLabelColor),
  );
  document.documentElement.style.setProperty(
    "--microcontrollers-issue-label-color",
    toRGB(MicrocontrollersIssueLabelColor),
  );
  // for inverted colors
  document.documentElement.style.setProperty(
    "--gfx",
    invertRgb(goodFirstIssueIssueLabelColor),
  );
  document.documentElement.style.setProperty(
    "--fex",
    invertRgb(FrontendIssueLabelColor),
  );
  document.documentElement.style.setProperty(
    "--bex",
    invertRgb(BackendIssueLabelColor),
  );
  document.documentElement.style.setProperty(
    "--mcx",
    invertRgb(MicrocontrollersIssueLabelColor),
  );

  return (
    <div className=" p-4">
      <p>
        <Repo className="inline" />
        SerialSocket
      </p>
      <p>
        <Star className="inline" /> {stargazerCount} stargazers✨
      </p>
      <p>
        <Contributors className="inline" /> {contributorsCount}
        contributorsCount
      </p>

      <p>
        <Fork className="inline" /> {forksCount} forksCount
      </p>
      <p>
        <Issue className="inline" /> {openedIssuesCount} openedIssuesCount
      </p>

      <p>
        {goodFirstIssuesCount}x
        <button className="border-goodFirstIssue-border bg-goodFirstIssue text-goodFirstIssue-foreground rounded-full border px-6 py-3 font-bold transition-colors duration-500">
          <span className="text-goodFirstIssue-foreground">
            Good first issue
          </span>
        </button>
      </p>
      <p>
        {backendIssuesCount}x
        <button className="border-backend-border bg-backend text-backend-foreground rounded-full border px-6 py-3 font-bold transition-colors duration-500">
          <span className="text-backend-foreground">Backend</span>
        </button>
      </p>
      <p>
        {frontEndIssuesCount}x
        <button className="border-frontend-border bg-frontend text-frontend-foreground rounded-full border px-6 py-3 font-bold transition-colors duration-500">
          <span className="text-frontend-foreground">Frontend</span>
        </button>
      </p>
      <p>
        {microcontrollersIssuesCount}x
        <button className="border-microcontrollers-border bg-microcontrollers text-microcontrollers-foreground rounded-full border px-6 py-3 font-bold transition-colors duration-500">
          <span className="text-microcontrollers-foreground">
            Microcontroller
          </span>
        </button>
      </p>

      <button
        className="relative z-0 after:absolute after:-inset-x-2 after:-bottom-[0.125rem] after:-z-10 after:h-3 after:bg-[image:url('./assets/underline.svg')] after:bg-no-repeat"
        onClick={() => document.documentElement.classList.toggle("dark")}
      >
        toggle dark mode
      </button>
    </div>
  );
}

export default GitCards;
