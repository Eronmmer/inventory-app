import styled, { css } from "styled-components";

// Headers
export const HeaderOne = styled.h1`
  text-align: center;
  font-size: 2.5rem;

  ${props =>
    props.home &&
    css`
      /* margin-top: 10rem !important; */
      font-size: 3rem;
      margin-left: auto;
      margin-right: auto;
      margin-top: 0;
      max-width: 650px;
    `}
`;

export const HeaderTwo = styled.h2`
  font-size: 2rem;
  margin-top: 2rem;

  ${props =>
    props.home &&
    css`
      text-align: center;

      &:hover {
        /* background: lighten(#dc3545, 5%); */
      }
    `}
`;

// Features Click Paragraph(Home Page)
export const FeatureClickParagraph = styled.p`
  ${props =>
    props.clicked &&
    css`
      color: #2b2e94;
    `}
  img {
    display: none;
    ${props =>
      props.clicked &&
      css`
        display: inline;
      `}
  }
`;

// Features Opened Content(Home Page)
export const FeatureOpenedContent = styled.div`
  display: none;
  transition: ease all 1s;
  opacity: 0;
  ${props =>
    props.showContent &&
    css`
      display: block;
      opacity: 1;
    `}
`;
