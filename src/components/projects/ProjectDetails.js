import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import firebase from 'firebase/app'
import 'firebase/firestore'

import EditDetails from './EditDetails'
import { SvgIcon } from '@material-ui/core'


const ProjectDetails = (props) => {
    const {project, auth, id, db} = props;
    
    if(!auth.uid) return <Redirect to='/signin'/>
    
    console.log(project);

    const handleDelete = (e) => {
        // const {id} = props
        e.preventDefault();
        db.collection('projects').doc(id).delete();
        console.log("delete success");
        props.history.push('/');
    };
    
    
    
    if(project){
        
        return (
            <div className="container-project-details">
                <div className="details-card">
                    <div className="card-content">
                        <div className="recipeImage">
                            <figure className="recipeImage--item">
                                <img src={project.url? project.url:"https://cdn-ds.com/noimage/w_1920/noimage.jpg"} alt="" className="recipeImage--pic"/>
                            </figure>                        
                        </div>
                        <div className="card-display">                        
                            <div className="card-title">
                                <h4 className="card-title__text">{ project.title }</h4> 
                            </div>

                            <div className="recipe-description">
                                <p>{project.description}</p>
                            </div>
                            
                            <div className="subpart">
                                <h5 className="ingredients-title heading">Ingredients</h5>                       
                                {
                                    project.ingredients!==""?project.ingredients.map((ingredient,index) => {
                                    return (
                                        ingredient.name!==""&&ingredient.quanity!==""?
                                        <div className="ingredientsList">
                                            <li className="ingredientsList--item">{ingredient.quantity}{ingredient.name}</li>
                                        </div>:''
                                        
                                    )}):''
                                } 
                            </div>
                            
                            <div className="subpart">
                                <h5 className="instructions-title heading">Cooking instructions</h5>                       
                                {
                                    project.instructions.map((instruction,index) => {
                                    return (
                                        
                                        <div value={index+1} className="instructions">
                                            <div className="instructionsList">
                                                <p value={index} className="instructionsList--item">{instruction.description}</p>
                                                <img src={instruction.recipe_image_url} alt="" className="primage"/>                                                                             
                                            </div>  
                                            
                                        </div>
                                    )})
                                }
                            </div>
                            
                            <div className="card-action grey lighten-4 grey-text">
                                <div>Posted by {project.authorFirstName} {project.authorLastName}</div>
                                <div>{moment(project.createdAt.toDate().toString()).calendar()}</div>
                            </div>
                            <div className="buttons">
                                <button onClick = {(e) => handleDelete(e)} className = "btn button">Delete</button>
                                <EditDetails project = {project} id={id}/>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }else{
        return(
            <div className = "container center">
                <h3>Loading Project....</h3>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const projects = state.firestore.data.projects;
    const project = projects? projects[id]: null;
    const db = firebase.firestore();
    // console.log(projects);
    return {
        project: project,
        auth: state.firebase.auth,
        id,
        db
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'projects'}
    ])
    )(ProjectDetails)
