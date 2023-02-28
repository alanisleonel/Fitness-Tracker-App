import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Exercise = ({ exercise, deleteExercise }) => (
  <tr>
    <td>{exercise.username}</td>
    <td>{exercise.description}</td>
    <td>{exercise.duration}</td>
    <td>{exercise.date.substring(0,10)}</td>
    <td>
      <Link to={`/edit/${exercise._id}`}>Edit</Link> | <a href="#" onClick={() => { deleteExercise(exercise._id) }}>Delete</a>
    </td>
  </tr>
)

const ExercisesList = () => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/exercises/')
     .then(response => {
       setExercises(response.data);
     })
     .catch((error) => {
        console.log(error);
     })
  }, []);

  const deleteExercise = (id) => {
    axios.delete(`http://localhost:5001/exercises/${id}`)
      .then(res => console.log(res.data));
    setExercises(exercises.filter(el => el._id !== id))
  }

  const exerciseList = () => {
    return exercises.map(currentexercise => {
      return <Exercise exercise={currentexercise} deleteExercise={deleteExercise} key={currentexercise._id}/>;
    })
  }

  return (
    <div>
      <h3>Logged Exercises</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          { exerciseList() }
        </tbody>
      </table>
      <div> 
        <center>
            <img src="/gitfitbanner.png" width="800" alt=""></img>
        </center>
      </div>
    </div>
  )
}

export default ExercisesList;