import React, { Component } from 'react'
import {connect} from 'react-redux'
import {createProject} from '../../store/actions/projectActions'
import { Redirect } from 'react-router-dom'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import firebase from 'firebase/app'
import 'firebase/storage'

class CreateProject extends Component {
    // constructor(props){
    //     super(props)

    //     this.ingredientInput = React.createRef();
    // }

    state = {
        title:'',
        description:'',
        content:'',
        ingredients:[{name:''}],
        instructions:[{description:'',recipe_image_url: ''}],
        image: null,
        url: '',
        name: '',
        quantity: '',
        recipe_image_url: ''        
    }

    handleChange = (e, index) =>{
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleIngredientChange =(index) => e =>{ 
        const newIngredients = this.state.ingredients.map((ingredient,sidx) => {
            if(index !==sidx) return ingredient;
            return {...ingredient, name: e.target.value};
        });

        this.setState({
            ingredients: newIngredients
        });
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

    handleQuantityChange = (index) => e =>{
        
        const newIngredients = this.state.ingredients.map((ingredient,sidx) => {
            if(index !==sidx) return ingredient;
            return {...ingredient, quantity: e.target.value};
        });

        this.setState({
            ingredients: newIngredients
        });
        

    }

    handleImageChange = (e) => {
        let image = e.target.files[0];
        const hash = Math.floor(Math.random()*Math.pow(10,9));
        console.log(image);
        if(e.target.files[0]){            
            this.setState(() => ({
                image: image.name
            }));
        }
        const storage = firebase.storage();
        const uploadTask = storage.ref(`images/${hash}`).put(image);
        uploadTask.on('state_changed', 
        (snapshot) => {
            //shows the progress of the image load...
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
              case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
            }
        }, 
        (error) => {
            console.log("Error in uploading the pic");
        }, 
        () => {
            uploadTask.snapshot.ref.getDownloadURL().then(url =>{
                console.log(url);
                this.setState({url});
            })
        });
        console.log(this.state);
    }

    handleInstructionImageChange = (index) => e => {
        const image = e.target.files[0];
        const hash = Math.floor(Math.random()*Math.pow(10,9));

        const storage = firebase.storage();
        const uploadTask = storage.ref(`images/${hash}`).put(image);
        uploadTask.on('state_changed',
        (snapshot) => {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
              case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
            }
        },
        (error) => {
            console.log("Error in Instruction image")
        },
        () => {
            uploadTask.snapshot.ref.getDownloadURL().then(url => {
                console.log("url"+ url);
                const newInstructions = this.state.instructions.map((instruction, sidx) => {
                    if(index !== sidx) return instruction
                    return {...instruction, recipe_image_url: url}
                });
        
                this.setState({
                    instructions: newInstructions
                })
            })
        });
    }

    handleEditPicure = () =>{
        const fileInput = document.getElementById('imageInput');
        fileInput.click();
    }

    handleInstructionPicure =() =>{
        const fileInput = document.getElementById('instructionInput');
        fileInput.click();
    }
    

    handleSubmit = (e) =>{
        e.preventDefault();
        console.log("state"+ this.state);
        this.props.createProject(this.state);
        this.props.history.push('/');
    }

    addIngredient = (e) =>{
        e.preventDefault();
        const size = this.state.ingredients.length;
        
        this.setState({
            ingredients: this.state.ingredients.concat({name:"", quantity:""})
        })
    }

    addInstructions = (e) => {
        e.preventDefault();
        this.setState({
            instructions: this.state.instructions.concat({description:"", recipe_image_url:""})
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

    handleRemoveInstruction = (e,index) => {
        e.preventDefault();
        if(this.state.instructions.length!=1){
            this.state.instructions.splice(index,1);
            this.setState({
                instructions: this.state.instructions
            })
        }
    }


    render() {
        const { auth } = this.props;
        

        if(!auth.uid) return <Redirect to='/signin'/>

        return (
            <div className = "container create-container">                
                <div className="imageSpace">
                {
                    this.state.url ===""?
                        <button className="createRecipe--titleimageButton" onClick ={this.handleEditPicure} >
                                <input
                                    type="file"
                                    id="imageInput"
                                    hidden="hidden"
                                    onChange={this.handleImageChange}
                                    />                            
                                    <AddAPhotoIcon/>
                                    <p>Upload a photo</p>   
                        </button>:
                        <img src={this.state.url} alt="Smiley face" height="400px" width="auto"></img>
                }
                    
                </div>
                <form  className = "white create-form">
                    <div className="createRecipe--title">
                        <h3 className="createRecipe--titleText">Create Recipe</h3>
                    </div>
                    
                    <div className="input-field">
                        <label htmlFor="title"></label>
                        <input placeholder ="Recipe Title" type="text" class="validate" id="title" onChange={this.handleChange}/> 
                    </div>
                    <div className="input-field">
                        <label htmlFor="description"></label>
                        <input placeholder="Tell the story of the dish....." id="description" type="text" class="validate" onChange={this.handleChange}/>
                    </div>   
                    
                    <div className="createIngredients">
                        <h5 className="createForm--titles">Ingredients</h5>
                        {
                            this.state.ingredients.map((ingredient, index) => {
                                return (
                                    <div className="inputField" key={index}>
                                        <div className="inputField--content">
                                            <input                                        
                                                type="text"
                                                placeholder = "100g"
                                                value = {ingredient.quantity}
                                                onChange={this.handleQuantityChange(index)}
                                            />
                                        </div>
                                        <div className="inputField--content">
                                            <input                                            
                                                type="text"
                                                placeholder = "Wheat flour"
                                                value = {ingredient.name}
                                                onChange={this.handleIngredientChange(index)}
                                            /> 
                                        </div> 
                                        <div className = "inputField--button">
                                            <button onClick={(e) => this.handleRemove(e,index)} className="btn pink ligthen-1 z-depth-0 ">X</button>
                                        </div>                                         
                                    </div>
                                )
                            })
                        }
                        <div className="ingredientAdd">
                            <button className="btn pink ligthen-1 z-depth-0" onClick = {(e) =>this.addIngredient(e)}>+</button>
                        </div>
                    </div>
                    
                    <div className="createInstructions">
                        <h5 className="createForm--titles">steps</h5>
                        {
                            this.state.instructions.map((instruction, index) => {
                                return (
                                    
                                    <div className="input-field" key={index}>
                                        <input id="content" 
                                        placeholder="Write the instruction..."
                                        onChange={this.handleInstructionChange(index)} 
                                        value={instruction.description}></input> 

                                        {this.state.instructions[index].recipe_image_url==""?
                                        <div className="uploadArea">
                                            <Button onClick ={this.handleInstructionPicure} class= "createInstructions--imageAddButton">              
                                                    <input
                                                    type="file"
                                                    id="instructionInput"
                                                    multiline
                                                    hidden="hidden"
                                                    onChange={this.handleInstructionImageChange(index)}
                                                    />                                                   
                                                    <AddAPhotoIcon/>
                                                    <p>Please upload a instruction pic</p>
                                            </Button>
                                        </div>:<img src={this.state.instructions[index].recipe_image_url} height="100" width="100"></img>}
                                        <div className="createInstruction--removeButton--div">
                                            <button onClick={(e) => this.handleRemoveInstruction(e,index)} className="btn pink createInstruction--removeButton">X</button> 
                                            </div>                                                
                                    </div>
                                )
                            })
                        }                                               
                    </div>
                    <div className="Addbutton">
                        <button className="btn pink ligthen-1 z-depth-0" onClick = {(e) =>this.addInstructions(e)}>Add Instructions</button>
                    </div> 

                    
                    
                    <div className="input-field center">
                        <button onClick={(e) => this.handleSubmit(e)} className="btn pink ligthen-1 z-depth-0 ">Publish Recipe</button>
                    </div>
                </form>                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createProject: (project) => dispatch(createProject(project))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject)
