import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import html2canvas from 'html2canvas';

/**
 * PDF Report Generator Utility
 * 
 * Provides professional-grade PDF generation for FarmSync analytics.
 * Combines manual PDF drawing for branding and summaries with 
 * html2canvas for capturing interactive charts.
 */

/**
 * Generates and downloads a comprehensive farm report PDF.
 * 
 * @param {Object} data - The metrics and trend data to include
 * @param {Object} context - User and Farm details (name, location)
 * @param {string} chartId - The HTML ID of the trend chart element to capture
 */
export const generateFarmReport = async (data, context, chartId) => {
  console.log('PDF Generation Pipeline Started', { data, context, chartId });
  
  const { yieldGrowth, netMargin, bestCrop, trendData } = data;
  const doc = new jsPDF('p', 'mm', 'a4');
  const timestamp = new Date().toLocaleString();

  // --- Header & Branding ---
  console.log('Drawing Header...');
  doc.setFillColor(7, 17, 13); // FarmSync Dark Green
  doc.rect(0, 0, 210, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('FarmSync', 15, 20);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('ANALYTICS & INSIGHTS REPORT', 15, 28);
  
  doc.setFontSize(9);
  doc.text(`Generated: ${timestamp}`, 145, 15);
  doc.text(`Farmer: ${context.farmerName || 'Farmer'}`, 145, 21);
  doc.text(`Location: ${context.location || 'Not set'}`, 145, 27);

  // --- Summary Section ---
  console.log('Drawing Summaries...');
  doc.setTextColor(7, 17, 13);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Executive Summary', 15, 55);
  
  const cards = [
    { label: 'Yield Growth', value: yieldGrowth, color: [74, 222, 128] },
    { label: 'Net Margin', value: netMargin, color: [56, 189, 248] },
    { label: 'Best Crop', value: bestCrop, color: [251, 191, 36] }
  ];

  cards.forEach((card, i) => {
    const x = 15 + (i * 65);
    doc.setHighlightColor(230, 230, 230);
    doc.setDrawColor(230, 230, 230);
    doc.roundedRect(x, 62, 55, 25, 3, 3, 'D');
    
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text(card.label, x + 5, 70);
    
    doc.setFontSize(12);
    doc.setTextColor(card.color[0], card.color[1], card.color[2]);
    doc.text(card.value, x + 5, 80);
  });

  // --- Performance Trends (Chart Capture) ---
  console.log(`Searching for chart element: ${chartId}`);
  doc.setTextColor(7, 17, 13);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Performance Trends', 15, 105);

  const chartElement = document.getElementById(chartId);
  if (chartElement) {
    try {
      console.log('Capturing chart with html2canvas...');
      const canvas = await html2canvas(chartElement, {
        backgroundColor: '#07110d',
        scale: 2,
        logging: false,
        useCORS: true
      });
      const imgData = canvas.toDataURL('image/png');
      doc.addImage(imgData, 'PNG', 15, 110, 180, 80);
      console.log('Chart captured and added to PDF.');
    } catch (error) {
      console.warn('Failed to capture chart image, skipping...', error);
      doc.setFontSize(10);
      doc.setTextColor(180, 180, 180);
      doc.text('[Chart visualization summary included in breakdown below]', 15, 120);
    }
  }

  // --- Detailed Data Table ---
  console.log('Generating AutoTable...');
  doc.setFontSize(14);
  doc.setTextColor(7, 17, 13);
  doc.text('Monthly Breakdown', 15, 202);

  autoTable(doc, {
    startY: 208,
    head: [['Month', 'Yield Score', 'Net Profit (%)']],
    body: trendData.map(d => [d.name, d.yield, d.profit + '%']),
    theme: 'striped',
    headStyles: { fillColor: [19, 85, 50], textColor: [255, 255, 255] },
    styles: { fontSize: 9, cellPadding: 4 }
  });

  // --- Footer ---
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(`FarmSync Dashboard Report - Page ${i} of ${pageCount}`, 105, 285, { align: 'center' });
  }

  // Save the PDF
  console.log('Saving PDF file...');
  const filename = `FarmSync_Report_${new Date().getTime()}.pdf`;
  doc.save(filename);
  console.log('PDF Download Dispatched.');
};

