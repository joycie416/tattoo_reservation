import EditPortfolioButton from "@/components/portfolio/EditPortfolioButton";
import PortfolioList from "@/components/portfolio/PortfolioList";
import PageHeaderWithButton from "@/components/shared/PageHeaderWithButton";

const PortfolioPage = () => {
  return (
    <>
      <PageHeaderWithButton title="포트폴리오" backTo="/">
        <EditPortfolioButton />
      </PageHeaderWithButton>
      <div className="container min-h-[calc(100vh-var(--header-height))] p-0">
        <PortfolioList />
      </div>
    </>
  );
};

export default PortfolioPage;
