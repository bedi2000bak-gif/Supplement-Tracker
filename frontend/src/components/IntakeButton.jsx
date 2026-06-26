import { useState } from "react";
import api from "../api/axios";

function IntakeButton({ supplementId, isTaken, onTaken }) {
    const [loading, setLoading]= useState(false)

    function handleClick() {
setLoading(true)

        const token = localStorage.getItem("token")
        const today = new Date().toISOString().split("T")[0]

        api.post(
            "/api/intake",
            {
                supplementId,
                date: today
            },
            {
                headers:
                {
                    Authorization: `Bearer ${token}`
                }
            }
           
        )
            .then(response => {
                console.log("Intake logged:", response.data);
                setLoading(false)
                if (onTaken) {
                    onTaken();
                }
                })
            .catch(error => {
                console.error("Error logging intake:", error)
                setLoading(false)
            })
    }       
    
    return (
        <div>
            <button onClick={handleClick} disabled={isTaken || loading}>{loading ? "Saving..." : isTaken ? "Taken": "Take" }</button>
        </div>
    )
}



export default IntakeButton