import Loader from "../components/Loader/Loader";
import SearchPanel from "../components/SearchPanel/SearchPanel";

export default function TableDebtPage() {
    // return <Loader />;
      return (
    <div className="debt-page">
      <SearchPanel />
      <Loader />
    </div>
  );
}