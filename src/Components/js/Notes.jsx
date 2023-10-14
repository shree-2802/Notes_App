import { DeleteForeverOutlined } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import "../css/App.css";
import styles from "../css/Notes.module.css";
import AnswerDisplay from "./AnswerDisplay";
const localItems = () => {
  let list = localStorage.getItem("data");
  // console.log(list);
  if (list) return JSON.parse(localStorage.getItem("data"));
  else return [];
};
function Notes() {
  const [isDelete, setIsDelete] = useState(false);
  const [idPass, setIdPass] = useState();
  const navigate = useNavigate();
  const [data, setData] = useState(localItems());
  const handleChange = (e) => {
    e.preventDefault();
    const text = document.querySelector(".js-text").value;
    setData((prevState) => [
      ...prevState,
      {
        id: data.length,
        text: text,
      },
    ]);
    document.querySelector(".js-text").value = "";
    // console.log(data);
  };
  const handledelete = (id) => {
    setIdPass(id);
    setIsDelete(true);
  };
  const Edit = (boole, id, text) => {
    if (boole) {
      data[id].text = text;
      setData(data);
    }
    setIsDelete(!isDelete);
  };
  // const Answer = (id) => {
  //   AnswerDisplay();
  //   console.log("shiv");
  // };
  const Del = (id) => {
    swal({
      title: "Are you sure to delete this note",
      text: "It will be permanently deleted",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Deleted Successfully!", {
          icon: "success",
        });
        const filtered = data.filter((val) => val.id != id);
        // console.log(filtered);
        setData(filtered);
        // console.log(data);
        if (isDelete) setIsDelete(!isDelete);
      } else {
        swal("Your Text is safe");
      }
    });
  };
  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
    // console.log("use" + JSON.stringify(data));
  }, [data]);
  const handleChangeText = () => {
    if (document.querySelector(".js-text").value.length >= 99) {
      swal("Limit 100", "Oops! Limit Exceeded", "warning");
      // swal("Good job!", "You clicked the button!", "success");
    }
  };
  // document.querySelectorAll('js-cancel').forEach(deleteButton)
  return (
    <>
      {isDelete ? (
        <AnswerDisplay idPass={idPass} Del={Del} data={data} Edit={Edit} />
      ) : (
        <div className="app-container">
          <div>
            <div className={styles.Header}>Notes App</div>
            <div className={styles.wholeContent}>
              <div className={styles.textareaComponent}>
                <textarea
                  className={`${styles.textarea} js-text`}
                  spellCheck="false"
                  placeholder="type...."
                  maxLength={100}
                  onChange={handleChangeText}
                ></textarea>
                <button onClick={handleChange}>save</button>
              </div>
              <div className={`${styles.answers} answers`}>
                {data.map((val) => {
                  return (
                    <div key={val.id}>
                      <p onClick={() => handledelete(val.id)}>{val.text}</p>
                      <DeleteForeverOutlined
                        className={styles.cancel}
                        onClick={() => Del(val.id)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Notes;
