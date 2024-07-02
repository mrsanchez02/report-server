import {
  Content,
  StyleDictionary,
  TDocumentDefinitions,
} from 'pdfmake/interfaces';
import { CurrencyFormater, DateFormater } from 'src/helpers';
import { footerSection } from './sections/footer.section';

const logo: Content = {
  image: 'src/assets/tucan-banner.png',
  width: 100,
  height: 30,
  margin: [10, 20],
};

const styles: StyleDictionary = {
  header: {
    fontSize: 20,
    bold: true,
    margin: [0, 30, 0, 0],
  },
  subHeader: {
    fontSize: 16,
    bold: true,
    margin: [0, 20, 0, 0],
  },
};

export interface CompleteOrder {
  order_id: number;
  customer_id: number;
  order_date: Date;
  customers: Customers;
  order_details: OrderDetail[];
}

export interface Customers {
  customer_id: number;
  customer_name: string;
  contact_name: string;
  address: string;
  city: string;
  postal_code: string;
  country: string;
}

export interface OrderDetail {
  order_detail_id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  products: Products;
}

export interface Products {
  product_id: number;
  product_name: string;
  category_id: number;
  unit: string;
  price: string;
}

interface ReportValues {
  title?: string;
  subTitle?: string;
  data: CompleteOrder;
}

export const orderByIdReport = (values: ReportValues): TDocumentDefinitions => {
  const { data } = values;
  const { customers, order_details, order_id, order_date } = data;
  // console.log(data);

  const subTotal = order_details.reduce(
    (acc, detail) => acc + detail.quantity * +detail.products.price,
    0,
  );
  const total = subTotal * 1.18;

  return {
    header: logo,
    styles: styles,
    pageMargins: [40, 60, 40, 60],
    footer: footerSection,
    content: [
      // Header
      {
        text: 'Tucan Code',
        style: 'header',
      },
      // Address
      {
        columns: [
          {
            text: '15 Montgomery Str, Suite 100, \nOttawa ON K2Y 9X1, CANADA\n BN: 12783671823 \nhttps://devtalles.com',
          },
          {
            text: [
              {
                text: `Recibo No. ${order_id}\n`,
                bold: true,
              },
              `Fecha del recibo ${DateFormater.getDDMMMMYYYY(order_date)}\nPagar antes de: ${DateFormater.getDDMMMMYYYY(new Date())}\n`,
            ],
            alignment: 'right',
          },
        ],
      },
      // QR Code
      {
        qr: 'https://devtalles.com',
        fit: 75,
        alignment: 'right',
      },
      // Direccion del cliente
      {
        text: [
          {
            text: 'Cobrar a:\n',
            style: 'subHeader',
          },
          `Razón Social: ${customers.customer_name}
          Contacto: ${customers.contact_name}
          ${customers.address}`,
        ],
      },
      // Tabla del detalle de la orden.
      {
        layout: 'headerLineOnly',
        margin: [0, 20],
        table: {
          headerRows: 1,
          widths: [50, '*', 'auto', 'auto', 'auto'],
          body: [
            ['ID', 'Descripción', 'Cantidad', 'Precio', 'Total'],
            ...order_details.map((detail) => [
              detail.product_id.toString(),
              detail.products.product_name,
              detail.quantity.toString(),
              {
                text: CurrencyFormater.formatCurrency(+detail.products.price),
                alignment: 'right',
              },
              {
                text: CurrencyFormater.formatCurrency(
                  +detail.products.price * detail.quantity,
                ),
                alignment: 'right',
              },
            ]),
          ],
        },
      },
      // Salto de linea
      '\n',
      // Totales
      {
        columns: [
          {
            width: '*',
            text: '',
          },
          {
            width: 'auto',
            layout: 'noBorders',
            table: {
              body: [
                [
                  'Subtotal',
                  {
                    text: CurrencyFormater.formatCurrency(subTotal),
                    alignment: 'right',
                  },
                ],
                [
                  { text: 'Total', bold: true },
                  {
                    text: CurrencyFormater.formatCurrency(total),
                    alignment: 'right',
                    bold: true,
                  },
                ],
              ],
            },
          },
        ],
      },
    ],
  };
};
