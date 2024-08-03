import {useState, useEffect } from "react";
import axios from "axios";

const HomePage = ()=>{
    const [members, setMembers] = useState([]);

    useEffect(()=>{
        const fetchData = async()=>{
            try {
                const response = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/v1/owner/members");
                console.log(response.data);
                setMembers(response.data.members);
            } 
            catch (error) {
                if (error.response) {
                  console.error("Error status:", error.response.status);
                  console.error("Error data:", error.response.data);
                } else if (error.request) {
                  console.error("No response received:", error.request);
                } else {
                  console.error("Error:", error.message);
                }
              }
        }
        fetchData();
    },[]);

    return (
        <div>
            {members.map((member, index)=>(
                    <div>
                        <p key={index}>{member}</p>
                    </div>
            ))}
        </div>
    )
}

export default HomePage;