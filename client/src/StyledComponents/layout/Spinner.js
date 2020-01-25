import styled, {keyframes} from "styled-components"

const loadKeyframe = keyframes`
 0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const SpinnerComponent = styled.div`
  margin: 60px auto;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: 1.1em solid #fff;
  border-right: 1.1em solid #fff;
  border-bottom: 1.1em solid #fff;
  border-left: 1.1em solid #777cff;
   -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: ${loadKeyframe} 1.1s infinite linear;
  animation: ${loadKeyframe} 1.1s infinite linear;

  &,
  &:after {
    border-radius: 50%;
    width: 10em;
    height: 10em;
  }
`;
export default SpinnerComponent

