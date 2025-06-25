import { actionTypes } from "./loginActionTypes";

interface inputFieldType {
  value: string | undefined;
  isChecked: boolean;
}
interface loggedInType {
  value: boolean;
}
interface number_of_failed_trialsType {
  value: number;
}
interface errorsType {
  isExist: boolean;
  value: string | "";
}
export interface initialStateType {
  email: inputFieldType;
  password: inputFieldType;
  loggedIn: loggedInType;
  number_of_failed_trials: number_of_failed_trialsType;
  errors: errorsType;
}
export interface ActionType {
  type: string;
  payload: ActionPayloadType;
}
interface ActionPayloadType {
  email: string | undefined;
  password: string | undefined;
}

export const getInitialState = (): initialStateType => {
  let failedTrials = 0;
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("number_of_failed_trials");
    if (stored) failedTrials = Number(stored);
  }

  return {
    email: {
      value: "",
      isChecked: false,
    },
    password: {
      value: "",
      isChecked: false,
    },
    loggedIn: {
      value: false,
    },
    number_of_failed_trials: {
      value: failedTrials,
    },
    errors: {
      isExist: false,
      value: "",
    },
  };
};

const loginReducer = (
  state: initialStateType,
  action: ActionType
): initialStateType => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.CHECKED_CREDIENTIALS_NOT_EMPTY:
      return {
        ...state,
        email: { value: "", isChecked: false },
        password: { value: "", isChecked: false },
        number_of_failed_trials: {
          value: state.number_of_failed_trials.value + 1,
        },
        loggedIn: { value: false },
        errors: {
          isExist: true,
          value: "Your login failed, please check your credentials and try again",
        },
      };

    case actionTypes.ERROR_CHECK_EMAIL:
      return {
        ...state,
        email: { value: "", isChecked: false },
        number_of_failed_trials: {
          value: state.number_of_failed_trials.value + 1,
        },
        loggedIn: { value: false },
        errors: {
          isExist: true,
          value: "User not found",
        },
      };

    case actionTypes.ERROR_CHECK_PASSWORD:
      return {
        ...state,
        email: { value: "", isChecked: false },
        password: { value: "", isChecked: false },
        number_of_failed_trials: {
          value: state.number_of_failed_trials.value + 1,
        },
        loggedIn: { value: false },
        errors: {
          isExist: true,
          value:
            "The username and password did not match a user. Please check your credentials and try again.",
        },
      };

    case actionTypes.CHECKED_PASSWORD:
      return {
        ...state,
        email: { value: payload.email, isChecked: true },
        password: { value: payload.password, isChecked: true },
        loggedIn: { value: true },
        errors: { isExist: false, value: "" },
      };

    case actionTypes.RESET_LOGIN_FORM:
      return getInitialState();

    default:
      return state;
  }
};

export default loginReducer;
