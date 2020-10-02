import React, { useState } from "react";
import { useCurrentUser }from 'meteor/vulcan:core';

import sortBy from "lodash/sortBy";
import moment from 'moment';
import Users from 'meteor/vulcan:users';
import Form from 'react-bootstrap/Form';

const getNextId = () => String(Math.random()).slice(2);

const ReplyBox = ({ highlightId, userName, addAnswer }) => {
  const [toggle, setToggle] = useState(false);

  toggleVisibility = () => {
    setToggle(toggle => !toggle);
  }

  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      console.log("Invio: ", e.target.value);
      toggleVisibility();

      //Create answer
      const answer = { _id:  getNextId(), userName: userName, message: e.target.value };

      addAnswer(highlightId, answer); //Send to DB
    }
  }

  return (
    <div className="replyform">
      <div className="sidebar-button" onClick={toggleVisibility}>Reply</div>
      { 
        toggle && ( <Form.Control autoFocus type="text" size="sm" placeholder="Reply here..." onBlur={toggleVisibility} onKeyDown={handleKeyDown} /> )
      }
    </div>
  )
}

const Sidebar = ({ queryHighlights, scrollUpdater, remover, answer, fileid }) => {
  const { currentUser } = useCurrentUser();

  const [editing, setEditing] = useState(0);

  if (queryHighlights.loading) {
    return <Spinner/>
  }

  console.log("query @ sidebar", queryHighlights);

  const highlights = queryHighlights.document.highlights.filter( (h) => (h.hidden == false) && (h.fileId == fileid) ); //remove hidden notes
  //This is repeated code, not very good

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
        {sortBy(highlights, (h) => moment().diff(moment(h.date), 'seconds') ).map((highlight, index) => (
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
            <div className="answers">
              { 
                highlight.answers.map( (a) => 
                  (
                    <div className="answer" key={a._id}>
                      <i>{a.message}</i> by {a.userName}
                    </div>
                  )
                )
              }
            </div>
            { /* Show remove button only for owners and admins. */ }
            <ReplyBox highlightId={highlight._id} userName={currentUser.username} onClick={() => {setEditing(highlight._id)}} addAnswer={answer} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
