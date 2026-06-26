import api from "../api/axios";

function SupplementForm({ onAdded }) {

    function handleSubmit(event) {
        event.preventDefault();

        const name = event.target.name.value;
        const dosage = event.target.dosage.value;
        const token = localStorage.getItem("token");
        
        api.post(
            "/api/supplements",
            { name, dosage },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        .then(response => {
            console.log("Supplement added:", response.data);

            event.target.reset();

            onAdded();
        })
        .catch(error => {
            console.error("Error adding supplement:", error);
        });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    name="name"
                    type="text"
                    className="supplementForm"
                    placeholder="Type of supplement"
                />

                <input
                    name="dosage"
                    type="text"
                    className="supplementForm"
                    placeholder="Dosage"
                />

                <button
                    type="submit"
                    className="supplementFormButton"
                >
                    ADD
                </button>
            </form>
        </div>
    );
}

export default SupplementForm;