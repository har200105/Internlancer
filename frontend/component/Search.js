import React, { useState } from 'react';
import { useRouter } from 'next/router';

const Search = () => {

  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');

  const router = useRouter();

    const submitHandler = (e) => {
      e.preventDefault();
      
      if (keyword) {
        let searchQuery = `/?keyword=${keyword}`;
        if (location) {
          searchQuery = searchQuery.concat(`&location=${location}`);
        }
        router.push(searchQuery);
      }

      if (location) {
        let searchQuery = `/?location=${location}`;
        router.push(searchQuery);
      }
     
      else {
        router.push('/');
      }

    }

  return (
   <div className="modalMask">
      <div className="modalWrapper">
        <div className="right">
          <div className="rightContentWrapper">
            <div className="headerWrapper">
              <h2> SEARCH</h2>
            </div>
            <form className="form">
              <div className="inputWrapper">
                <div className="inputBox">
                  <i aria-hidden className="fas fa-search"></i>
                  <input
                    type="text"
                    placeholder="Enter Your Keyword"
                    value={keyword}
                    required
                    onChange={(e)=>setKeyword(e.target.value)}
                  />
                </div>
                <div className="inputBox">
                  <i aria-hidden className="fas fa-industry"></i>
                  <input
                    type="text"
                    placeholder="Enter City, State ..."
                    value={location}
                    onChange={(e)=>setLocation(e.target.value)}
                  />
                </div>
              </div>
              <div className="searchButtonWrapper">
                <button type="submit" className="searchButton" onClick={submitHandler}>
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search