import AddPortfolioButton from "@/components/portfolio/AddPortfolioButton";
import PageHeaderWithButton from "@/components/shared/PageHeaderWithButton";
import React from "react";

const PortfolioPage = () => {
  return (
    <>
      <PageHeaderWithButton title="포트폴리오" backTo="/">
        <AddPortfolioButton />
      </PageHeaderWithButton>
      <div className="container">
        <p>포트폴리오 나열할 예정</p>
      </div>
    </>
  );
};

export default PortfolioPage;
