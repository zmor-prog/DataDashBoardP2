import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from '../routes/Layout';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const JobsDetail = () => {
    let params = useParams();
    const [fullDetails, setFullDetails] = useState(null);
    const [data, setData] = useState([]);
    
    useEffect(() => {
        const getCertificationInfo = async () => {
            const response = await fetch(
                `https://data.cityofnewyork.us/resource/nzjr-3966.json?title=${params.symbol}`
            );
            const json = await response.json();
            console.log(json);
            setFullDetails({
                "descr": json[0].descr,
                "min_rate": json[0].min_rate,
            });
            setData(json);
        };
        getCertificationInfo().catch(console.error);
    }, []);

    return (
        <div>
            <Layout />
            <h1>Hello two</h1>
            <p>{params.symbol}</p>
            <p>{fullDetails ? fullDetails.descr : "no Data"}</p>
            <p>{fullDetails ? fullDetails.min_rate : "No data"}</p>
            <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="job_title" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="min_rate" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="max_rate" stroke="#82ca9d" />
            </LineChart>
        </div>
    );
};

export default JobsDetail;
