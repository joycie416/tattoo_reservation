import AddPortfolioForm from "@/components/portfolio/AddPortfolioForm";
import PageHeader from "@/components/shared/PageHeader";

const PortfolioAddPage = ({
  searchParams,
}: {
  searchParams: { id?: string; modify?: string };
}) => {
  return (
    <>
      <PageHeader title="포트폴리오 등록" backTo="/portfolio" />
      <div className="container min-h-[calc(100vh-var(--header-height))]">
        <AddPortfolioForm searchParams={searchParams} />
      </div>
    </>
  );
};

export default PortfolioAddPage;
