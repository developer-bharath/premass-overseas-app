import { useEffect, useState } from "react";
import { Student, Globe, Buildings, CheckCircle } from "phosphor-react";

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
    icon: <Buildings size={36} weight="duotone" className="text-[#cd9429]" />,
  },
  {
    label: "Students Guided",
    value: 5000,
    suffix: "+",
    icon: <Student size={36} weight="duotone" className="text-[#cd9429]" />,
  },
  {
    label: "Countries",
    value: 15,
    suffix: "+",
    icon: <Globe size={36} weight="duotone" className="text-[#cd9429]" />,
  },
  {
    label: "Visa Success Rate",
    value: 98,
    suffix: "%",
    icon: <CheckCircle size={36} weight="duotone" className="text-[#cd9429]" />,
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
            <div key={index} className="stat-card group">

              <div className="stat-icon w-20 h-20 rounded-2xl bg-gradient-to-br from-[#cd9429]/20 via-orange-500/10 to-[#cd9429]/5 flex items-center justify-center mb-4 group-hover:from-[#cd9429]/30 group-hover:via-orange-500/20 group-hover:to-[#cd9429]/10 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#cd9429]/20">
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
