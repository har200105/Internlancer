import React from 'react';
import axios from 'axios';
import Layout from '../../component/layout/Layout';
import JobDetails from '../../component/JobDetails';

const Job = ({ job, candidates, token }) => {
    return (
        <Layout>
            <JobDetails job={job} candidates={candidates} token={token}/>
        </Layout>
    );
}

export default Job;

export const getServerSideProps = async ({req, params }) => {
    try {
        
        const token = req.cookies.access || '';
        const response = await axios.get(`${process.env.API}/api/job/${params.id}`);
        const job = response.data.job;
        const candidates = response.data.candidates; 

        return {
            props: {
                job,
                candidates,
                token
            }
        }
        
    } catch (e) {
        return {
            props: {
                error:e.response.data.detail
            }
        }
    }
}
