import React, { useState } from "react";
import { CFormRange } from "@coreui/react";

const MatsRange = () => {
  //   const [rangeValue1, setRangeValue1] = useState(0);
  //   const [rangeValue2, setRangeValue2] = useState(0);
  //   const [max, setMax] = useState(100);

  //   const handleRangeChange1 = (event) => {
  //     setRangeValue1(parseInt(event.target.value));
  //   };

  //   const handleRangeChange2 = (event) => {
  //     setRangeValue2(parseInt(event.target.value));
  //   };

  //   const totalValue = rangeValue1 + rangeValue2;

  //   if (totalValue > 100) {
  //     const diff = totalValue - 100;
  //     if (rangeValue1 >= diff) {
  //       setRangeValue1(rangeValue1 - diff);
  //     } else {
  //       setRangeValue1(0);
  //       setRangeValue2(rangeValue2 - (diff - rangeValue1));
  //     }
  //   }

  //   return (
  //     <div>
  //       <CFormRange min={0} max={100} label="Range 1" defaultValue="0" id="range1" onChange={handleRangeChange1} />
  //       <CFormRange min={0} max={100} label="Range 2" defaultValue="0" id="range2" onChange={handleRangeChange2} />
  //     </div>
  //   );

  const [rangeValue1, setRangeValue1] = useState(50);
  const [rangeValue2, setRangeValue2] = useState(50);
  const [rangeMax1, setRangeMax1] = useState(100);
  const [rangeMax2, setRangeMax2] = useState(100);
  const [rangeMin1, setRangeMin1] = useState(0);
  const [rangeMin2, setRangeMin2] = useState(0);

  const handleRangeChange1 = (event) => {
    const value = parseInt(event.target.value);
    const max = 100 - value;
    let min = value - 100;
    if (min < 0) {
      min = 0;
    }
    setRangeValue1(value);
    setRangeMax2(max);
    setRangeMin2(min);
  };

  const handleRangeChange2 = (event) => {
    const value = parseInt(event.target.value);
    const max = 100 - value;
    let min = value - 100;
    if (min < 0) {
      min = 0;
    }
    setRangeValue2(value);
    setRangeMax1(max);
    setRangeMin1(min);
  };

  return (
    <div>
      <CFormRange
        min={rangeMin1}
        max={rangeMax1}
        label="Range 1"
        defaultValue="0"
        id="range1"
        onChange={handleRangeChange1}
      />
      <h3>{rangeValue1}</h3>
      <CFormRange
        min={rangeMin2}
        max={rangeMax2}
        label="Range 2"
        defaultValue="0"
        id="range2"
        onChange={handleRangeChange2}
      />
      <h3>{rangeValue2}</h3>
    </div>
  );
};

export default MatsRange;


// import React, { useState } from 'react';
// import { CFormRange } from '@coreui/react';

// const App = () => {
//   const [ranges, setRanges] = useState([
//     { value: 0, max: 100 },
//     { value: 0, max: 100 },
//     { value: 0, max: 100 },
//     // add more objects here for each range component
//   ]);

//   const handleRangeChange = (index, event) => {
//     const value = parseInt(event.target.value);
//     const max = 100 - value;

//     setRanges((prevState) => {
//       const newRanges = [...prevState];
//       newRanges[index] = { value, max };
//       const totalValue = newRanges.reduce((acc, curr) => acc + curr.value, 0);
//       const totalMax = newRanges.length * 100 - totalValue;

//       newRanges.forEach((range, i) => {
//         if (i !== index) {
//           range.max = totalMax;
//         }
//       });

//       return newRanges;
//     });
//   };

//   return (
//     <div>
//       {ranges.map((range, index) => (
//         <CFormRange
//           key={index}
//           min={0}
//           max={range.max}
//           label={`Range ${index + 1}`}
//           defaultValue="0"
//           id={`range${index + 1}`}
//           onChange={(event) => handleRangeChange(index, event)}
//         />
//       ))}
//     </div>
//   );
// };

// export default App;
