import React from 'react'
import Job from './Job';
import { useRouter } from 'next/router';
import Pagination from 'react-js-pagination';
import Filters from './layout/Filters';

const Home = ({ data }) => {

  const { jobs, count, resPerPage } = data;
  const router = useRouter();

  let { page = 1, keyword } = router.query;
  page = Number(page);

  let queryParams;
  if (typeof window !== "undefined") {
    queryParams = new URLSearchParams(window.location.search);
  }
  
  const handlePageClick = (currentPage) => {
    if (queryParams.has("page")) {
      queryParams.set("page", currentPage);
    } else {
      queryParams.append("page", currentPage);
    }

    router.push({
      search: queryParams.toString(),
    });
  };

  return (
     <div className="container container-fluid">
        <div className="row">
          <div className="col-xl-3 col-lg-4">
            <Filters/>
          </div>

          <div className="col-xl-9 col-lg-8 content-left-offset">
            <div className="my-5">
            <h4 className="page-title">
            {keyword ?  `
               ${jobs.length} Results for ${keyword}
              `: "Recent Jobs" }</h4>
              <a href="/stats">
                <button className="btn btn-secondary float-right stats_btn">
                  Get Topic stats
                </button>
              </a>
              <div className="d-block">
                <a href="/search">Go to Search</a>
              </div>
          </div>
          {
            jobs && jobs?.map((job) => (
              <Job job={job}/>
            ))
          }

          {resPerPage < count && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={page}
                itemsCountPerPage={resPerPage}
                totalItemsCount={count}
                onChange={handlePageClick}
                nextPageText={"Next"}
                prevPageText={"Prev"}
                firstPageText={"First"}
                lastPageText={"Last"}
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          )}
          </div>
        </div>
      </div>
  )
}

export default Home