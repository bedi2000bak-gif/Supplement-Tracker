function IntakeSummary({ intakes, supplements }) {
    
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


    const total = supplements.length
    const taken = Math.min(intakes.length, supplements.length)
    const progress = total === 0 ? 0 : Math.round((taken/total)*100)
    const remaining = total - taken

    return (
        <>
            <h2>Progress:</h2>
            <p>
                {taken}/{total} taken ({progress}%)
            </p>
            <progress
                value={progress}
                max="100"
            />
            <p>Remaining: {remaining }</p>
        </>
    )
}

export default IntakeSummary