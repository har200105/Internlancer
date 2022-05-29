import axios from 'axios';
import Head from 'next/head'
import Image from 'next/image'
import Home from '../component/Home';
import Layout from '../component/layout/Layout'
import styles from '../styles/Home.module.css'

export default function Main({ data }) {
  console.log(data);
  return (
    <Layout>
      <Home data={data}/>
    </Layout>
  );
}

export const getServerSideProps = async ({ query }) => {

  console.log(query);
  
  const jobType = query.jobType || "";
  const education = query.education || "";
  const experience = query.experience || "";
  const keyword = query.keyword || "";
  const location = query.location || "";
  const page = query.page || 1;

  let min_salary = "";
  let max_salary = "";

  if (query.salary) {
    const [min, max] = query.salary.split("-");
    min_salary = min;
    max_salary = max;
  }


   const queryStr = `keyword=${keyword}&location=${location}&page=${page}&jobType=${jobType}&education=${education}&experience=${experience}&min_salary=${min_salary}&max_salary=${max_salary}`;

  const response = await axios.get(`${process.env.API}/api/jobs?${queryStr}`);
  const data = response.data;
  return {
    props: {
      data
    }
  }
}
