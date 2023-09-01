import { useEffect, useReducer } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faStar} from "@fortawesome/free-regular-svg-icons"
import {faStar as SolidfaStar} from "@fortawesome/free-solid-svg-icons"
import { TextField,IconButton, Button } from '@mui/material';


function ImageReducer(state,action) {
  switch(action.type) {
    case "SET_FAVOURITE": {
      return {
        ...state,
        Favourite: action.Favourite
      };
    }
    case "SET_TITLE": {
      return {
        ...state,
        title: action.title
      }
    }
    default:
      return state;
  }
}


function ImageCard({selectedImage,addAction,handleClose}) {

  const [imageActions, ImageDispatcher] = useReducer(ImageReducer, selectedImage);
  
  // Modal Styling
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  
  useEffect(() => {
    // console.log("Actions",imageActions)
  },[imageActions])

  function handleAddAction() {
    if(imageActions != selectedImage) {
      addAction(imageActions)
    }
    else {
      return;
    }
    handleClose();
  }
  
  return(
    <div>
    {
      imageActions ? 
      <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        <TextField
          id="title"
          label="imgTitle"
          value={imageActions.title ? imageActions.title : "Undefined Title"} 
          onChange={(e) => {ImageDispatcher({type: "SET_TITLE",title: e.target.value})}}
          
        />
        
        <IconButton aria-label="Favorite" onClick={() => ImageDispatcher({type:"SET_FAVOURITE",Favourite: !imageActions.Favourite})}>
          {
            imageActions.Favourite ?
            <FontAwesomeIcon icon={SolidfaStar} color='red' />
            : 
            <FontAwesomeIcon icon={faStar} color='red'/>
          }
        </IconButton>
      </Typography>
      
      
      <img src={imageActions.img ? imageActions.img : ""} width={700} ></img>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        
      </Typography>
      
      {/* Add a Submit Button into this Modal Page , call the addAction function sent into this code by HomePage
        To include our current changes into All Actions
      */}


      <Button variant="text" onClick={()=>handleAddAction()}>
        Submit
      </Button>

    </Box>
    
    : 
    
    <Typography variant="h1" color="initial">
      No Image selected But Modal Opened due to some error
    </Typography>
    }

    </div>
    
  )
}

export default ImageCard
