import { Components, useSingle2, useUpdate2, useCurrentUser } from 'meteor/vulcan:core';

import React, { useEffect, useState } from "react";

import { Link, useParams } from 'react-router-dom';
import Users from 'meteor/vulcan:users';

import {
    PdfLoader,
    PdfHighlighter,
    Tip,
    Highlight,
    Popup,
    AreaHighlight,
    setPdfWorker
  } from "react-pdf-highlighter";

import Sidebar from "./Sidebar";
import Spinner from "./Spinner";

import './style/App.css';

function getNested(obj, ...args) {
  return args.reduce((obj, level) => obj && obj[level], obj)
}

/* Generate a new id for a highlight */
const getNextId = () => String(Math.random()).slice(2);

/* Open a popup for the comment */
const HighlightPopup = ({ comment }) =>
    comment.text ? 
    (<div className="Highlight__popup">
        {comment.emoji} {comment.text}
    </div>) : null;



const App = ({ noteid, fileid, fileurl }) =>  {

  const { currentUser } = useCurrentUser();

  /* Query for highlights */
  const queryHighlights = useSingle2({
    collectionName: "Notes",
    //Select all highlights for this noteid that are not hidden
    input: { filter: { _id: { _eq: noteid } } },
    fragmentName: "NoteHighlights"
  });

  //queryObject.refetch() can be used to refetch the data!
  //For example after adding a new note

  const [scroller, setScroller] = useState( () => () => {} );
  //Store a empty function at the start

  const [updateNote, {called}] = useUpdate2({
    collectionName: "Notes", fragmentName: "NoteHighlights",
  });
  
  const updateDatabase = (highlight) => {

    console.log("Updating with highlight", highlight);

    //Checks if highlight is being removed:
    const new_content = (highlight.content === null) ? {} : _.pick(highlight, ['_id', 'fileId', 'hidden', 'userId', 'userName', 'resolved', 'content', 'position', 'comment', 'answers', 'date']); //Whitelist properties, so that spurious ones don't enter the db

    const mutation_data = [{fileId: fileid, ...new_content}];
  
    const input = { filter: { _id: { _eq: noteid } }, data: { highlights: mutation_data } };
  
    updateNote({ input });
  
    queryHighlights.refetch();
    //TODO manage errors and return values
  }

  const updateAnswer = (highlightId, answer) => {
    let highlight = getHighlightById(highlightId);

    highlight.answers.push(answer);

    updateDatabase(highlight);
  }

  getHighlightById = (id) => {
    return result.highlights.filter( h => h ).find(highlight => highlight._id === id);
  }

  scrollToHighlightFromId = (highlightId) => {
    const highlight = getHighlightById(highlightId);

    if (highlight) { //TODO Add checks for visibility
      console.log("Trying to scroll to", highlight);
      console.log("Need to call", scroller)
      scroller(highlight);
    }
  };
  
  addHighlight = (highlight) => {
    const new_highlight = {...highlight, _id: getNextId(), hidden: false, resolved: false, userId: currentUser._id, userName: currentUser.username, answers: [], date: new Date()};
    console.log("Adding", highlight)

    updateDatabase(new_highlight);
  }

  removeHighlight = (highlightId) => {
    console.log("Removing", highlightId);

    let removed_highlight = result.highlights.find( (h) => h._id == highlightId );

    //Check permissions
    if (Users.isAdmin(currentUser) || removed_highlight.userId === currentUser._id) {
      removed_highlight.hidden = true; //Set the note to be hidden

      updateDatabase( removed_highlight ); //Update in the database
    }
  }

  filterHighlights = (highlights) => {
    return highlights.filter( h => h ).filter( (h) => (getNested(h, 'hidden') === false) && (getNested(h, 'fileId') === fileid) );
  } //collect in a single file! Repeated code is bad!
  
  updateHighlight = (highlightId, position, content) => {
    let edited_highlight = result.highlights.find( (h) => h._id == highlightId );

    //check permissions: owners + admins
    if (Users.isAdmin(currentUser) || edited_highlight.userId === currentUser._id) {
      edited_highlight.position = {...edited_highlight.position, ...position};
      edited_highlight.content = {...edited_highlight.content, ...content};
      //Apparently it is needed to preserve the other properties for some reason

      console.log("Editing", edited_highlight);

      updateDatabase(edited_highlight); //Save also id 
    }
  }

  if (queryHighlights.loading) 
    return <Components.Loading/>
  
  result = queryHighlights.document;

  return (
    <div className="App" style={{ display: "flex", height: "100vh" }}>
      <Sidebar queryHighlights={queryHighlights} scrollUpdater={scrollToHighlightFromId} remover={removeHighlight} answer={updateAnswer} fileid={fileid}/>
      <div style={{height: "100vh", width: "75vw", position: "relative"}}>
        <PdfLoader url={fileurl} beforeLoad={<Spinner/>}>
          {pdfDocument => (
            <PdfHighlighter
              pdfDocument={pdfDocument}
              enableAreaSelection={event => event.altKey}
              onScrollChange={() => {}}
              scrollRef={scrollTo => {
                setScroller( () => scrollTo ); //Store the correct function in that state
                scrollToHighlightFromId(); //Scroll to 0 position
              }}
              onSelectionFinished={(
                position,
                content,
                hideTipAndSelection,
                transformSelection
              ) => (
                <Tip
                  onOpen={transformSelection}
                  onConfirm={comment => {
                    addHighlight({ content, position, comment });
                    hideTipAndSelection();
                  }}/>
                )}
              highlightTransform={(
                highlight,
                index,
                setTip,
                hideTip,
                viewportToScaled,
                screenshot,
                isScrolledTo
                ) => {
                  const isTextHighlight = !Boolean(
                    highlight.content && highlight.content.image
                  );

                  const component = isTextHighlight ? 
                    (<Highlight
                      isScrolledTo={isScrolledTo}
                      position={highlight.position}
                      comment={highlight.comment}/>) : 
                      (<AreaHighlight
                          highlight={highlight}
                          onChange={boundingRect => 
                            {updateHighlight(
                              highlight._id,
                              { boundingRect: viewportToScaled(boundingRect) },
                              { image: screenshot(boundingRect) }
                            );
                          }
                        }/>
                      );

                      return (
                        <Popup
                          popupContent={<HighlightPopup {...highlight} />}
                          onMouseOver={popupContent =>
                            setTip(highlight, highlight => popupContent)
                          }
                          onMouseOut={hideTip}
                          key={index}
                          children={component}
                        />
                      );
                    }
                  }
                    highlights={filterHighlights(result.highlights)}
                  />
                )}
        </PdfLoader>
      </div>
    </div>
  )
};

export default App;