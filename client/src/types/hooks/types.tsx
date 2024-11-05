import { AuthorUserDataType } from "../Form/registration/Author/types";
import { ProjectDataType } from "../dashboard/Admin/types";
import { PaperSubmissionDataType } from "../dashboard/Author/types";

export type ProjectDataTypeWithIds = ProjectDataType & {
  id: string;
};

export type ProjectStateType = {
  projects: ProjectDataTypeWithIds[];
  loading: boolean;
  userDetails: Record<string, any>;
  setUserDetails: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  userType: string | null;
  setUserType: React.Dispatch<React.SetStateAction<string | null>>;
};

export type PaperSubmissionDataTypeWithIds = PaperSubmissionDataType & {
  id: string;
};


export type SubmittedPapersStateType = {
  submittedPapers: PaperSubmissionDataTypeWithIds[];
  loading: boolean;
};

export interface UserDataProps {
  userData: AuthorUserDataType;
  userDataLoading: boolean;
  userId: string | null; // Add userId property
}
