// import logo from './logo.svg';
// import React from "react";
// import { useRef, useEffect } from "react";
// import "./App.css";
// import { useSelector, useDispatch } from "react-redux";
// import { dataGen, dataAct, dataDir, dataMov, editMov, mvs } from "./store/slices/MovieSlice";
// import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

// export default function Movies() {

//     const movfil = useSelector(dataMov);
//     const dirfil = useSelector(dataDir);
//     const actfil = useSelector(dataAct);
//     const genfil = useSelector(dataGen);
//     const mv = useSelector(mvs);
//     const navigate = useNavigate();

//     const dispatch = useDispatch();


//     return (
//         // <>

//         //     <table className='table' >
//         //         <tr>
//         //             <td>id</td>
//         //             <td>name</td>
//         //             <td>director</td>
//         //             <td>actors</td>
//         //             <td>genres</td>
//         //             <td>delete</td>
//         //             <td>edit</td>
//         //         </tr>
//         //         {
//         //             movfil.map((mo) => (

//         //                 <tr>
//         //                     <td>{mo.id}</td>
//         //                     <td>{mo.name}</td>
//         //                     <td>{dirfil.find(dir => dir.id == mo.director).name}</td>
//         //                     <td>{mo.actors.map(act => actfil.find(a => a.id == act).name).join(", ")}</td>
//         //                     <td>{mo.genres + ""}</td>
//         //                     <td><Link to={`deleteMovie/${mo.id}`}>delete</Link></td>
//         //                     <td><input type="button" value="edit" onClick={() => { dispatch(editMov(mo.id)); navigate(`/movie/${mo.id}`) }}/></td>
//         //                 </tr>
//         //             ))
//         //         }

//         //     </table>
//         //     <div className='add'> <Link  to="/movie/:id">add</Link></div>

//         // </>

//         <div class="container">
//             <h2>Responsive Tables Using LI <small>Triggers on 767px</small></h2>
//             <ul class="responsive-table">
//                 <li class="table-header">
//                     <div class="col col-1">id</div>
//                     <div class="col col-2"> Name</div>
//                     <div class="col col-3">director</div>
//                     <div class="col col-4">actors</div>
//                     <div class="col col-4">geners</div>
//                     <div class="col col-4">Delete</div>
//                     <div class="col col-4">Edit</div>
//                 </li>
//                 <li class="table-row">
//                     <div class="col col-1" data-label="Job Id">42235</div>
//                     <div class="col col-2" data-label="Customer Name">John Doe</div>
//                     <div class="col col-3" data-label="Amount">$350</div>
//                     <div class="col col-4" data-label="Payment Status">Pending</div>
//                 </li>
//                 <li class="table-row">
//                     <div class="col col-1" data-label="Job Id">42442</div>
//                     <div class="col col-2" data-label="Customer Name">Jennifer Smith</div>
//                     <div class="col col-3" data-label="Amount">$220</div>
//                     <div class="col col-4" data-label="Payment Status">Pending</div>
//                 </li>
//                 <li class="table-row">
//                     <div class="col col-1" data-label="Job Id">42257</div>
//                     <div class="col col-2" data-label="Customer Name">John Smith</div>
//                     <div class="col col-3" data-label="Amount">$341</div>
//                     <div class="col col-4" data-label="Payment Status">Pending</div>
//                 </li>
//                 <li class="table-row">
//                     <div class="col col-1" data-label="Job Id">42311</div>
//                     <div class="col col-2" data-label="Customer Name">John Carpenter</div>
//                     <div class="col col-3" data-label="Amount">$115</div>
//                     <div class="col col-4" data-label="Payment Status">Pending</div>
//                 </li>
//             </ul>
//         </div>
//     );
// }





import logo from './logo.svg';
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { dataGen, dataAct, dataDir, dataMov, editMov, mvs } from "./store/slices/MovieSlice";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { Edit, EditAttributes } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
export default function Movies() {
    const movfil = useSelector(dataMov);
    const dirfil = useSelector(dataDir);
    const actfil = useSelector(dataAct);
    const genfil = useSelector(dataGen);
    const mv = useSelector(mvs);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <div className="container">
            <h2>Movies List</h2>
            <ul className="responsive-table">
                <li className="table-header">
                    <div className="col col-1">ID</div>
                    <div className="col col-2">Name</div>
                    <div className="col col-3">Director</div>
                    <div className="col col-4">Actors</div>
                    <div className="col col-5">Genres</div>
                    <div className="col col-6">Delete</div>
                    <div className="col col-7">Edit</div>
                </li>
                {movfil.map((mo) => (
                    <li className="table-row" key={mo.id}>
                        <div className="col col-1" data-label="ID">{mo.id}</div>
                        <div className="col col-2" data-label="Name">{mo.name}</div>
                        <div className="col col-3" data-label="Director">
                            <td>{dirfil.find(dir => dir.id == mo.director).name}</td>
                        </div>
                        <div className="col col-4" data-label="Actors">
                            {mo.actors.map(act => actfil.find(a => a.id === act)?.name).join(", ")}
                        </div>
                        <div className="col col-5" data-label="Genres">{mo.genres.join(", ")}</div>
                        <div className="col col-6" data-label="Delete">
                            <Button><Link to={`deleteMovie/${mo.id}`}><DeleteOutlineIcon /></Link></Button>
                        </div>
                        <div className="col col-7" data-label="Edit">
                            <Button color="error" onClick={() => { dispatch(editMov(mo.id)); navigate(`/movie/${mo.id}`) }}>
                                <EditIcon />
                            </Button>
                        </div>
                    </li>
                ))}
            </ul>
            <div className='add'>
                <Link to="/movie/:id">Add Movie</Link>
            </div>
        </div>
    );
}
