import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function ProgressChart({ data }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow">
      <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-4">📈 Weekly Progress</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="progress" stroke="#6366F1" strokeWidth={3} dot={{ r: 5 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
