import React, { useState, useEffect } from "react";
// import { useParams } from 'react-router-dom';
import SearchForm from "./SearchForm";
import JobCardList from "./JobCardList";
import JoblyApi from "./api";

/** DESCRIPTION
*Jobs uses useState and useEffect to make an AJAX request for all the jobs and
saves them in state then passes the jobs to JobCardList and passes the function
 to change the state of jobs to the SearchForm.

* Props: none
*
* State:
* - object {isLoading: bool, jobs: []}
*
* RoutesList -> Jobs -> {SearchForm, JobCardList}
*/
function Jobs() {
  const [allJobs, setAllJobs] = useState({
    isLoading: true,
    jobs: [],
  });

  const [errors, setErrors] = useState([]);


  /** Gets all the jobs via AJAX request then saves them to state*/
  useEffect(() => {
    async function getAllJobs() {
      // jobs > res
      const jobs = await JoblyApi.getJobs();
      setAllJobs({
        isLoading: false,
        jobs: jobs,
      });
    }
    getAllJobs();
  }, []);

  /**  submitSearch receives a string and makes an AJAX request via our JoblyApi
   *  class and saves the results to state or alerts with error.*/
  async function submitSearch(params) {
    console.log("params in submitSearch", params);
    try {
      // jobs > res
      const jobs = await JoblyApi.getJobs(params);
      setAllJobs({
        isLoading: false,
        jobs: jobs,
      });
    } catch (err) {
      setErrors({
        hasError: true,
        errorMessage: err.message,
      });
    }
  }

  //TODO: loading screen component
  if (allJobs.isLoading) return <h1> Loading...</h1>;
  //TODO: error screen component
  if (errors.errorMessage) return <h1>error: {errors.errorMessage}</h1>;

  return (
    <div>
      <div>
        <SearchForm submitSearch={submitSearch} />
        <JobCardList jobs={allJobs.jobs} />
      </div>
    </div>
  );
}

export default Jobs;
