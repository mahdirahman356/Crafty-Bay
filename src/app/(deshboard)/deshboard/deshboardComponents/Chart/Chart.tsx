/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import useChartData from '@/app/Hooks/useChartData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';

const Chart = () => {

  const [data] = useChartData()
  console.log("chart data", data)

  const monthTickFormatter = (tick: string | number | Date) => {
    const date = new Date(tick);

    return (date.getMonth() + 1).toString();
  };

  const renderQuarterTick = (tickProps: { x: any; y: any; payload: any; }) => {
    const { x, y, payload } = tickProps;
    const { value, offset } = payload;
    const date = new Date(value);
    const month = date.getMonth();
    const quarterNo = Math.floor(month / 3) + 1;
    const isMidMonth = month % 3 === 1;

    if (month % 3 === 1) {
      return <text x={x} y={y - 4} textAnchor="middle">{`Q${quarterNo}`}</text>;
    }

    const isLast = month === 11;

    if (month % 3 === 0 || isLast) {
      const pathX = Math.floor(isLast ? x + offset : x - offset) + 0.5;

      return <path d={`M${pathX},${y - 4}v${-35}`} stroke="red" />;
    }
    return <></>;
  };

  return (
    <div className="w-full h-[400px] py-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="category"  />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="revenue" name="revenue" fill="#8884d8" >
            <LabelList dataKey="revenue" position="top" />
          </Bar>
          <Bar dataKey="quantity" name="quantity" fill="#82ca9d" >\
            <LabelList dataKey="quantity" position="top" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;