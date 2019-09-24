import React from 'react'
import moment from 'moment'
import { strict } from 'assert'
import Tooltip from '@material-ui/core/Tooltip';

const ProjectSummary = ({project}) =>{
    return (        
        <div className="card z-depth-0 project-summary">
            <div className="summary-card-content grey-text text-darken-3">
                <Tooltip disableFocusListener title={project.title} placement="bottom-start">
                    <h3 className="summaryTitle">{
                        project.title.length >19? project.title.slice(0,15).concat("...."):project.title
                        }</h3>
                </Tooltip>
                <p>Posted by {project.authorFirstName} {project.authorLastName} </p>
                <p className="grey-text">{moment(project.createdAt.toDate().toString()).calendar()}</p>
            </div>
            <div className="summaryImage">
                <img src={project.url? project.url:"https://cdn-ds.com/noimage/w_1920/noimage.jpg"} alt="Final Image" className="summaryImage--item"/>
            </div>
        </div>
    )
}

export default ProjectSummary