import { StyleDictionary, TDocumentDefinitions } from 'pdfmake/interfaces';
import { headerSection } from './sections/header.section';
import { DateFormater } from 'src/helpers';

const style: StyleDictionary = {
  header: {
    fontSize: 22,
    bold: true,
    alignment: 'center',
    margin: [0, 20, 0, 60],
  },
  body: {
    margin: [0, 0, 0, 70],
    alignment: 'justify',
  },
  signature: {
    fontSize: 14,
    bold: true,
    alignment: 'left',
    margin: [0, 20, 0, 0],
  },
  footer: {
    italics: true,
    fontSize: 10,
    margin: [0, 20],
    alignment: 'center',
  },
};

interface IEmploymentLetterById {
  employerName: string;
  employerPosition: string;
  employeeName: string;
  employeePosition: string;
  employeeStartDate: Date;
  employeeHours: number;
  employeeWorkSchedule: string;
  employeeCompany: string;
}

export const getEmploymentLetterByIdReport = (
  values: IEmploymentLetterById,
): TDocumentDefinitions => {
  const {
    employerName,
    employerPosition,
    employeeName,
    employeePosition,
    employeeStartDate,
    employeeHours,
    employeeWorkSchedule,
    employeeCompany,
  } = values;

  const docDefinition: TDocumentDefinitions = {
    styles: style,
    pageMargins: [40, 60, 40, 60],
    header: headerSection({}),
    footer: {
      text: 'Este documento es una constancia de empleo y no representa un compromiso laboral.',
      style: 'footer',
    },
    content: [
      {
        text: 'CONSTANCIA DE EMPLEO',
        style: 'header',
      },
      {
        text: `Yo, ${employerName}, en mi calidad de ${employerPosition} de ${employeeCompany}, por medio de la presente certifico que ${employeeName} ha sido empleado en nuestra empresa desde el ${DateFormater.getDDMMMMYYYY(employeeStartDate)}.
        
        Durante su empleo, el Sr./Sra. ${employeeName} ha desempeñado el cargo de ${employeePosition}, demostrando responsabilidad, compromiso y habilidades profesionales en sus labores.
        
        La jornada laboral del Sr./ Sra. ${employeeName} es de ${employeeHours * 5} horas semanales, con un horario de ${employeeWorkSchedule}, cumpliendo con las políticas y procedimientos establecidos por la empresa. 
        
        Esta constancia se expide a solicitud del interesado para los fines que considere conveniente.`,
        style: 'body',
      },
      {
        text: `Atentamente,
        ${employerName} 
        ${employerPosition} 
        ${employeeCompany} 
        ${DateFormater.getDDMMMMYYYY(new Date())}`,
        style: 'signature',
      },
    ],
  };
  return docDefinition;
};
