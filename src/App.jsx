import { useState, useEffect } from "react";

const TimerPlane = ({ title, color, isActive, onClick, time, totalTime, fullHeight = true }) => {
  const percentage = totalTime > 0 ? ((time / totalTime) * 100).toFixed(1) : "0.0";

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div
      onClick={onClick}
      className={`w-full ${fullHeight ? "h-full" : "h-1/2"} flex justify-center items-center cursor-pointer transition-all duration-300 relative overflow-hidden ${
        isActive ? "scale-105 shadow-lg z-10" : "opacity-50 z-0"
      }`}
      style={{ backgroundColor: color }}
    >
      <div className="text-white text-center">
        <h1 className="text-7xl font-bold">{title}</h1>
        <p className="text-6xl">{formatTime(time)}</p>
        <p className="text-4xl mt-4">{percentage}%</p>
      </div>
    </div>
  );
};

export default function App() {
  const [active, setActive] = useState(null);
  const [times, setTimes] = useState({ salsa1: 0, salsa2: 0, green: 0, blue: 0 });
  const [splitSalsa, setSplitSalsa] = useState(false);
  const [lastActiveSalsa, setLastActiveSalsa] = useState("salsa1");

  useEffect(() => {
    let interval;
    if (active) {
      interval = setInterval(() => {
        setTimes((prev) => ({ ...prev, [active]: prev[active] + 1 }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [active]);

  const totalTime = times.salsa1 + times.salsa2 + times.green + times.blue;
  const salsaTotal = times.salsa1 + times.salsa2;

  const handleToggle = () => {
    setSplitSalsa((prev) => !prev);
    if (!splitSalsa) {
      if (active === "salsa1" || active === "salsa2") {
        setActive(lastActiveSalsa);
      }
    }
  };

  return (
    <div className="w-screen h-screen flex overflow-hidden relative">
      <div className="absolute bottom-4 left-4 z-20">
        <button 
          onClick={handleToggle} 
          className="bg-gray-800 text-white px-4 py-2 rounded-lg text-lg"
        >
          {splitSalsa ? "Merge Salsa" : "Split Salsa"}
        </button>
      </div>
      <div className={`h-full flex flex-col ${splitSalsa ? "w-1/3" : "w-1/3"}`}>
        {splitSalsa ? (
          <>
            <TimerPlane title="Salsa 1" color="red" isActive={active === "salsa1"} onClick={() => { setActive("salsa1"); setLastActiveSalsa("salsa1"); }} time={times.salsa1} totalTime={totalTime} fullHeight={false} />
            <TimerPlane title="Salsa 2" color="red" isActive={active === "salsa2"} onClick={() => { setActive("salsa2"); setLastActiveSalsa("salsa2"); }} time={times.salsa2} totalTime={totalTime} fullHeight={false} />
          </>
        ) : (
          <TimerPlane title="Salsa" color="red" isActive={active === "salsa1" || active === "salsa2"} onClick={() => setActive(lastActiveSalsa)} time={salsaTotal} totalTime={totalTime} />
        )}
      </div>
      <div className="w-1/3 h-full">
        <TimerPlane title="Bachata" color="green" isActive={active === "green"} onClick={() => setActive("green")} time={times.green} totalTime={totalTime} />
      </div>
      <div className="w-1/3 h-full">
        <TimerPlane title="Kizomba" color="blue" isActive={active === "blue"} onClick={() => setActive("blue")} time={times.blue} totalTime={totalTime} />
      </div>
    </div>
  );
}
