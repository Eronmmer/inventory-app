import styled, { css, keyframes } from "styled-components";

const scaleAnimation = keyframes`
    50% {
      transform: scale(1.02);
    }

    100% {
      transform: scale(1);
    }
`;

const MainComponent = styled.main`
  .grey-para {
    color: rgb(109, 116, 132);
    text-align: center;
    font-size: 1.2rem;
    max-width: 760px;
    margin: 1rem auto;
    padding-left: 1rem;
    padding-right: 1rem;

    @media (max-width: 780px) {
      font-size: 1.14rem;
    }
  }

  max-width: 1100px;
  margin: auto;
  padding: 0 2rem;

  @media (max-width: 500px) {
    padding: 0 1rem;
  }

  .first-section {
    padding-top: 4rem;
    .triangle-icon {
      /* margin-top: -4rem; */
      font-size: 10rem;
      margin: 0 auto;
      text-align: center;
      color: black;

      @media (max-width: 500px) {
        font-size: 7rem;
        margin-top: 1rem;
      }
    }

    .box-paragraphs {
      display: flex;
      flex-wrap: wrap;
      margin-top: 3.5rem;
      margin-bottom: 2.5rem;

      p {
        box-shadow: 0 1px 14px rgba(0, 0, 0, 0.3), 0 12px 0 -5px #eee;
        border-radius: 5px;
        margin: 1rem auto;
        padding: 2.5rem 1.5rem;
        padding-bottom: 1.5rem;
        text-align: center;
        max-width: 560px;
        font-size: 1.2rem;
        font-weight: 500;

        @media (max-width: 780px) {
          font-size: 1.14rem;
        }
      }

      img {
        height: 10rem;
        display: block;
        margin: 0 auto;
        margin-bottom: 1rem;
        width: auto;
      }
    }
  }

  .features {
    .features-body {
      display: flex;
      align-items: center;
      justify-content: space-around;
      margin-top: 3rem;
      margin-bottom: 3rem;
      font-size: 1.17rem;

      @media (max-width: 750px) {
        flex-direction: column;
        margin-top: 1rem;
        margin-bottom: 0;
      }

      .opener {
        flex-basis: 23%;
        padding-right: 2.6rem;
        border-right: 1px solid #e0e2e6;
        /* color: #2b2e94; */
        font-weight: bold;
        font-size: 1.2rem;

        @media (max-width: 815px) {
          flex-grow: 1;
        }

        @media (max-width: 750px) {
          border: none;
          border-right: none;
          width: 80%;
          margin-bottom: 1.4rem;
          margin-right: auto;
          margin-left: auto;
          padding-right: 0;
        }

        p {
          margin-bottom: 0.5rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;

          @media (max-width: 750px) {
           justify-content: space-evenly;
           text-align: center;
          }

          .dropdown {
            transform: rotate(-90deg);
            width: 1.7rem;
            height: auto;
            filter: invert(15%) sepia(95%) saturate(2659%) hue-rotate(232deg)
              brightness(77%) contrast(87%);

            @media (max-width: 750px) {
              transform: rotate(0deg);
            }
          }
        }
      }

      .opener-content {
        flex-basis: 63%;
        font-size: 1.15rem;

        @media (max-width: 815px) {
          flex-grow: 1;
          padding-left: 1rem;
        }

        @media (max-width: 750px) {
          display: none;
        }

        h3 {
          font-size: 1.6rem;
          margin: 0;

          @media (max-width: 815px) {
            font-size: 1.3rem;

            & ~ p {
              margin-top: 0.35rem;
            }
          }
        }
      }
    }
  }

  .help-business {
    margin-bottom: 6rem;

    .get-started-wrapper {
      display: flex;
    }

    .get-started {
      display: inline-block;
      margin: 0 auto;
      margin-top: 3.5rem;
      border-radius: 50px;
      padding: 1rem 3rem;
      background: #f86150;
      color: white;
      font-size: 1.2rem;
      font-weight: 500;
      text-decoration: none;
      /* backface-visibility: hidden; */
      transition: ease-in-out transform 0.5s;
      animation: ${scaleAnimation} 1s ease-in-out infinite;

      @media (max-width: 500px) {
        margin-top: 1.5rem;
        padding: .7rem 3rem;
      }

      &:hover {
        animation: none;
      }
    }
  }
`;

export default MainComponent;
