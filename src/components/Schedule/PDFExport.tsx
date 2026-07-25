import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ScheduleEntry } from '@/types/Schedule';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export async function exportScheduleToPDF(
  entries: ScheduleEntry[],
  month: Date
) {
  const element = document.getElementById('schedule-to-print');
  if (!element) {
    console.error('Element not found');
    return;
  }

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      logging: false,
      backgroundColor: '#ffffff',
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4',
    });

    const imgWidth = pdf.internal.pageSize.getWidth();
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pdf.internal.pageSize.getHeight();

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdf.internal.pageSize.getHeight();
    }

    const fileName = `Escala-${format(month, 'MMMM-yyyy', { locale: ptBR })}.pdf`;
    pdf.save(fileName);
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
}

export function exportScheduleToCSV(entries: ScheduleEntry[]) {
  const headers = ['Data', 'Dia', 'Horário', 'Profissionais'];
  const rows = entries.map((entry) => [
    format(entry.date, 'dd/MM/yyyy'),
    entry.dayName,
    entry.shiftTime,
    entry.professionals.map((p) => p.name).join('; '),
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Escala-${format(new Date(), 'yyyy-MM-dd')}.csv`;
  a.click();
  window.URL.revokeObjectURL(url);
}
