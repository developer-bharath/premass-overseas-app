import { useEffect, useState } from "react";
import { FaUserGraduate, FaGlobe, FaUniversity, FaCheckCircle } from "react-icons/fa";

type Stat = {
  label: string;
  value: number;
  suffix?: string;
  icon: JSX.Element;
};

const stats: Stat[] = [
  {
    label: "Years Experience",
    value: 10,
    suffix: "+",
    icon: <FaUniversity />,
  },
  {
    label: "Students Guided",
    value: 5000,
    suffix: "+",
    icon: <FaUserGraduate />,
  },
  {
    label: "Countries",
    value: 15,
    suffix: "+",
    icon: <FaGlobe />,
  },
  {
    label: "Visa Success Rate",
    value: 98,
    suffix: "%",
    icon: <FaCheckCircle />,
  },
];

function Counter({ value }: { value: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1200; // speed
    const stepTime = Math.max(Math.floor(duration / value), 20);

    const timer = setInterval(() => {
      start += Math.ceil(value / 40);
      if (start >= value) {
        start = value;
        clearInterval(timer);
      }
      setCount(start);
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  return <>{count}</>;
}

export default function StatsSection() {
  return (
    <section className="stats-section">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">

              <div className="stat-icon">
                {stat.icon}
              </div>

              <div className="stat-value">
                <Counter value={stat.value} />
                {stat.suffix}
              </div>

              <div className="stat-label">
                {stat.label}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
