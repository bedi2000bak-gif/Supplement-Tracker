import { useEffect, useState } from "react";
import SupplementList from "../components/SupplementList";
import SupplementForm from "../components/SupplementForm";
import IntakeSummary from "../components/IntakeSummary";
import api from "../api/axios";





function Dashboard() {
    const [supplements, setSupplements] = useState(null);
    const [error, setError] = useState(null);
    const [intakes, setIntakes] = useState([])

     function getIntakes() {
        const token = localStorage.getItem("token")
        const today = new Date().toISOString().split("T")[0]

         if (!token) {
            console.error("No token fount in localStorage");
            return;
        }
        return api.get(`/api/intake/${today}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(response => {
                setError(null)
                console.log("Today's intakes:", response.data)
                console.log(JSON.stringify(response.data, null, 2));
                setIntakes(response.data)
            })
            .catch(error => {
                console.error("failed to get intake logs")
                setError("Failed to load today's intakes")
            })
    }

    function loadSupplements() {
        const token = localStorage.getItem("token")
        if (!token) {
            console.error("No token found in localStorage");
            return;
        }
        return(
         api.get("/api/supplements", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => {
                setError(null)
                setSupplements(response.data);
                console.log("User data:", response.data);
            })
            .catch(error => {
                console.error("Error fetching user data:", error);
                setError("Failed to load supplements")
            })
        )
    }

    function deleteSupplement(id) {
        const token = localStorage.getItem("token")

        if (!token) {
            console.error("No token fount in localStorage");
            return;
        }

        return (
            api.delete(`/api/supplements/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(response => {
                    setError(null)
                    return Promise.all([
                        loadSupplements(),
                        getIntakes()
                    ])
                })
                .catch(error => {
                    console.error("Error deleting supplement:", error);
                    setError("Failed to delete supplement")
                })
        )
    }



    useEffect(() => {
       
        loadSupplements()
        getIntakes()
    }, []);



    return (
        <>
            <h1>Dashboard</h1>
            {error && <p> X
                {error}</p>}
            <IntakeSummary
                supplements={supplements}
                intakes={intakes}
            />
            <SupplementForm
                onAdded={loadSupplements} />
            <SupplementList
                supplements={supplements}
                intakes={intakes}
                onDelete={deleteSupplement}
                onTaken= {getIntakes}
            />
        </>
    );
}

export default Dashboard;