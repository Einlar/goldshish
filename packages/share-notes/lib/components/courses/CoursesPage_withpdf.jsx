import { Components, registerComponent, useSingle2 } from 'meteor/vulcan:core';
import get from 'lodash/get';
import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import Courses from '../../modules/courses/collection.js';
import { Link, useParams } from 'react-router-dom';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const CoursesPage = () => {
    const { slug } = useParams();

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPageNumber(1);
      }
    
    function changePage(offset) {
        setPageNumber(prevPageNumber => prevPageNumber + offset);
    }

    function previousPage() {
        changePage(-1);
    }

    function nextPage() {
        changePage(1);
    }
    

    //Why is this named document and not result!? And also it is not in the docs!
    const {document, loading, error} = useSingle2({
        collection: Courses,
        input: { filter: {slug: {_eq: slug} } },
        fragmentName: 'CoursesNotes',
        //fragmentName, input, pollInterval, queryOptions
    });

    return ( //Find a way to manage errors here, redirecting to 404 page
            loading ? (<Components.Loading />) : (
            <div>
                <h2>{document.title}</h2>
            <Document file={document.noteUrl.url} onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={pageNumber} renderAnnotationLayer={false}/>
            </Document>
            <div>
                <p>
                Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
                </p>
                <button
                type="button"
                disabled={pageNumber <= 1}
                onClick={previousPage}
                >
                Previous
                </button>
                <button
                type="button"
                disabled={pageNumber >= numPages}
                onClick={nextPage}
                >
                Next
                </button>
            </div>
            <a href={document.noteUrl.url} download={document.noteUrl.name}>Download here!</a>
            </div>
        ) 
    )
};

registerComponent('CoursesPage', CoursesPage);

export default CoursesPage;