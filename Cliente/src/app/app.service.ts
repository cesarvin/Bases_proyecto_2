import { Injectable } from '@angular/core';
import 'pdfmake/build/pdfmake';
import 'pdfmake/build/vfs_fonts';


var pdfMake = require('pdfmake/build/pdfmake.js');
var pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs; 

@Injectable()
export class AppService {

    downloadFile(data, filename='data', arrHeaders) {
        let csvData = this.ConvertToCSV(data, arrHeaders);
        console.log(csvData)
        let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
        let dwldLink = document.createElement("a");
        let url = URL.createObjectURL(blob);
        let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
        if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
            dwldLink.setAttribute("target", "_blank");
        }   
        dwldLink.setAttribute("href", url);
        dwldLink.setAttribute("download", filename + ".csv");
        dwldLink.style.visibility = "hidden";
        document.body.appendChild(dwldLink);
        dwldLink.click();
        document.body.removeChild(dwldLink);
    }

    downloadFilePDF(data, filename='data', arrHeaders) {
        // var contenido= '';
        // data.forEach(element => {
        //     contenido = contenido + element.title + '\n';
        // });
        const documentDefinition = this.getDocumentDefinition(data, arrHeaders);
        pdfMake.createPdf(documentDefinition).open();
    }

    ConvertToCSV(objArray, headerList) {
         let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
         let str = '';
         let row = '';

         for (let index in headerList) {
             row += headerList[index] + ',';
         }
         row = row.slice(0, -1);
         str += row + '\r\n';
         for (let i = 0; i < array.length; i++) {
             let line = '';
             for (let index in headerList) {
                let head = headerList[index];
                line += (line.length>0 ? ',': '') + array[i][head];
             }
             str += line + '\r\n';
         }
         return str;
     }

     getDocumentDefinition(data, columns) {
        console.log('imprimir data',data);
        var body = [];

        body.push(columns);

        data.forEach(track => {
            var dataRow = [];
            dataRow.push(track.artist);
            dataRow.push(track.title);
            dataRow.push(track.name);
            dataRow.push(track.unitprice);
            body.push(dataRow);
        });
        
        console.log('body->',body);
        
        return {
          content: [
            {
              layout: 'lightHorizontalLines', // optional
              table: {
                // headers are automatically repeated if the table spans over multiple pages
                // you can declare how many rows should be treated as headers
                headerRows: 1,
                widths: [ '*', 'auto', 'auto','auto' ],
        
                body: body
              }
            }
          ],
          styles: {
            name: {
              fontSize: 16,
              bold: true
          }
        }
      };
     }
}