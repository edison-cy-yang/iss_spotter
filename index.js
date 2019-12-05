const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((err, passTimes) => {
  if (err) {
    console.log(`It didn't work! ${err}`);
  }
  printPassTimes(passTimes);
});


const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

