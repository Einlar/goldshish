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

    console.log("Saving highlight", highlight);

    const all_highlights = [{ ...highlight, id: getNextId() }, ...highlights];
    this.setState({
      highlights: all_highlights
    });
    
    console.log("All highlights", all_highlights);

    this.props.updater(all_highlights); //Save also id
  }
  
  updateHighlight = (highlightId, position, content) => {
    console.log("Updating highlight", highlightId, position, content);

    const all_highlights = this.state.highlights.map(h => {
      const {
        id,
        position: originalPosition,
        content: originalContent,
        ...rest
      } = h; //Unpack every highlight
      return id === highlightId //for the highlight to be modified
        ? { //return new data
            id,
            position: { ...originalPosition, ...position },
            content: { ...originalContent, ...content },
            ...rest
          }
        : h; //for the others, return the old data
    });

    this.setState({
      highlights: 
      all_highlights
    });

    this.props.updater(all_highlights); //Save also id
  }


  render = () => {
    const { highlights } = this.state;

    return (
      <div className="App" style={{ display: "flex", height: "100vh" }}>
        <Sidebar highlights={highlights} scrollUpdater={this.scrollToHighlightFromHash}/>
        <div style={{height: "100vh", width: "75vw", position: "relative"}}>
          <PdfLoader url={this.props.url}>
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