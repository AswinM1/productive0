import React, { useEffect, useState } from 'react'
import { EvilBarChart } from "@/components/evilcharts/charts/recharts-bar-chart";
import { type ChartConfig } from "@/components/evilcharts/ui/recharts-chart";
function Analytics() {
  
  const chartConfig = {
    minutes: {
      label: "Focus time",
      colors: {
        light: ["#047857"],
        dark: ["#10b981"],
      },
    },
  } 
    const[data,setData]=useState([])
    useEffect(()=>
    {
        fetch("api/analytics").then((data)=>data.json()).then((data)=>setData(data)).catch((error)=>console.log(error))

    },[])
  return (
    <div className="w-full p-6">
  <EvilBarChart
    data={data}
    config={chartConfig}
    stackType="default"
    className="h-[400px] w-full"
  >
    <EvilBarChart.Grid />

    <EvilBarChart.XAxis
      dataKey="date"
      
    />
    <EvilBarChart.YAxis
      dataKey="minutes"
      
    />

    <EvilBarChart.Tooltip />

    <EvilBarChart.Bar
      dataKey="minutes"
      variant="default"
      radius={4}
      
      isClickable
    />
  </EvilBarChart>
</div>)
}

export default Analytics