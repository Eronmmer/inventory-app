import styled, { css } from "styled-components";

const NavbarComponent = styled.nav`
  position: fixed;
  width: 100%;
  background: #3672a4;
  padding: 0.45rem;
  color: white;
  box-shadow: 0px 6px 5px 0px rgba(128, 128, 128, 1);

  @media screen and (max-width: 360px) {
    & ~ div {
      padding-top: 6rem;
    }
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 2rem;
    padding-right: 2rem;

    @media screen and (max-width: 500px) {
      padding-left: 1rem;
    }

    @media screen and (max-width: 360px) {
      flex-direction: column;
    }

    .left {
      flex-basis: 30%;

      @media screen and (max-width: 360px) {
        margin-bottom: 1rem;
      }

      .brand-name {
        a {
          font-size: 2.2rem;
          font-weight: 500;
          position: relative;
          align-items: center;
          font-weight: bold;
        }

        .triangle-icon {
          color: black;
        }

        .line-chart {
          height: 2rem;
          width: 2rem;
          /* margin-left: -.2rem; */
          filter: invert(86%) sepia(17%) saturate(1075%) hue-rotate(133deg)
            brightness(96%) contrast(96%);
        }
      }
    }

    .right {
      display: flex;
      flex-basis: 20%;
      justify-content: space-around;

      @media screen and (max-width: 1120px) {
        flex-basis: 30%;
        justify-content: space-between;
      }

      @media screen and (max-width: 780px) {
        flex-basis: 50%;
      }

      @media screen and (max-width: 400px) {
        flex-basis: 57%;
        justify-content: flex-end;
      }

      .about,
      .login,
      .register {
        font-size: 1.1rem;
        transition: ease 0.4s;

        ${props =>
          props.private &&
          css`
            display: none;
          `}
        &:hover {
          transform: scale(1.045);
        }
      }

      .logout,
      .settings {
        font-size: 1.1rem;
        transition: ease 0.4s;
        font-weight: bold;

        &:hover {
          transform: scale(1.045);
        }

        ${props =>
          props.public &&
          css`
            display: none;
          `}
      }

      .register a {
        border: 1px solid #ffffff6e;
        border-radius: 1.3rem;
        padding: 0.5rem 1.7rem;
        font-weight: bold;

        @media screen and (max-width: 500px) {
          border: none;
        }
      }
    }
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`;
export default NavbarComponent;
