import { Content } from 'pdfmake/interfaces';
import { DateFormater } from 'src/helpers';

const logo: Content = {
  image: 'src/assets/tucan-code-logo.png',
  width: 100,
  height: 100,
  alignment: 'center',
  margin: [0, 0, 0, 20],
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
  const headerDate: Content = showDate
    ? {
        text: DateFormater.getDDMMMMYYYY(new Date()),
        alignment: 'right',
        margin: [20, 20],
      }
    : null;

  const headerTitle: Content = title
    ? { text: title, style: { bold: true, alignment: 'center' } }
    : null;

  const headerSubTitle: Content = subTitle
    ? { text: subTitle, style: { bold: true, alignment: 'center' } }
    : null;

  return {
    columns: [headerLogo, headerTitle, headerSubTitle, headerDate],
  };
};
