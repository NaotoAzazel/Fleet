import { Helmet } from "react-helmet";
import ErrorCard from "../cards/ErrorCard";

function PageNotFound() {
  return (
    <main className="bg-background">
      <Helmet>
        <title>Страница не найдена</title>
      </Helmet>
      <div className="text-white min-h-screen relative flex items-center container">
        <ErrorCard />
      </div>
    </main>
  )
}

export default PageNotFound