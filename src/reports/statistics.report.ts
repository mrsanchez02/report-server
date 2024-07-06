import type { TDocumentDefinitions } from 'pdfmake/interfaces';
import { getDonutChart } from './charts/donut.chart';
import { headerSection } from './sections/header.section';
import { getLineChart } from './charts/line.chart';
import { getBarsChart } from './charts/bars.chart';
import { footerSection } from './sections/footer.section';
import { getBarLineChart } from './charts/bar-line.chart';

interface TopCountry {
  country: string;
  customers: number;
}

interface ReportOptions {
  title?: string;
  subTitle?: string;
  topCountries: TopCountry[];
}

export const getStatisticsReport = async (
  options: ReportOptions,
): Promise<TDocumentDefinitions> => {
  const [donutChart, lineChart, barChart1, barLineChart] = await Promise.all([
    getDonutChart({
      entries: options.topCountries.map((country) => ({
        label: country.country,
        value: country.customers,
      })),
      position: 'left',
    }),
    getLineChart(),
    getBarsChart(),
    getBarLineChart(),
  ]);

  const docDefinition: TDocumentDefinitions = {
    pageMargins: [40, 100, 40, 60],
    header: headerSection({
      title: options.title || 'Estadísticas de clientes',
      subTitle: options.subTitle || 'Top 10 paises con mas clientes',
    }),
    footer: footerSection,
    content: [
      {
        columns: [
          {
            stack: [
              {
                text: 'Top 10 países con más clientes',
                bold: true,
                alignment: 'center',
                fontSize: 14,
                margin: [0, 0, 0, 10],
              },
              {
                image: donutChart,
                width: 300,
              },
            ],
          },
          {
            layout: 'lightHorizontalLines',
            width: 'auto',
            table: {
              headerRows: 1,
              widths: [100, 'auto'],
              body: [
                ['Pais', 'Clientes'],
                ...options.topCountries.map((c) => [c.country, c.customers]),
              ],
            },
          },
        ],
      },
      {
        image: barLineChart,
        width: 500,
        margin: [0, 20],
      },
      {
        columnGap: 10,
        columns: [
          {
            image: barChart1,
            width: 250,
          },
          {
            image: lineChart,
            width: 250,
          },
        ],
      },
    ],
  };
  return docDefinition;
};
