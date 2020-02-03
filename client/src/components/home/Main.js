import React, { useEffect, useState, createRef } from "react";
import MainComponent from "../../StyledComponents/home/Main";
import { HeaderOne, HeaderTwo } from "../../StyledComponents/utility";
import stock from "../layout/svgs/stockLevel.svg";
import sales from "../layout/svgs/sales.svg";
import history from "../layout/svgs/history.svg";
import Footer from "./Footer";
import dropdown from "../layout/svgs/dropdown.svg";
import { Link } from "react-router-dom"
import { FeatureClickParagraph, FeatureOpenedContent } from "../../StyledComponents/utility";

const Main = () => {
  const [currentOpener, setCurrentOpener] = useState("first");

  const showFeatureBool = position => {
    return position === currentOpener;
  };

  const showOpener = position => {
    setCurrentOpener(position);
  };

  return (
    <MainComponent>
      <section className="first-section">
        <div className="triangle-icon">▲</div>
        <HeaderOne home className="main-header">
          Manage your inventory better with Fotiá
        </HeaderOne>
        <p className="grey-para">
          Fotiá is a web-based and easy-to-use inventory management software
          that takes care of inventory, purchases and sales built specifically
          for Wholesalers, Distributors and even Retailers.
        </p>
        <div className="box-paragraphs">
          <p className="first-para">
            <img src={stock} alt="stock levels" />
            Keep your stock levels in check. Set better selling price with
            deeper analysis.
          </p>
          <p className="second-para">
            <img src={sales} alt="sale" />
            Customer and Product information at your fingertips. Generate sales
            and quotation on the go.
          </p>
          <p className="third-para">
            <img src={history} alt="history" />
            Know your every historical company data when you need it with a few
            clicks.
          </p>
        </div>
      </section>
      <section className="features">
        <HeaderTwo home className="features-header">
          Features
        </HeaderTwo>
        <p className="grey-para">
          Numerous features make it possible to customize the system in
          accordance with all your needs and still get the best out of it.
        </p>

        <div className="features-body">
          <div className="opener">
            <FeatureClickParagraph
              clicked={showFeatureBool("first")}
              onClick={() => showOpener("first")}
            >
              Management{" "}
              <img className="dropdown" src={dropdown} alt="arrow icon" />
            </FeatureClickParagraph>
            <FeatureOpenedContent
              mobileOpenerContent
              showContent={showFeatureBool("first")}
            >
              <h3>Manage your stocks</h3>
              <p>
                is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book. It has survived
                not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged
              </p>
            </FeatureOpenedContent>

            <FeatureClickParagraph
              clicked={showFeatureBool("second")}
              onClick={() => showOpener("second")}
            >
              Organization{" "}
              <img className="dropdown" src={dropdown} alt="arrow icon" />
            </FeatureClickParagraph>
            <FeatureOpenedContent
              mobileOpenerContent
              showContent={showFeatureBool("second")}
            >
              <h3>Organize blah blah</h3>
              <p>
                is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book. It has survived
                not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged
              </p>
            </FeatureOpenedContent>

            <FeatureClickParagraph
              clicked={showFeatureBool("third")}
              onClick={() => showOpener("third")}
            >
              Plan for the future{" "}
              <img className="dropdown" src={dropdown} alt="arrow icon" />
            </FeatureClickParagraph>

            <FeatureOpenedContent
              mobileOpenerContent
              showContent={showFeatureBool("third")}
            >
              <h3>Plan blah blah</h3>
              <p>
                is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book. It has survived
                not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged
              </p>
            </FeatureOpenedContent>

            <FeatureClickParagraph
              clicked={showFeatureBool("fourth")}
              onClick={() => showOpener("fourth")}
            >
              Real time analytics{" "}
              <img className="dropdown" src={dropdown} alt="arrow icon" />
            </FeatureClickParagraph>
            <FeatureOpenedContent
              mobileOpenerContent
              showContent={showFeatureBool("fourth")}
            >
              <h3>Analytics blah blah</h3>
              <p>
                is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book. It has survived
                not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged
              </p>
            </FeatureOpenedContent>
          </div>
          <div className="opener-content">
            <FeatureOpenedContent showContent={showFeatureBool("first")}>
              <h3>Manage your stocks</h3>
              <p>
                is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book. It has survived
                not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged
              </p>
            </FeatureOpenedContent>
            <FeatureOpenedContent showContent={showFeatureBool("second")}>
              <h3>Organize blah blah</h3>
              <p>
                is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book. It has survived
                not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged
              </p>
            </FeatureOpenedContent>
            <FeatureOpenedContent showContent={showFeatureBool("third")}>
              <h3>Plan blah blah</h3>
              <p>
                is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book. It has survived
                not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged
              </p>
            </FeatureOpenedContent>
            <FeatureOpenedContent showContent={showFeatureBool("fourth")}>
              <h3>Analytics blah blah</h3>
              <p>
                is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book. It has survived
                not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged
              </p>
            </FeatureOpenedContent>
          </div>
        </div>
      </section>
      <section className="help-business">
        <HeaderTwo home>Let us help your business grow</HeaderTwo>

        <p className="grey-para">
          Haven developed smart solutions for numerous types of organizations,
          we know what matters most.
        </p>

        <div className="get-started-wrapper">
          <Link to="/register" className="get-started">
            Get started today
          </Link>
        </div>
      </section>
      <Footer />
    </MainComponent>
  );
};

export default Main;
