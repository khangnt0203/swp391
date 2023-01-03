export const setToken = (token) => {
  sessionStorage.setItem("token", token);
};

export const getToken = () => {
  return sessionStorage.getItem("token");
};

export const setUser = (user) => {
  sessionStorage.setItem("user", user);
};

export const getUser = () => {
  return sessionStorage.getItem("user");
};

export const removeToken = () => {
  return sessionStorage.removeItem("token");
};
export const setEmailActive = (emailActive) => {
  sessionStorage.setItem("emailActive", emailActive);
};
export const getEmailActive = () => {
  return sessionStorage.getItem("emailActive");
};
export const setJobPost = (jobPost) => {
  sessionStorage.setItem("jobPost", jobPost);
};
export const getJobPost = () => {
  return sessionStorage.getItem("jobPost");
};
export const isLogin = () => {
  if (getToken() === null) {
    return false;
  }
  return true;
};

export const SetTermJob = (terms) => {
  return sessionStorage.setItem("JobTerm", terms);
};

export const GetTermJob = () => {
  return sessionStorage.getItem("JobTerm");
};

export const SetTitleJob = (title) => {
  return sessionStorage.setItem("TitleJob", title);
};

export const getTitleJob = () => {
  return sessionStorage.getItem("TitleJob");
};

export const SetScopeJob = (scope) => {
  return sessionStorage.setItem("ScopeJob", scope);
};

export const getScopeJob = () => {
  return sessionStorage.getItem("ScopeJob");
};

export const SetExperienceJob = (experience) => {
  return sessionStorage.setItem("ExpJob", experience);
};

export const getExperienceJob = () => {
  return sessionStorage.getItem("ExpJob");
};

export const SetPayType = (payType) => {
  return sessionStorage.setItem("PayType", payType);
};

export const getPayType = () => {
  return sessionStorage.getItem("PayType");
};

export const SetJobBudget = (budget) => {
  return sessionStorage.setItem("Budget", budget);
};

export const getJobBudget = () => {
  return sessionStorage.getItem("Budget");
};

export const SetMinBudget = (minBudget) => {
  return sessionStorage.setItem("MinBudget", minBudget);
};
export const getMinBudget = () => {
  return sessionStorage.getItem("MinBudget");
};

export const SetMaxBudget = (maxBudget) => {
  return sessionStorage.setItem("MaxBudget", maxBudget);
};

export const getMaxBudget = () => {
  return sessionStorage.getItem("MaxBudget");
};

export const SetSkillsId = (skill) => {
  return sessionStorage.setItem("SkillID", JSON.stringify(skill));
};

export const getSkillsId = () => {
  return JSON.parse(sessionStorage.getItem("SkillID"));
};

export const SetSkills = (listSkill) => {
  return sessionStorage.setItem("ListSkill", JSON.stringify(listSkill));
};

export const getSkills = () => {
  return JSON.parse(sessionStorage.getItem("ListSkill"));
};

export const SetCategoryId = (category) => {
  return sessionStorage.setItem("Category", category);
};

export const getCategoryId = () => {
  return sessionStorage.getItem("Category");
};

export const SetCategory = (listCategory) => {
  return sessionStorage.setItem("List Category", JSON.stringify(listCategory));
};

export const getCategory = () => {
  return JSON.parse(sessionStorage.getItem("List Category"));
};

export const SetDescribeJob = (describeJob) => {
  return sessionStorage.setItem("Describe", describeJob);
};

export const getDescribeJob = () => {
  return sessionStorage.getItem("Describe");
};

export const SetFileUrl = (fileUrl) => {
  return sessionStorage.setItem("FileUrl", fileUrl);
};

export const getFileUrl = () => {
  return sessionStorage.getItem("FileUrl");
};

export const setJobId = (jobId) => {
  return sessionStorage.setItem("JobId", jobId);
};

export const getJobId = () => {
  return sessionStorage.getItem("JobId");
};

export const SetTimeJob = (timeJob) => {
  return sessionStorage.setItem("TimeJob ", JSON.stringify(timeJob));
};

export const SetStartTime = (startTime) => {
  return sessionStorage.setItem("StartTime", JSON.stringify(startTime));
};

export const getStartTime = () => {
  return JSON.parse(sessionStorage.getItem("StartTime"));
};

export const SetEndTime = (endTime) => {
  return sessionStorage.setItem("EndTime", JSON.stringify(endTime));
};

export const getEndTime = () => {
  return JSON.parse(sessionStorage.getItem("EndTime"));
};

export const getTimeJob = () => {
  return JSON.parse( sessionStorage.getItem("TimeJob") );
}

export const SetStatus = (status) => {
  return sessionStorage.setItem("Status", status);
}

export const GetStatus = () => {
  return sessionStorage.getItem("Status");
}




