import React  from "react"

export const ConsumptionCard = ({title, value, unit}) => (
    <div className="py1 px2 shadow-2 border-radius-0">
        <div className="h4"> {title} </div>
        <div className=""> {value} </div>
        <div className=""> {unit} </div>
    </div>
);