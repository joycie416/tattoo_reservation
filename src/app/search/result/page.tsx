import SearchResultsList from "@/components/search/SearchResultsList";
import PageHeader from "@/components/shared/PageHeader";

const SearchResultPage = () => {
  return (
    <>
      <PageHeader title="내 예약 확인" backTo="/search" />
      <div className="container min-h-[calc(100vh-59px)] px-0">
        <SearchResultsList />
      </div>
    </>
  );
};

export default SearchResultPage;
