export const createProject = (project) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        // make async call to the database 
        //project: project can also be called project
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;

        console.log("hello", firestore);

        firestore.collection('projects').add({
            ...project,
            authorFirstName: profile.firstName,
            authorLastName: profile.lastName,
            authorId: authorId,
            createdAt: new Date()
        }).then((resp) => {
            dispatch({type: 'CREATE_PROJECT', project: project});
        }).catch((err) => {
            dispatch({type: 'CREATE_PROJECT_ERROR', err });
        })
        
    }
};

// export const uploadImage = (formData) => {
//     return (dispatch, getState)
// }

// export const editDetails = (project) => {
//     return (dispatch, getState, {getFirebase, getFirestore}) => {
//         firestore.collection('projects').doc().update({
//             ...project,
//             authorFirstName: profile.firstName,
//             authorLastName: profile.lastName,
//             authorId: authorId,
//             createdAt: new Date()
//         }).then(() => {
//             dispatch({type: 'EDIT_PREOJECT', project: project});
//         }).catch((err) => {
//             dispatch({type: 'EDIT_PREOJECT_ERROR', err });
//         })
//     }

// }