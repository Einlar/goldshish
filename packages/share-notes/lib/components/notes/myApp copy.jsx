import { Components, useSingle2, useCurrentUser } from 'meteor/vulcan:core';

import React, { useEffect } from "react";

import { Link, useParams } from 'react-router-dom';

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


/* Generate a new id for a highlight */
const getNextId = () => String(Math.random()).slice(2);

/* Open a popup for the comment */
const HighlightPopup = ({ comment }) =>
    comment.text ? 
    (<div className="Highlight__popup">
        {comment.emoji} {comment.text}
    </div>) : null;

QueryFunc = () => {
  const slug = "testnote"; //Can't use hooks (such as useSingle2) inside a class! Need to convert to a function instead.

  const queryObject = useSingle2({
    collectionName: "Notes",
    input: { filter: { slug: { _eq: slug } } },
    fragmentName: "NotePage"
  });

  return (
    <div className="queryapp">
    { queryObject.loading ? <Components.Loading/> :
    console.log("query in the app!", queryObject.document) }
    </div>
  )
}

//Try to convert the following to a function
//Move update code here 
//Add new functionality


class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      highlights: _.isEmpty(props.initialHighlights) ? [] : props.initialHighlights
    }
  }  

  resetHighlights = () => {
    this.setState({
      highlights: []
    });
  };

  scrollViewerTo = (highlight) => {};

  scrollToHighlightFromHash = (highlightId) => {
    const highlight = this.getHighlightById(highlightId);

    if (highlight) {
      this.scrollViewerTo(highlight);
    }
  };
  
  getHighlightById = (id) => {
    const { highlights } = this.state;

    return highlights.find(highlight => highlight.id === id);
  }
  
  addHighlight = (highlight) => {
    const { highlights } = this.state;

    //console.log("Saving highlight", highlight);

    const new_highlight = {...highlight, id: getNextId()};

    const all_highlights = [new_highlight, ...highlights];
    this.setState({
      highlights: all_highlights
    });
    
    //console.log("All highlights", all_highlights);

    //return just the new highlight
    this.props.updater(new_highlight); //Save also id
  }

  removeHighlight = (highlightId) => {

    //console.log("Removing highlight", highlightId);

    const all_highlights = this.state.highlights.filter( (h) => h.id !== highlightId ); //Remove the highlight with that id

    this.setState({ highlights: all_highlights });

    const removed_highlight = {
      id: highlightId,
      content: null,
    };

    this.props.updater(removed_highlight); 
  }
  
  updateHighlight = (highlightId, position, content) => {
    //console.log("Updating highlight", highlightId, position, content);

    let edited_highlight = {};

    const all_highlights = this.state.highlights.map(h => {
      const {
        id,
        position: originalPosition,
        content: originalContent,
        ...rest
      } = h; //Unpack every highlight

      if (id === highlightId) {
        edited_highlight = { //return new data
          id,
          position: { ...originalPosition, ...position },
          content: { ...originalContent, ...content },
          ...rest
        };
        return edited_highlight;
      } else {
        return h;
      }
    });

    this.setState({
      highlights: 
      all_highlights
    });

    this.props.updater(edited_highlight); //Save also id
  }


  render = () => {
    const { highlights } = this.state;

    return (
      <div className="App" style={{ display: "flex", height: "100vh" }}>
        <QueryFunc/>
        <Sidebar highlights={highlights} scrollUpdater={this.scrollToHighlightFromHash} remover={this.removeHighlight}/>
        <div style={{height: "100vh", width: "75vw", position: "relative"}}>
          <PdfLoader url={this.props.url} beforeLoad={<Spinner/>}>
            {pdfDocument => (
              <PdfHighlighter
                pdfDocument={pdfDocument}
                enableAreaSelection={event => event.altKey}
                // pdfScaleValue="page-width"
                scrollRef={scrollTo => {
                  this.scrollViewerTo = scrollTo;
                  this.scrollToHighlightFromHash();
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
                      this.addHighlight({ content, position, comment });
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
                              {this.updateHighlight(
                                highlight.id,
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
                      highlights={highlights}
                    />
                  )}
          </PdfLoader>
        </div>
      </div>
    )
  };
};

export default App;