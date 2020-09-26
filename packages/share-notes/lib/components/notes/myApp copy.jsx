import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { map } from "lodash/map";

import {
    PdfLoader,
    PdfHighlighter,
    Tip,
    Highlight,
    Popup,
    AreaHighlight,
    setPdfWorker
  } from "react-pdf-highlighter";

const getNextId = () => String(Math.random()).slice(2);

const HighlightPopup = ({ comment }) =>
    comment.text ? (
    <div className="Highlight__popup">
        {comment.emoji} {comment.text}
    </div>
    ) : null;

const parseIdFromHash = () => {
    console.log("Parsing");
    document.location.hash.slice("#highlight-".length);
}
  

const App = ({ url, updater }) => {

    const [highlights, setHighlights] = useState([]);

    const resetHash = () => {
      document.location.hash = "";
    };

    scrollViewerTo = (highlight) => {};

    scrollToHighlightFromHash = () => {
      const highlight = getHighlightById(parseIdFromHash());
  
      if (highlight) {
        this.scrollViewerTo(highlight);
      }
    };
  
    componentDidMount = () => {
      console.log("Added event");
      window.addEventListener(
        "hashchange",
        scrollToHighlightFromHash,
        false
      );
    }
  
    getHighlightById = (id) => {
      return highlights.find(highlight => highlight.id === id);
    }
  
    addHighlight = (highlight) => {
      console.log("Saving highlight", highlight);
  
      setHighlights(
        [{ ...highlight, id: getNextId() }, ...highlights]
      );
      
      console.log("New highlights", highlights);
      updater(highlight); //lol
    }
  
    updateHighlight = (highlightId, position, content) => {
      console.log("Updating highlight", highlightId, position, content);
  
      setHighlights(
        highlights.map(h => {
          const {
            id,
            position: originalPosition,
            content: originalContent,
            ...rest
          } = h;
          return id === highlightId
            ? {
                id,
                position: { ...originalPosition, ...position },
                content: { ...originalContent, ...content },
                ...rest
              }
            : h;
        })
      );
    }


    return (
    <div className="App" style={{ display: "flex", height: "100vh" }}>
      <Sidebar
        highlights={highlights}
      />
    <div
      style={{
        height: "100vh",
        width: "75vw",
        position: "relative"
      }}
    >
    <PdfLoader url={url}>
            {pdfDocument => (
              <PdfHighlighter
                pdfDocument={pdfDocument}
                enableAreaSelection={event => event.altKey}
                onScrollChange={resetHash}
                // pdfScaleValue="page-width"
                scrollRef={scrollTo => {
                  this.scrollViewerTo = scrollTo; //this.

                  scrollToHighlightFromHash();
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
                    }}
                  />
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

                  const component = isTextHighlight ? (
                    <Highlight
                      isScrolledTo={isScrolledTo}
                      position={highlight.position}
                      comment={highlight.comment}
                    />
                  ) : (
                    <AreaHighlight
                      highlight={highlight}
                      onChange={boundingRect => {
                        updateHighlight(
                          highlight.id,
                          { boundingRect: viewportToScaled(boundingRect) },
                          { image: screenshot(boundingRect) }
                        );
                      }}
                    />
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
                }}
                highlights={highlights}
              />
            )}
    </PdfLoader>
    </div>
    </div>
    )
};

export default App;