import styled, { css } from "styled-components";

const MainComponent = styled.main`
  .grey-para {
    color: rgb(109, 116, 132);
    text-align: center;
    font-size: 1.2rem;
    max-width: 760px;
    margin: 1rem auto;
    padding-left: 1rem;
    padding-right: 1rem;
  }

  max-width: 1100px;
  margin: auto;
  padding: 0 2rem;

  .first-section {
    .triangle-icon {
      margin-top: -4rem;
      font-size: 10rem;
      margin: 0 auto;
      text-align: center;
      color: black;
    }

    .box-paragraphs {
      display: flex;
      flex-wrap: wrap;
      margin-top: 5rem;
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

      .opener {
        flex-basis: 23%;
        padding-right: 2.6rem;
        border-right: 1px solid #e0e2e6;
        /* color: #2b2e94; */
        font-weight: bold;
        font-size: 1.2rem;

        p {
          margin-bottom: 0.5rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;

          .dropdown {
            transform: rotate(-90deg);
            width: 1.7rem;
            height: auto;
            filter: invert(15%) sepia(95%) saturate(2659%) hue-rotate(232deg)
              brightness(77%) contrast(87%);
          }
        }
      }

      .opener-content {
        flex-basis: 63%;
        font-size: 1.15rem;

        h3 {
          font-size: 1.6rem;
          margin: 0;
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
      text-decoration: none;
      
    }
  }
`;

export default MainComponent;
