import React from "react";
import { useCurrentUser }from 'meteor/vulcan:core';

import sortBy from "lodash/sortBy";
import moment from 'moment';
import Users from 'meteor/vulcan:users';

// const updateHash = highlight => {
//   document.location.hash = `highlight-${highlight.id}`;
// };

const Sidebar = ({ queryHighlights, scrollUpdater, remover }) => {
  const { currentUser } = useCurrentUser();

  if (queryHighlights.loading) {
    return <Spinner/>
  }

  console.log("query @ sidebar", queryHighlights);

  const highlights = queryHighlights.document.highlights.filter( (h) => h.hidden == false ); //remove hidden notes

  console.log("extracted", highlights);

  return (
    <div className="sidebar" style={{ width: "25vw" }}>
      <div className="description" style={{ padding: "1rem" }}>
        <div style={{display: "flex", alignItems: "baseline", justifyContent: "space-around"}}>
          <h2 style={{ marginBottom: "1rem" }}>File Viewer</h2>
          <div className="sidebar-button">
            <div onClick={ () => window.location.reload()}>Exit</div> 
          {/* Yes, we are exiting by reloading the page. This works fine for now*/} 
          </div>
        </div>
        <p>
          <small>
            To create <b>area highlight</b> hold ⌥ Option key (Alt), then click and
            drag.
          </small>
        </p>
        <p>
          <small>
            Click on a highlight below to <b>jump</b> to its position in the pdf.
          </small>
        </p>
        <p>
          <small>
            Highlights are <b>not</b> updated in real-time: if someone else adds a highlight while you are editing, you won't see it until you refresh the page (but your work will be saved).
          </small>
        </p>
      </div>

      <ul className="sidebar__highlights">
        {sortBy(highlights, (h) => h.position.pageNumber ).map((highlight, index) => (
          <li
            key={index}
            className="sidebar__highlight"
            onClick={() => {
              scrollUpdater(highlight._id);
            }}
          >
            <div>
              <strong>{highlight.comment.text}</strong>
              {highlight.content.text ? (
                <blockquote style={{ marginTop: "0.5rem" }}>
                  {`${highlight.content.text.slice(0, 90).trim()}…`}
                </blockquote>
              ) : null}
              {highlight.content.image ? (
                <div
                  className="highlight__image"
                  style={{ marginTop: "0.5rem" }}
                >
                  <img src={highlight.content.image} alt={"Screenshot"} />
                </div>
              ) : null}
            </div>
            <div className="highlight__location">
              Page {highlight.position.pageNumber}
            </div>
            <div className="highlight__date">
              { moment(highlight.date).fromNow() }
            </div>
            <div className="highlight__user">
              { highlight.userName }
            </div>
            { (currentUser._id === highlight.userId) || Users.isAdmin(currentUser) ?  
            ( <div className="highlight__remove sidebar-button" onClick={ () => {remover(highlight._id)} }>
              Remove
            </div> ) : null} 
            { /* Show remove button only for owners and admins. */ }
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
