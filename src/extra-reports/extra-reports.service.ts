import fs from 'fs';
import { Injectable } from '@nestjs/common';
import { PrinterService } from 'src/printer/printer.service';
import { getHtmlContent } from 'src/helpers/html-to-pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { headerSection } from 'src/reports/sections/header.section';
import { footerSection } from 'src/reports/sections/footer.section';
import { getCommunityReport } from 'src/reports';

@Injectable()
export class ExtraReportsService {
  constructor(private readonly printerService: PrinterService) {}

  async getHtmlReport() {
    const html = fs.readFileSync('src/reports/html/basic-03.html', 'utf8');

    const content = getHtmlContent(html, {
      client: 'Jose Sanchez',
    });
    const docDefinition: TDocumentDefinitions = {
      pageMargins: [40, 110, 40, 60],
      header: headerSection({
        title: 'HTML to PDFMake',
        subTitle: 'Convertir HTML a PDFMake',
      }),
      footer: footerSection,
      content,
    };
    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }

  async getCommunity() {
    const docDefinition = getCommunityReport();
    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }

  async getCustomSize() {
    const doc = this.printerService.createPdf({
      // pageSize: 'C2',
      pageSize: {
        width: 175,
        height: 412,
      },
      content: [
        {
          qr: 'https://www.google.com',
          fit: 100,
          alignment: 'center',
        },
        {
          text: 'This is a custom size report with 175 x 412',
          alignment: 'center',
          margin: 20,
          fontSize: 10,
        },
      ],
    });
    return doc;
  }
}
