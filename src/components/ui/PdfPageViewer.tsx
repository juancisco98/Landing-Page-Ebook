'use client';

import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@5.4.296/build/pdf.worker.min.mjs`;

interface Props {
    url: string;
    page: number;
    width: number;
}

export function PdfPageViewer({ url, page, width }: Props) {
    const encodedUrl = url.replace(/[^/]+/g, match => encodeURIComponent(match));
    return (
        <Document
            file={encodedUrl}
            loading={
                <div className="w-full h-full flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                </div>
            }
            error={<div className="w-full h-full flex items-center justify-center text-xs text-gray-400">Error al cargar</div>}
        >
            <Page
                pageNumber={page}
                width={width}
                renderTextLayer={false}
                renderAnnotationLayer={false}
            />
        </Document>
    );
}
