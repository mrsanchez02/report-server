import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient, continents } from '@prisma/client';
import { PrinterService } from 'src/printer/printer.service';
import {
  getCountryReport,
  getEmploymentLetterByIdReport,
  getEmploymentLetterReport,
  getHelloWorldReport,
} from 'src/reports';

@Injectable()
export class BasicReportsService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
    // console.log('Connected to the database');
  }

  constructor(private readonly printerService: PrinterService) {
    super();
  }

  hello() {
    const docDefinition = getHelloWorldReport({ name: 'Jose Sanchez' });
    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }

  async employmentLetter() {
    const docDefinition = getEmploymentLetterReport();
    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }

  async employmentLetterById(employeeId: number) {
    const employee = await this.employees.findFirst({
      where: {
        id: employeeId,
      },
    });

    console.log(employee);

    if (!employee) {
      throw new NotFoundException(`Employee with id ${employeeId} not found`);
    }

    // const docDefinition = getEmploymentLetterReport();
    const docDefinition = getEmploymentLetterByIdReport({
      employerName: 'Jose L. Sanchez',
      employerPosition: 'Lead Developer',
      employeeName: employee.name,
      employeePosition: employee.position,
      employeeStartDate: employee.start_date,
      employeeHours: employee.hours_per_day,
      employeeWorkSchedule: employee.work_schedule,
      employeeCompany: 'XYZ Solutions',
    });
    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }

  async getCountries() {
    const countries = await this.countries.findMany({
      where: {
        local_name: {
          not: null,
        },
      },
    });
    const docDefinition = getCountryReport({
      title: 'Countries Report',
      subTitle: 'List of countries',
      countries,
    });
    return this.printerService.createPdf(docDefinition);
  }
  async getCountryByContinent(continent: continents) {
    const countries = await this.countries.findMany({
      where: {
        continent: continent,
      },
    });
    const docDefinition = getCountryReport({
      title: 'Countries Report',
      subTitle: `List of countries in ${continent} continent`,
      countries,
    });
    return this.printerService.createPdf(docDefinition);
  }
}
