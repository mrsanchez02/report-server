import type { TDocumentDefinitions } from 'pdfmake/interfaces';

export const getCommunityReport = (): TDocumentDefinitions => {
  const docDefinition: TDocumentDefinitions = {
    defaultStyle: {
      fontSize: 10,
    },
    content: [
      // Logo - Direction - details
      {
        columns: [
          {
            image: 'src/assets/tucan-code-logo.png',
            width: 50,
          },
          {
            alignment: 'center',
            text: `Forest Admin Community Report SAP\n RUT: 44.123.1244\nCamino Montañés 2323\nTeléfono: +56 9 1234 5678`,
          },
          {
            alignment: 'right',
            width: 140,
            layout: 'boderBlue',
            table: {
              body: [
                [
                  {
                    layout: 'noBorders',
                    table: {
                      body: [
                        ['No. Fac:', '123-23'],
                        ['Fecha:', '2021-12-23'],
                        ['Version:', '2024-001'],
                      ],
                    },
                  },
                ],
              ],
            },
          },
        ],
      },
      // Horizontal Line
      {
        margin: [0, 5],
        canvas: [
          {
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 515,
            y2: 5,
            lineWidth: 2,
            lineColor: '#3A4546',
          },
        ],
      },
      // Detalles del cliente:
      {
        table: {
          widths: ['auto', '*', 'auto', '*'],
          body: [
            [
              {
                text: 'Detalles del cliente:',
                colSpan: 4,
                bold: true,
                fillColor: '#5775e1',
                color: 'white',
                // border: [false, false, false, true],
              },
              {},
              {},
              {},
            ],
            // Razon social.
            [
              {
                text: 'Razon social:',
                fillColor: '#343a40',
                color: 'white',
                bold: true,
              },
              {
                text: 'Nombre de la empresa',
                fillColor: 'white',
                color: 'black',
                bold: true,
              },
              {
                text: 'Direccion:',
                fillColor: '#343a40',
                color: 'white',
                bold: true,
              },
              {
                text: 'Calle falsa 123',
                fillColor: 'white',
                color: 'black',
                bold: true,
              },
            ],
            [
              {
                text: 'RUT:',
                fillColor: '#343a40',
                color: 'white',
                bold: true,
              },
              {
                text: '',
                fillColor: 'white',
                color: 'black',
                bold: true,
              },
              {
                text: 'Telefono:',
                fillColor: '#343a40',
                color: 'white',
                bold: true,
              },
              {
                text: '',
                fillColor: 'white',
                color: 'black',
                bold: true,
              },
            ],
            [
              {
                text: 'Giro:',
                fillColor: '#343a40',
                color: 'white',
                bold: true,
              },
              {
                text: '',
                fillColor: 'white',
                color: 'black',
                bold: true,
              },
              {
                text: 'Condicion de pago:',
                fillColor: '#343a40',
                color: 'white',
                bold: true,
              },
              {
                text: '',
                fillColor: 'white',
                color: 'black',
                bold: true,
              },
            ],
          ],
        },
      },
    ],
  };
  return docDefinition;
};
