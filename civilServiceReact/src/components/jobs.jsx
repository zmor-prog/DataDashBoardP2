import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

const JobTitles = ({ mytitle,descr, titlecode, asg_lvl,min_rate,max_rate}) => {
    const [title, setInfo] = useState(null);
    
    useEffect(() => {
        const getCertificationInfo=async ()=>{
            const response = await fetch(
                'https://data.cityofnewyork.us/resource/nzjr-3966.json'
                
              );
              const json = await response.json();
              setInfo(json);
            };
            getCertificationInfo().catch(console.error);
        
    }, [descr]);
    return (
        
        <div>
           {descr}
          {title ? ( // rendering only if API call actually returned us data
          
            <p className="main-list" key={titlecode +descr }>
            Assignment Level: {asg_lvl},Staring Pay: {min_rate}, Max Pay: {max_rate}, <Link to={"/jobDetails/"+mytitle} key={mytitle}>{mytitle} </Link>
          </p>
          ) : 
          null
          }
        </div>
      );
  };
  
  export default JobTitles;