import PortfolioDetail from "@/components/portfolio/PortfolioDetail";

type PortfolioDetailParams = { params: { id: string } };

const PortfolioDetailPage = ({ params: { id } }: PortfolioDetailParams) => {
  return (
    <div className="container p-0 bg-gray-100">
      <PortfolioDetail portfolioId={id} />
    </div>
  );
};

export default PortfolioDetailPage;
