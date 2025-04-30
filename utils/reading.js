export const getReadings = async (length = 1200) => {
  const current = Date.now();
  const hour = 1000 * 60 * 60;
  return [...new Array(length)].map((_, index) => ({
    time: current - index * hour,
    value: Math.random() * 0.7 + 0.4,
  }));
};

export const groupByDay = (readings) => {
  const groupedByDay = readings.reduce((curr, { time, value }) => {
    const readingDate = new Date(time);
    const day = new Date(
      readingDate.getFullYear(),
      readingDate.getMonth(),
      readingDate.getDate()
    ).getTime();
    if (!curr[day]) curr[day] = 0;
    curr[day] += value;
    return curr;
  }, {});

  return Object.entries(groupedByDay).map(([day, value]) => ({
    time: Number(day),
    value,
  }));
};

export const sortByTime = (readings) => {
  return [...readings].sort(
    (readingA, readingB) => readingA.time - readingB.time
  );
};

const getTotalUnits = (readings) => {
  return readings.reduce((a, { value }) => a + value, 0);
}

export const getCost = (readings) => {
  const perUnit = 0.138;
  const totalUnits = getTotalUnits(readings);
  const cost = totalUnits * perUnit;
  return Math.round(cost);
}

export const getConsumption = (readings) => {
  const totalUnits = getTotalUnits(readings);
  return Math.round(totalUnits);
}

export const getFootPrint = (readings) => {
  const perUnit = 0.0002532;
  const totalUnits = getTotalUnits(readings);
  const footPrint = totalUnits * perUnit;
  return footPrint.toFixed(4);
}
