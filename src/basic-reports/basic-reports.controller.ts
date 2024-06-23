import { Controller, Get, Param, Res } from '@nestjs/common';
import { BasicReportsService } from './basic-reports.service';
import { Response } from 'express';
import { continents } from '@prisma/client';

@Controller('basic-reports')
export class BasicReportsController {
  constructor(private readonly basicReportsService: BasicReportsService) {}
  @Get()
  hello(@Res() response: Response) {
    const pdfDoc = this.basicReportsService.hello();
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Hello World';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('employment-letter')
  async employmentLetter(@Res() response: Response) {
    const pdfDoc = await this.basicReportsService.employmentLetter();
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Employment Letter';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('employment-letter/:employeeId')
  async employmentLetterById(
    @Res() response: Response,
    @Param('employeeId') employeeId: string,
  ) {
    const pdfDoc =
      await this.basicReportsService.employmentLetterById(+employeeId);
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Employment Letter';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  // Countries
  @Get('countries')
  async getCountriesReport(@Res() response: Response) {
    const pdfDoc = await this.basicReportsService.getCountries();
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Here countries...';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('countries/:continent')
  async getCountriesByContinentReport(
    @Res() response: Response,
    @Param('continent') continent: continents,
  ) {
    const pdfDoc =
      await this.basicReportsService.getCountryByContinent(continent);
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Here countries...';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }
}
