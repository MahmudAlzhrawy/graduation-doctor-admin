"use client";
import { BiError } from "react-icons/bi";
import styled, { keyframes } from "styled-components";
import { slideInLeft, fadeOutRight } from "react-animations";
export enum stage {
  first = "first",
  second = "second",
}
type Props = {
  ErrorMessageShowed: boolean;
  errorMessage: string;
  stageAnimations: stage.first | stage.second;
};
// Create a styled component for the slide-in animation
const SlideIn = styled.div`
  animation: 1s ${keyframes`${slideInLeft}`} ease-in-out;
`;

const FadeOut = styled.div`
  animation: 1s ${keyframes`${fadeOutRight}`} ease-in-out;
`;
const ErrorMessageForLoginPage = (props: Props) => {
  console.log("render ErrorMessageForLoginPage");
  if (props.ErrorMessageShowed && props.stageAnimations === stage.first) {
    return (
      <SlideIn>
        <div
          className={
            "bg-red-500 flex flex-nowrap w-[450px] h-[80px] pt-2 pb-2 rounded-md"
          }
        >
          <div className="flex justify-center items-center h-full">
            <BiError className="text-6xl text-white inline" />
          </div>
          <div className="flex justify-center items-center w-[80%] mx-auto h-full text-center">
            <span className="text-base text-white font-sans font-base">
              {props.errorMessage}!!
            </span>
          </div>
        </div>
      </SlideIn>
    );
  } else if (
    props.ErrorMessageShowed &&
    props.stageAnimations === stage.second
  ) {
    return (
      <FadeOut>
        <div
          data-twe-animation-start="manually"
          className="bg-red-500 flex flex-nowrap w-[450px] h-[80px] pt-2 pb-2 rounded-md"
        >
          <div className="flex justify-center items-center h-full">
            <BiError className="text-6xl text-white inline" />
          </div>
          <div className="flex justify-center items-center w-[80%] mx-auto h-full text-center">
            <span className="text-base text-white font-sans font-base">
              {props.errorMessage}!!
            </span>
          </div>
        </div>
      </FadeOut>
    );
  }
};
export default ErrorMessageForLoginPage;
