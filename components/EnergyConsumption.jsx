import React, { useEffect, useState } from "react";
import { renderChart } from "../utils/chart.js";
import { getCost, getConsumption, getFootPrint, groupByDay, sortByTime } from "../utils/reading";
import {ConsumptionCard} from "./ConsumptionCard.jsx";
import { VIEW_TYPE } from "../utils/constants.js";

export const EnergyConsumption =  ({ readings }) => {
  const containerId = "usageChart";
  const [result, setResult] = useState([]);
  const [cost, setCost] = useState(getCost(result,));
  const [footPrint, setFootPrint] = useState(getFootPrint(result,));
  const [consumtion, setConsumtion] = useState(getConsumption(result,));
  const [viewType, setViewType] = useState(VIEW_TYPE.MONTHLY);

  useEffect(() => {
    switch(viewType) {
      case VIEW_TYPE.MONTHLY:
        setResult(sortByTime(groupByDay(readings)).slice(-30));
      break;
      case VIEW_TYPE.HOURLY:
        setResult(sortByTime(readings).slice(-24));
        break;
      }
  }, [viewType]);


  useEffect(() => {
    renderChart(containerId, result, viewType);
    setCost(getCost(result));
    setConsumtion(getConsumption(result));
    setFootPrint(getFootPrint(result));
  }, [result]);

  const handleClick = (e) => {
    setViewType(e.target.value);
  }

  return (
    <>
      <h1 className="regular darkgray line-height-1 mb3">Energy consumption</h1>
      <section className="mb3">
        <button
          className={`
            h5 inline-block shadow-2 pl2 pr2 pt1 pb1 roundedMore border-grey white bold 
            ${viewType === VIEW_TYPE.MONTHLY ? 'bg-blue' : 'bg-white font-color'}
          `}
          value={VIEW_TYPE.MONTHLY}
          onClick={(e) => handleClick(e)}
        >
          Last 30 days
        </button>
        <button
            className={`
              h5 inline-block shadow-2 pl2 pr2 pt1 pb1 ml2 roundedMore border-grey white bold 
              ${viewType === VIEW_TYPE.HOURLY ? 'bg-blue' : 'bg-white font-color'}
            `}
            value={VIEW_TYPE.HOURLY}
            onClick={(e) => handleClick(e)}
        >
          24 Hours
        </button>
      </section>
      <section className="chartHeight mb3">
        <canvas id={containerId} />
      </section>
      <div className="card-row">
          <ConsumptionCard title={"Cost"} value={cost} unit={"$"} />
          <ConsumptionCard title={"Consumption"} value={consumtion} unit={"KWh"} />
          <ConsumptionCard title={"Footprint"} value={footPrint} unit={"Tones"} />
      </div>
    </>
  );
};
