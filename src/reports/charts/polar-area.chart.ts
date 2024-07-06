import * as Utils from 'src/helpers/charts-utils';

export const getPolarAreaChart = async (): Promise<string> => {
  const DATA_COUNT = 5;
  const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100 };

  const labels = ['Red', 'Orange', 'Yellow', 'Green', 'Blue'];
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: Utils.numbers(NUMBER_CFG),
        backgroundColor: [
          Utils.transparentize(Utils.NAMED_COLORS.red, 0.5),
          Utils.transparentize(Utils.NAMED_COLORS.orange, 0.5),
          Utils.transparentize(Utils.NAMED_COLORS.yellow, 0.5),
          Utils.transparentize(Utils.NAMED_COLORS.green, 0.5),
          Utils.transparentize(Utils.NAMED_COLORS.blue, 0.5),
        ],
      },
    ],
  };

  const config = {
    type: 'polarArea',
    data: data,
  };

  return Utils.chartJsToImage(config, { width: 400, height: 200 });
};
