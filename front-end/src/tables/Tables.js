import React from "react";

function Tables({tables, handleFinish}){

    const rows = tables.map((table)=>{
    const finishButton = (<button data-table-id-finish={table.table_id} onClick={()=>handleFinish(table.table_id)}>Finish</button>)
    
    return (
    <tr key={table.table_id}>
        <td className="px-3">{table.table_name}</td>
        <td className="px-3">{table.capacity}</td>
        <td className="px-3" data-table-id-status={table.table_id}>{table.reservation_id ? "Occupied" : "Free"}</td>
        <td className="px-3">{table.reservation_id ? finishButton : null }</td> 
    </tr>
    )})
    return (
    <table>
        <thead>
            <tr>
                <th className="px-3">Table</th>
                <th className="px-3">Capacity</th>
                <th className="px-3">Availability</th>
            </tr>
        </thead>
        <tbody>{rows}</tbody>
    </table>
    )
}

export default Tables