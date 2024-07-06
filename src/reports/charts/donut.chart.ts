import * as Utils from 'src/helpers/charts-utils';

interface DonutEntry {
  label: string;
  value: number;
}

interface DonutOptions {
  entries: DonutEntry[];
  position?: 'left' | 'right' | 'top' | 'bottom';
}

export const getDonutChart = async (options: DonutOptions): Promise<string> => {
  const { position = 'top' } = options;
  const data = {
    labels: options.entries.map((entry) => entry.label),
    datasets: [
      {
        label: 'Dataset 1',
        data: options.entries.map((entry) => entry.value),
        backgroundColor: Object.values(Utils.CHART_COLORS),
      },
    ],
  };
  const config = {
    type: 'doughnut',
    data: data,
    options: {
      legend: {
        position: position,
      },
      plugins: {
        datalabels: {
          color: '#fff',
          font: {
            weight: 'bold',
            size: 14,
          },
        },
      },
    },
  };
  return Utils.chartJsToImage(config);
};
