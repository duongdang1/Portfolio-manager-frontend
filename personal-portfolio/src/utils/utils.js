export const processData = (rawData) => {
    const processedData = {
      ticker: rawData.ticker.S.split(":")[0],
      price: parseFloat(rawData.price.N),
      open: parseFloat(rawData.open.N),
      high: parseFloat(rawData.high.N),
      low: parseFloat(rawData.low.N),
      volume: parseInt(rawData.volume.N),
      change: parseFloat(rawData.change.N),
      changePercent: parseFloat(rawData.changePercent.N),
      lastUpdate: rawData.lastUpdate.S,
    };
    return processedData;
  };