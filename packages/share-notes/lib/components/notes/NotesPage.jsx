import { Components, registerComponent, useSingle2, useUpdate2 } from 'meteor/vulcan:core';

import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";

// import { onPageLoad } from 'meteor/server-render';  

// import PDFWorker from "worker-loader!pdfjs-dist/lib/pdf.worker"; //Non va
import Notes from '../../modules/notes/collection.js';
import { Link, useParams } from 'react-router-dom';



// setPdfWorker(PDFWorker);

const NotesPage = () => {
    const { slug } = useParams();

    const queryObject = useSingle2({
        collection: Notes,
        input: { filter: { slug: { _eq: slug } } },
        fragmentName: "NotePage"
    });


    loading = queryObject.loading;
    result = queryObject.document;
    //error = queryObject.error;

    const [url, setUrl] = useState({});

    // const [createHighlight, {called}] = useCreate2({
    //     collectionName: "Highlights"
    // });

    const [updateNote, {called}] = useUpdate2({
        collectionName: "Notes", fragmentName: "noteHighlights",
    });

    const updateHighlight = (highlight) => {
        console.log("Received", highlight);

        //Checks if highlight is being removed:
        const new_content = (highlight.content === null) ? "" : JSON.stringify(highlight);

        const mutation_data = [{_id: highlight.id, fileId: url.id, content: new_content}];

        //? Maybe changing the fragment avoids invoking the files mutation when changing highlights?

        const input = { filter: { slug: { _eq: slug } }, data: { noteFiles: result.noteFiles, highlights: mutation_data } };

        updateNote({ input });

        //TODO manage errors and return values
    }

//     const updateHighlights = (highlights) => { 
//         console.log("Received: ", highlights);

//         const new_highlights = highlights.map(highlight => ({_id: highlight.id, fileId: url.id, content: JSON.stringify(highlight)}));

//         console.log("Sending", new_highlights);

//         const input = { filter: { slug: { _eq: slug } }, data: { noteFiles: result.noteFiles, highlights: new_highlights } };
// //!BUG: when editing multiple files, only the last one gets saved (since we set here the id)
// //! Also, switching from a file to another "transports" all the highlights...
//         // createHighlight({ input });

//         updateNote({ input });
//     };

    // input UpdateNoteHighlightsDataInput {
    //     fileId: String 
    //     content: JSON 
    //   }


    useEffect( () => {
            import App from './myApp.jsx'; 

            if (!_.isEmpty(url))
                pdfviewport = ReactDOM.render( 
                    (<div className="viewer-container">
                        <App url={url.url} fileId={url.id} initialHighlights={url.highlights} updater={updateHighlight}/>
                    </div>),
                    document.getElementById("root"));
    }, [url])
    // }

    // if (typeof window !== 'undefined')
    //     import App from './myApp.jsx';

    const handleClick = (id, url, highlights) =>
    { 
        console.log("Got", url);
        console.log("Got also",  highlights);

       const set_highlights = (typeof highlights === 'undefined') ? [] : highlights.filter((highlight) => (highlight.fileId === id) && (highlight.content != "")).map((highlight) => JSON.parse(highlight.content));
        setUrl({id: id, url: url, highlights: set_highlights}); //Filter by fileId, then map + parse JSON
        //TODO Now highlights are merged, but still it could be convenient to fetch more data from the server and update in real time
    };

    return (
            loading ? (<Components.Loading/>) : (
            <div>
                <span>
                    <h2 className="course-title">{result.noteName}</h2>
                    by {result.user.username}
                </span>
                {
                    result.files.map(
                        file => 
                            <div key={file._id}>
                                <a href={file.url} key="download" download={file.name}>{file.name}</a>
                                <a href="#"
                                onClick={
                                    e => {
                                        e.preventDefault(); handleClick(file._id,file.url, result.highlights )
                                    }
                                }
                                key="view">View</a>
                            </div>
                    )
                }
                <div id="root">
                </div>
            </div>
        )
    )};


/*

                }*/
registerComponent("NotesPage", NotesPage);

export default NotesPage;