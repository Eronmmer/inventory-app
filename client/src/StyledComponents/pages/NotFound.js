import styled from "styled-components";

const NotFoundComponent = styled.div`
  padding: 5rem 2rem 0 2rem;
  max-width: 1100px;
  margin: auto;

  @media (max-width: 500px) {
    padding: 5rem 1rem 0 1rem;
  }

  h2 {
    text-align: center;
    padding: 0 2rem;
    margin-top: 4rem;
  }

  .not-found-btn-wrapper {
    display: flex;
  }

  .not-found-btn {
    text-decoration: none;
    margin: 0 auto;
    margin-top: 3.5rem;
    border-radius: 50px;
    padding: 0.8rem 5rem;
    background: #f86150;
    display: inline-block;
    margin-bottom: 5rem;
    text-align: center;
    cursor: pointer;
    border: none;
    font-size: 1.2rem !important;
    color: white;
    transition: ease 0.3s all;

    &:hover {
      transform: scale(1.03);
    }
  }
`;

export default NotFoundComponent;
