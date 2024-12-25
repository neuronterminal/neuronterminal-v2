import React from 'react';
import { Line } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { defaultChartOptions } from '../../performance/utils/chartConfig';

interface LearningMetrics {
  accuracy: number[];
  comprehension: number[];
  timestamps: string[];
}

interface LearningProgressProps {
  metrics: LearningMetrics;
}

export function LearningProgress({ metrics }: LearningProgressProps) {
  const chartData = {
    labels: metrics.timestamps,
    datasets: [
      {
        label: 'Accuracy',
        data: metrics.accuracy,
        borderColor: '#00ff41',
        backgroundColor: 'rgba(0, 255, 65, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'Comprehension',
        data: metrics.comprehension,
        borderColor: '#41ff00',
        backgroundColor: 'rgba(65, 255, 0, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 border border-[#00ff41] rounded-lg bg-[#0d0208]/90"
    >
      <h3 className="text-lg font-semibold mb-4">Learning Progress</h3>
      <div className="h-[200px]">
        <Line data={chartData} options={defaultChartOptions} />
      </div>
    </motion.div>
  );
}