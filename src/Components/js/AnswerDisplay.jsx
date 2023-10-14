import React, { useState } from "react";
import styles from "../css/AnswerDisplay.module.css";
// import { Del } from "./Notes";
function AnswerDisplay({ idPass, Del, data, Edit }) {
  const [isPopUp, setIsPopUp] = useState(false);
  const [textEdit,setTextEdit]=useState(data[idPass].text)
  const [textItem, setTextItem] = useState(data[idPass].text);
  const handleChange = (e) => {
    if(e.target.value.length>=99){
      swal("Limit 100", "Oops! Limit Exceeded", "warning");
    }
    setTextEdit(e.target.value);
  };
  const handleEdit = () => {
    setIsPopUp(!isPopUp);
  };
  const handleClosePop = () => {
    setIsPopUp(!isPopUp);
  };
  const handleEditPop = () => {
    setTextItem(textEdit);
    setIsPopUp(!isPopUp);
    // console.log(textItem);
  };
  const close = () => {
    if (textItem !== data[idPass].text) Edit(true, idPass, textItem);
    else Edit(false, idPass, textItem)
  };
  return (
    // <div style={{color:'white'}}>sh</div>
    <>
      {isPopUp ? (
        <div className={styles.answerDisplay}>
          <div className={styles.content}>
            <textarea
              placeholder="type..."
              value={textEdit}
              onChange={handleChange}
              className="textArea"
              spellCheck="false"
            />
            <div>
              <button onClick={handleEditPop}>Edit</button>
              <button onClick={handleClosePop}>Close</button>
            </div>
          </div>
        </div>
      ) : (
        // <div></div>
        <div className={styles.answerDisplay}>
          <div className={styles.content}>
            <div>
              <p>{textItem}</p>
              <div onClick={close} className={styles.closing}>
                X
              </div>
            </div>
            <div>
              <button onClick={handleEdit}>Edit</button>
              <button onClick={() => Del(idPass)}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AnswerDisplay;
