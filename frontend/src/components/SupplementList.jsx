import IntakeButton from "./IntakeButton"


function SupplementList({ supplements, intakes, onDelete, onTaken }) {
    

    if (supplements === null) {
        return (<div>
        <p>Loading supplements</p>
            
        </div>)
    }
    
    if (supplements.length === 0) {
        return (
            <div>No supplements</div>
        )
    }



return (
        <div>
            <h2>Your Supplements</h2>

            <ul>
            {supplements.map(supplement => {
                const isTaken = intakes.some(intake => 
        intake.supplement_id === supplement.id
    );
                    
                return (
                    <li key={supplement.id}>
                        {supplement.name} - {supplement.dosage}

                        <button onClick={() => onDelete(supplement.id)}>
                            Delete
                        </button>
                    
                        <IntakeButton
                            supplementId={supplement.id}
                            isTaken={isTaken}
                            onTaken={onTaken}
                        />
                    </li>
                )
            })}
            </ul>
        </div>
     )
    
}

export default SupplementList