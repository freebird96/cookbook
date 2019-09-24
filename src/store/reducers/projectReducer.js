import { stat } from "fs";

const initState = {
    projects: [
        {id: '1', title: 'Help me find the peach', content: 'blah blah blah blah'},
        {id: '2', title: 'Egg hunt with yoshi', content: 'blah blah blah blah'}, 
        {id: '3', title: 'collect all the stars', content: 'blah blah blah blah'}
    ]
}

const projectReducer = (state = initState, action) => {
    switch(action.type){
        case 'CREATE_PROJECT':
            console.log('created project', action.project);
            return state;
        case 'CREATE_PROJECT_ERROR':
            console.log('create project error', action.error);
            return state;
        // case 'EDIT_PREOJECT':
        //     console.log("edit successfull");
        //     return state;
        // case 'EDIT_PREOJECT_ERROR':
        //     console.log("edit not successfull");
            return state;
        default: 
            return state;
    }
}

export default projectReducer