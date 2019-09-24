import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import {editDetails} from '../../store/actions/projectActions'
import firebase from 'firebase/app'
import 'firebase/firestore'

import TootTip from '@material-ui/core/Tooltip'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit'
import { Divider } from '@material-ui/core'

class EditDetails extends Component {

    state = {
        title:'',
        description:'',
        content:'',
        ingredients:[{name:''}],
        instructions:[{description:''}],
        image: null,
        name: '',
        quantity: '',
        recipe_image_url: '',     
        open: false        
    };     

    handleTitleChange = (e) => {
        console.log(this.state);
        this.setState({
            title: e.target.value
        });
    }

    handledescriptionChange = (e) => {
        this.setState({
            description: e.target.value
        })
    }
    
    addInstructions = (e) => {
        e.preventDefault();
        this.setState({
            instructions: this.state.instructions.concat({description:""})
        })
    }

    handleInstructionChange = (index) => e => {
        
        const newInstructions = this.state.instructions.map((instruction, sidx) => {
            if(index !== sidx) return instruction
            return {...instruction, description: e.target.value}
        });

        this.setState({
            instructions: newInstructions
        })        
    }

    

    handleRemoveInstruction = (e,index) => {
        e.preventDefault();
        if(this.state.instructions.length!=1){
            this.state.instructions.splice(index,1);
            this.setState({
                instructions: this.state.instructions
            })
        }
    }
  
    handleIngredientsNameChange = (index) =>e =>{
        const newIngredients = this.state.ingredients.map((ingredient,sidx) => {
            if(index !==sidx) return ingredient;
            return {...ingredient, name: e.target.value};
        });

        this.setState({
            ingredients: newIngredients
        });
    }

    handleIngredientsQuantityChange = (index) => e => {
        const newIngredients = this.state.ingredients.map((ingredient,sidx) => {
            if(index !==sidx) return ingredient;
            return {...ingredient, quantity: e.target.value};
        });
        this.setState({
            ingredients: newIngredients
        });
    }

    handleAddIngredient = (e) => {
        e.preventDefault();
        
        this.setState({
            ingredients: this.state.ingredients.concat({name:"", quantity:""})
        })
    }



    handleRemove = (e, index) => {
        e.preventDefault();
        if(this.state.ingredients.length!=1){
            this.state.ingredients.splice(index,1);
            this.setState({
                ingredients: this.state.ingredients
            })
        }
        
    }

    // handleEditButton = (index) => (e) =>{
    //     if(this.state.editbutton==="+"){
    //     this.setState({
    //         editbutton: '-'
    //     })} else {
    //         this.setState({
    //             editbutton:'+'
    //         })
    //     }
    //     // console.log(e.target.value);

    // }

    handleSubmit = () =>{
        const db = firebase.firestore();
        
        db.collection('projects').doc(this.props.id).update({
            ...this.state
        });
        this.handleClose();
    }

    handleOpen = () => {
        this.setState({
            open:true
        });        

        // console.log(this.props.project);
        this.mapProjectDetailsToState()
    }    

    handleClose = () => {
        this.setState({
            open: false
        })

    }

    componenetDidMount(){
        this.mapProjectDetailsToState();
        
    }

    mapProjectDetailsToState = () => {
        this.setState({
            title: this.props.project.title? this.props.project.title: '',
            description: this.props.project.description? this.props.project.description: '',
            content: this.props.project.content? this.props.project.content: '',
            ingredients: this.props.project.ingredients? this.props.project.ingredients: '',
            instructions: this.props.project.instructions? this.props.project.instructions: ''
        });
    }

    render() {
        return (
            <Fragment>
                <TootTip title="Edit details" placement="top">
                    <Button onClick={this.handleOpen} className = "btn Edit__button">
                        <EditIcon/>
                    </Button>
                </TootTip>
                <Dialog
                    open = {this.state.open}
                    onClose = {this.handleClose}
                    fullWidth
                    maxWidth = "sm">
                        <DialogTitle>Edit your recipe</DialogTitle>
                        <DialogContent>
                            <form className="editForm__details">
                                <TextField
                                    name="title"
                                    type = "text"
                                    label="Title"
                                    multiline 
                                    // rows = "2"
                                    placeholder = "The title of the recipe"
                                    value = {this.state.title}
                                    onChange = {(e) => this.handleTitleChange(e)}
                                    fullWidth
                                    variant="outlined"
                                    />
                                    <TextField
                                    name="description"
                                    type = "text"
                                    label="Description"
                                    multiline 
                                    // rows = "2"
                                    placeholder = "The title of the recipe"
                                    value = {this.state.description}
                                    onChange = {(e) => this.handledescriptionChange(e)}
                                    fullWidth
                                    variant="outlined"
                                    />

                                    <p>Ingreidients</p>
                                    {
                                        this.state.ingredients.map((ingredient, index) => {
                                            return(
                                                <div className="editIngredientsList">
                                                    <TextField
                                                        name= "name"
                                                        type = "text"
                                                        label= "Item Name"
                                                        multiline 
                                                        // rows = "2"
                                                        placeholder = "The title of the recipe"
                                                        value = {ingredient.name}
                                                        onChange = {this.handleIngredientsNameChange(index)}
                                                        fullWidth
                                                        variant="outlined"
                                                    /> 
                                                    <TextField
                                                        name="quantity"
                                                        type = "text"
                                                        label="Quantity"
                                                        multiline 
                                                        // rows = "2"
                                                        placeholder = "The title of the recipe"
                                                        value = {ingredient.quantity}
                                                        onChange = {this.handleIngredientsQuantityChange(index)}
                                                        fullWidth
                                                        variant="outlined"
                                                    />                
                                                    <Button onClick={(e) => this.handleRemove(e,index)} className="btn pink ligthen-1 z-depth-0">X</Button>                                                                                         
                                                </div>                                                
                                            )
                                        })
                                    }
                                    <Button className="editAddButton btn green z-depth-0" onClick={this.handleAddIngredient}>+</Button>

                                    <p>Instructions</p>
                                    {
                                        this.state.instructions.map((instruction, index) => {
                                            return (
                                                <div className="editInstructionsList">
                                                    <TextField
                                                        name= "name"
                                                        type = "text"
                                                        label= "Item Name"
                                                        multiline 
                                                        // rows = "2"
                                                        placeholder = "The title of the recipe"
                                                        value = {instruction.description}
                                                        onChange = {this.handleInstructionChange(index)}
                                                        fullWidth
                                                        variant="outlined"
                                                    /> 
                                                    <Button onClick={(e) => this.handleRemoveInstruction(e,index)} className="btn pink ligthen-1 z-depth-0">X</Button>
                                                </div>
                                            )
                                        })
                                    }
                                    <Button className="editAddButton btn green z-depth-0" onClick={this.addInstructions}>Add step</Button>


                            </form>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={this.handleSubmit} color="primary">
                                Save
                            </Button>
                        </DialogActions>
                    </Dialog>
            </Fragment>
        )
    }
}
export default EditDetails