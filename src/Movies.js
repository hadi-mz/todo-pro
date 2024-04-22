import logo from './logo.svg';
import React from "react";
import { useRef, useEffect } from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { dataGen, dataAct, dataDir, dataMov,editMov,mvs } from "./store/slices/MovieSlice";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// export loader(){
//     return 0
// }

export default function Movies() {

    const movfil = useSelector(dataMov);
    const dirfil = useSelector(dataDir);
    const actfil = useSelector(dataAct);
    const genfil = useSelector(dataGen);
    const mv = useSelector(mvs);
    const navigate = useNavigate();

    const dispatch = useDispatch();

   
    return (
        <>
           
            <table className='table' >
                <tr>
                    <td>id</td>
                    <td>name</td>
                    <td>director</td>
                    <td>actors</td>
                    <td>genres</td>
                    <td>delete</td>
                    <td>edit</td>
                </tr>
                {
                    movfil.map((mo) => (
                        
                        <tr>
                            <td>{mo.id}</td>
                            <td>{mo.name}</td>
                            <td>{dirfil.find(dir => dir.id == mo.director).name}</td>
                            <td>{mo.actors.map(act => actfil.find(a => a.id == act).name).join(", ")}</td>
                            <td>{mo.genres + ""}</td>
                            <td><Link to={`deleteMovie/${mo.id}`}>delete</Link></td>
                            <td><input type="button" value="edit" onClick={() => { dispatch(editMov(mo.id)); navigate(`/movie/${mo.id}`) }}/></td>
                        </tr>
                    ))
                }

            </table>
            <div className='add'> <Link  to="/movie/:id">add</Link></div>

        </>
    );
}

