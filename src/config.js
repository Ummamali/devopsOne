// This is the main configuration file

const cfg = {
  backend: {
    host: "http://localhost:5500",
  },
};

cfg.backend.routes = {
  allContributors: cfg.backend.host + "/allContributors",
  addContributor: cfg.backend.host + "/addContributor",
};

export const backend = cfg.backend;
export default cfg;
