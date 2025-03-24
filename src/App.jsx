import { useState, useEffect } from "react";
import { FaColumns } from "react-icons/fa";

const TimerPlane = ({ title, color, isActive, onClick, time, totalTime, isMobile }) => {
  const percentage = totalTime > 0 ? ((time / totalTime) * 100).toFixed(1) : "0.0";
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const textSize = isMobile && window.innerWidth / 2 < 350 ? "text-4xl" : "text-6xl";

  return (
    <div
      onClick={onClick}
      className={`flex justify-center items-center cursor-pointer transition-all duration-300 relative overflow-hidden w-full h-full ${
        isActive ? "scale-105 shadow-lg z-10" : "opacity-50 z-0"
      }`}
      style={{ backgroundColor: color }}
    >
      <div className="text-white text-center">
        <h1 className={`text-7xl font-bold ${textSize}`}>{title}</h1>
        <p className={textSize}>{formatTime(time)}</p>
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
  };

  const isMobile = window.innerWidth < window.innerHeight;
  const containerClasses = isMobile ? "flex flex-col w-screen h-screen" : "flex w-screen h-screen";
  const panelClasses = isMobile ? "h-1/3 w-full" : "w-1/3 h-full";
  const salsaPanelClasses = splitSalsa ? (isMobile ? "w-1/2 h-full" : "h-1/2 w-full") : "w-full h-full";

  return (
    <div className={`flex overflow-hidden relative ${containerClasses}`}>
      <div className="absolute top-4 left-4 z-20">
        {isMobile ? (
          <button 
            onClick={handleToggle} 
            className="bg-gray-800 text-white p-3 rounded-full text-lg flex items-center justify-center"
          >
            <FaColumns size={24} />
          </button>
        ) : (
          <button 
            onClick={handleToggle} 
            className="bg-gray-800 text-white px-4 py-2 rounded text-lg"
          >
            {splitSalsa ? "Merge Salsa" : "Split Salsa"}
          </button>
        )}
      </div>
      <div className={`${splitSalsa ? (isMobile ? "flex" : "flex flex-col") : ""} ${panelClasses}`}>
        {splitSalsa ? (
          <>
            <div className={salsaPanelClasses}>
              <TimerPlane title="LA" color="red" isActive={active === "salsa1"} onClick={() => { setActive("salsa1"); setLastActiveSalsa("salsa1"); }} time={times.salsa1} totalTime={totalTime} isMobile={isMobile} />
            </div>
            <div className={salsaPanelClasses}>
              <TimerPlane title="Cuban" color="red" isActive={active === "salsa2"} onClick={() => { setActive("salsa2"); setLastActiveSalsa("salsa2"); }} time={times.salsa2} totalTime={totalTime} isMobile={isMobile} />
            </div>
          </>
        ) : (
          <div className={salsaPanelClasses}>
            <TimerPlane title="Salsa" color="red" isActive={active === "salsa1" || active === "salsa2"} onClick={() => setActive(lastActiveSalsa)} time={salsaTotal} totalTime={totalTime} isMobile={isMobile} />
          </div>
        )}
      </div>
      <div className={panelClasses}>
        <TimerPlane title="Bachata" color="green" isActive={active === "green"} onClick={() => setActive("green")} time={times.green} totalTime={totalTime} isMobile={isMobile} />
      </div>
      <div className={panelClasses}>
        <TimerPlane title="Kizomba" color="blue" isActive={active === "blue"} onClick={() => setActive("blue")} time={times.blue} totalTime={totalTime} isMobile={isMobile} />
      </div>
    </div>
  );
}
