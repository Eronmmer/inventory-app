import styled, { css } from "styled-components";

const NavbarComponent = styled.nav`
  background: #3672a4;
  padding: 0.45rem;
  color: white;
  box-shadow: 0px 6px 5px 0px rgba(128, 128, 128, 1);
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 2rem;
    padding-right: 2rem;

    .left {
      flex-basis: 30%;

      .brand-name {
        a {
          font-size: 2.2rem;
          font-weight: 500;
          position: relative;
          display: flex;
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
      flex-basis: 30%;
      justify-content: space-around;

      .about,
      .login,
      .register {
        font-size: 1.1rem;
        transition: ease 0.4s;
        /* backface-visibility: inherit; */

        &:hover {
          transform: scale(1.045);
        }
      }

      .register a {
        border: 1px solid #ffffff6e;
        border-radius: 1.3rem;
        padding: 0.5rem 1.7rem;
        font-weight: bold;
      }
    }
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`;
export default NavbarComponent;
