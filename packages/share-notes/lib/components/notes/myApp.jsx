import React, { useEffect } from "react";

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


const getNextId = () => String(Math.random()).slice(2);

const HighlightPopup = ({ comment }) =>
    comment.text ? 
    (<div className="Highlight__popup">
        {comment.emoji} {comment.text}
    </div>) : null;

// const parseIdFromHash = (hash) => {
//   console.log("Parsing");
//   document.location.hash.slice("#highlight-".length);
// }

const resetHash = () => {
  document.location.hash = "";
};
  
class App extends React.Component {
  state = {
    highlights: _.isEmpty(this.props.initialHighlights) ? [] : this.props.initialHighlights
  };
  

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


  // componentDidUpdate = () => {
  //   console.log("Added event");
  //   window.addEventListener(
  //     "hashchange",
  //     this.scrollToHighlightFromHash,
  //     false
  //   );
  // }
  
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
        <Sidebar highlights={highlights} scrollUpdater={this.scrollToHighlightFromHash} remover={this.removeHighlight}/>
        <div style={{height: "100vh", width: "75vw", position: "relative"}}>
          <PdfLoader url={this.props.url} beforeLoad={<Spinner/>}>
            {pdfDocument => (
              <PdfHighlighter
                pdfDocument={pdfDocument}
                enableAreaSelection={event => event.altKey}
                onScrollChange={resetHash}
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