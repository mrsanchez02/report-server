import { Content } from 'pdfmake/interfaces';
import { DateFormater } from 'src/helpers';

const logo: Content = {
  image: 'src/assets/tucan-code-logo.png',
  width: 100,
  height: 100,
  alignment: 'center',
  margin: [0, 0, 0, 20],
};

const currentDate: Content = {
  text: DateFormater.getDDMMMMYYYY(new Date()),
  alignment: 'right',
  margin: [20, 40],
  width: 150,
};

interface HeaderOptions {
  title?: string;
  subTitle?: string;
  showLogo?: boolean;
  showDate?: boolean;
}

export const headerSection = (options: HeaderOptions): Content => {
  const { title, subTitle, showLogo = true, showDate = true } = options;

  const headerLogo: Content = showLogo ? logo : null;
  const headerDate: Content = showDate ? currentDate : null;
  const headerSubTitle: Content = subTitle
    ? {
        text: subTitle,
        style: { alignment: 'center', bold: true, fontSize: 18 },
      }
    : null;
  const headerTitle: Content = title
    ? {
        stack: [
          {
            text: title,
            style: { alignment: 'center', bold: true, fontSize: 22 },
          },
          headerSubTitle,
        ],
        margin: [0, 20],
      }
    : null;

  return {
    columns: [headerLogo, headerTitle, headerDate],
  };
};
