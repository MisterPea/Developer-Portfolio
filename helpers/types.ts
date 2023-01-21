export type Params = {
  params: {
    project: string;
  };
};

type Links = {
  title: string;
  url: string;
  icon: string;
};

export interface ProjectDataProps {
  title: string;
  subTitle: string;
  links: Links[];
  tools: string;
  ideaFeatures: string;
  featuresInclude: string[];
  challenges: string[];
}