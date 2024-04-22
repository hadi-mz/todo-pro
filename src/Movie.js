import "./App.css";
import { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";

import {
  dataGen,
  dataAct,
  dataDir,
  dataMov,
  nextId,
  mvs,
  DirNextId,
  ActNextId,
} from "./store/slices/MovieSlice";
import { useNavigate } from "react-router-dom";
import { addMov } from "./store/slices/MovieSlice";
import { addDir, addAct, addGen } from "./store/slices/MovieSlice";

import ReactDOM from "react-dom";
import Modal from "react-modal";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function Movie() {
  const [errorMessage, setErrorMessage] = useState("");
  const [modalIsOpenD, setIsOpenD] = useState(false);
  const [modalIsOpenA, setIsOpenA] = useState(false);
  const [modalIsOpenG, setIsOpenG] = useState(false);

  const [modalTitleColor, setModalTitleColor] = useState("#f00");

  const txtName = useRef();
  const sltDirect = useRef();
  const txtDirModal = useRef();
  const txtActModal = useRef();
  const txtGenModal = useRef();
  const chkActors = useRef([]);
  const chkGenres = useRef([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const dirfil = useSelector(dataDir);
  const actfil = useSelector(dataAct);
  const genfil = useSelector(dataGen);
  const nextid = useSelector(nextId);
  const actNextId = useSelector(ActNextId);
  const dirNextId = useSelector(DirNextId);
  const mv = useSelector(mvs);

  useEffect(() => {
    txtName.current.value = mv.name;
    sltDirect.current.value = mv.director;
    chkActors.current.forEach((el) => (el.checked = mv.actors.includes(parseInt(el.value))));
    chkGenres.current.forEach((el) => (el.checked = mv.genres.includes(el.value)));
  }, [mv]);

  function closeModal(modalName) {
    modalName(false);
    setErrorMessage("");
  }

  function addDirector() {
    const directorName = txtDirModal.current.value;
    const findedDir = dirfil.find((dir) => dir.name === directorName);
    if (findedDir) {
      setErrorMessage("Director already exists!");
    } else {
      dispatch(addDir({ id: dirNextId, name: directorName }));
      closeModal(setIsOpenD);
    }
  }

  function addActor() {
    const actorName = txtActModal.current.value;
    const findedActor = actfil.find((act) => act.name === actorName);
    if (findedActor) {
      setErrorMessage("Actor already exists!");
    } else {
      dispatch(addAct({ id: actNextId, name: actorName }));
      closeModal(setIsOpenA);
    }
  }

  function addGenre() {
    const genreName = txtGenModal.current.value;
    const findedGenre = genfil.find((gen) => gen === genreName);
    if (findedGenre) {
      setErrorMessage("Genre already exists!");
    } else {
      dispatch(addGen(genreName));
      closeModal(setIsOpenG);
    }
  }

  function afterOpenModalD() {
    setModalTitleColor("#f00");
  }
  
  function afterOpenModalA() {
    setModalTitleColor("#f00");
  }
  
  function afterOpenModalG() {
    setModalTitleColor("#f00");
  }
  
  return (
    <div className="all">
      <div className="movie">
        <h2> Movie name:</h2> <input type="text" ref={txtName} />
      </div>

      <div className="director">
        <h2> Director:</h2>
        <select ref={sltDirect}>
          {dirfil.map((df) => (
            <option key={df.id} value={df.id}>
              {df.name}
            </option>
          ))}
        </select>
        <button onClick={() => setIsOpenD(true)}>add director</button>
        <Modal
          isOpen={modalIsOpenD}
          // onAfterOpen={() => (subtitle.style.color = "#f00")}
          onRequestClose={() => closeModal(setIsOpenD)}
          style={customStyles}
          contentLabel="Director Modal"
        >
          <h2 ref={(subtitle) => (subtitle = subtitle)}>director</h2>
          <input type="text" ref={txtDirModal} />
          <button onClick={() => closeModal(setIsOpenD)}>close</button>
          <button onClick={addDirector}>add</button>
          {errorMessage && <p>{errorMessage}</p>}
        </Modal>
      </div>

      <div className="actors">
        <h2> Actors:</h2>
        {actfil.map((act, index) => (
          <div key={act.id}>
            <input ref={(el) => (chkActors.current[index] = el)} type="checkbox" value={act.id} />
            {act.name}
          </div>
        ))}
        <button onClick={() => setIsOpenA(true)}>add actor</button>
        <Modal
          isOpen={modalIsOpenA}
          // onAfterOpen={() => (subtitle.style.color = "#f00")}
          onRequestClose={() => closeModal(setIsOpenA)}
          style={customStyles}
          contentLabel="Actor Modal"
        >
          <h2 ref={(subtitle) => (subtitle = subtitle)}>actor</h2>
          <input type="text" ref={txtActModal} />
          <button onClick={() => closeModal(setIsOpenA)}>close</button>
          <button onClick={addActor}>add</button>
          {errorMessage && <p>{errorMessage}</p>}
        </Modal>
      </div>

      <div className="genres">
        <h2>Genres:</h2>
        {genfil.map((gen, index) => (
          <div key={index}>
            <input ref={(el) => (chkGenres.current[index] = el)} type="checkbox" value={gen} />
            {gen}
          </div>
        ))}
        <button onClick={() => setIsOpenG(true)}>add genres</button>
        <Modal
          isOpen={modalIsOpenG}
          // onAfterOpen={() => (subtitle.style.color = "#f00")}
          onRequestClose={() => closeModal(setIsOpenG)}
          style={customStyles}
          contentLabel="Genre Modal"
        >
          <h2 ref={(subtitle) => (subtitle = subtitle)}>genres</h2>
          <input type="text" ref={txtGenModal} />
          <button onClick={() => closeModal(setIsOpenG)}>close</button>
          <button onClick={addGenre}>add</button>
          {errorMessage && <p>{errorMessage}</p>}
        </Modal>
      </div>

      <div className="save">
        <input
          type="button"
          value="ُSave"
          onClick={() => {
            const selectedActors = chkActors.current
              .filter((checkbox) => checkbox.checked)
              .map((checkbox) => parseInt(checkbox.value));

            const selectedGenres = chkGenres.current
              .filter((checkbox) => checkbox.checked)
              .map((checkbox) => checkbox.value);

            dispatch(
              addMov({
                id: nextid,
                name: txtName.current.value,
                director: sltDirect.current.value,
                actors: selectedActors,
                genres: selectedGenres,
              })
            );

            navigate("/");
          }}
        />
      </div>
    </div>
  );
}

export default Movie;

