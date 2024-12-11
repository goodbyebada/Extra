import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { JobPost } from "@api/interface";
import { ResponseStatus } from "@api/interface";
import { dateYM, QuryTypesWithPage } from "@api/interface";
import { ObjectType } from "@api/interface";
import jobPostAPIForCom from "@api/jobPostAPIForCom";

// 상태의 타입 정의

const defaultJobPost: JobPost = {
  id: -1,
  title: "",
  gatheringLocation: "",
  gatheringTime: "",
  imageUrl: "",
  status: false,
  hourPay: -1,
  category: "",
  companyName: "",
  scheduleIdList: [],
  calenderList: [],
  roleIdList: [],
  roleNameList: [],
  costumeList: [], // 빈 배열을 감싼 배열로 초기화
  sexList: [],
  roleAgeList: [], // 빈 배열을 감싼 배열로 초기화
  limitPersonnelList: [],
  currentPersonnelList: [],
  seasonList: [],
  tattooList: [],
};

function transformAndSortDates(input: ObjectType): ObjectType {
  const transformedObject: ObjectType = {};

  for (const date in input) {
    const day = date.split("-")[2]; // "YYYY-MM-DD"에서 "DD" 추출
    transformedObject[day] = input[date];
  }

  const sortedKeys = Object.keys(transformedObject).sort(
    (a, b) => Number(a) - Number(b),
  );

  const sortedObject: ObjectType = {};
  for (const key of sortedKeys) {
    sortedObject[key] = transformedObject[key];
  }

  return sortedObject;
}

export interface JobPostState {
  jobPostByCalenderForCom: {
    status: string;
    data: ObjectType;
    error: string;
  };
  jobPostByListForCom: {
    status: string;
    data: JobPost[];
    error: string;
  };
  jobPostItem: {
    status: string;
    data: JobPost;
    error: string;
  };
}

const initdata: ObjectType = {
  "-1": [],
};

// 초기 상태
const initialState: JobPostState = {
  jobPostByCalenderForCom: { status: "", data: initdata, error: "" },
  jobPostByListForCom: { status: "", data: [defaultJobPost], error: "" },
  jobPostItem: { status: "", data: defaultJobPost, error: "" },
};

/**
 * 캘린더에서 JobPost를 가져온다.
 */
export const fetchJobPostByCalenderForCom = createAsyncThunk(
  "companyJobpost/fetchJobPostByCalenderForCom",
  async ({ year, month }: dateYM) => {
    const data = await jobPostAPIForCom.getAllJobPostByCalender(year, month);
    console.log("fetchJobPostByCalenderForCom");
    console.log(data);
    return data;
  },
);

/**
 * 리스트로보기용 JobPost를 가져온다.
 */
export const fetchJobPostByListForCom = createAsyncThunk(
  "companyJobpost/fetchJobPostByListForCom",
  async ({ year, month, pageNum }: QuryTypesWithPage) => {
    const data = await jobPostAPIForCom.getAllJobPostByList(
      year,
      month,
      pageNum,
    );
    console.log("리스트라능");
    console.log(data);

    return data;
  },
);
// 특정 공고를 가져오는 GET 요청 (id 필요)
export const fetchJobPostByIdForCom = createAsyncThunk<JobPost, number>(
  "companyJobpost/fetchById",
  async (id: number) => {
    const data = await jobPostAPIForCom.getJobPostById(id);
    return data;
  },
);

const companyJobpostSlice = createSlice({
  name: "companyJobpost",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobPostByCalenderForCom.pending, (state) => {
        state.jobPostByCalenderForCom.status = ResponseStatus.loading;
        state.jobPostByCalenderForCom.data = initdata;
        state.jobPostByCalenderForCom.error = "";
      })
      .addCase(fetchJobPostByCalenderForCom.fulfilled, (state, action) => {
        state.jobPostByCalenderForCom.status = ResponseStatus.fullfilled;

        state.jobPostByCalenderForCom.data = transformAndSortDates(
          action.payload,
        );

        state.jobPostByCalenderForCom.error = "";
      })
      .addCase(fetchJobPostByCalenderForCom.rejected, (state, action) => {
        state.jobPostByCalenderForCom.status = ResponseStatus.rejected;
        state.jobPostByCalenderForCom.data = initdata;
        // action.error.message는 API에서 전달된 에러 메시지를 포함
        state.jobPostByCalenderForCom.error =
          action.error.message || "Failed to fetch all job posts";
      });

    /**
     * [{}]값이 하나만 오고 있다.
     */
    builder
      .addCase(fetchJobPostByListForCom.pending, (state) => {
        state.jobPostByListForCom.status = ResponseStatus.loading;
        state.jobPostByListForCom.error = "";
      })
      .addCase(fetchJobPostByListForCom.fulfilled, (state, action) => {
        state.jobPostByListForCom.status = ResponseStatus.fullfilled;
        state.jobPostByListForCom.data = action.payload;
        state.jobPostByListForCom.error = "";
      })
      .addCase(fetchJobPostByListForCom.rejected, (state, action) => {
        state.jobPostByListForCom.status = ResponseStatus.rejected;

        // action.error.message는 API에서 전달된 에러 메시지를 포함
        state.jobPostByListForCom.error =
          action.error.message || "Failed to fetch all job posts";
      });

    builder
      .addCase(fetchJobPostByIdForCom.pending, (state) => {
        state.jobPostItem.status = ResponseStatus.loading;

        // 초기화
        state.jobPostItem.data = defaultJobPost;
      })
      .addCase(fetchJobPostByIdForCom.fulfilled, (state, action) => {
        state.jobPostItem.status = ResponseStatus.fullfilled;
        state.jobPostItem.data = action.payload;
      })

      .addCase(fetchJobPostByIdForCom.rejected, (state, action) => {
        state.jobPostItem.status = ResponseStatus.rejected;
        // 초기화
        state.jobPostItem.data = defaultJobPost;

        state.jobPostItem.error =
          action.error.message ||
          `Failed to fetch job post with id ${action.meta.arg}`;
      });
  },
});

export default companyJobpostSlice.reducer;
