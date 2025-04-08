type PortfolioDetailParams = { params: { id: string } };

const page = ({ params: { id } }: PortfolioDetailParams) => {
  return <div>{id}</div>;
};

export default page;
