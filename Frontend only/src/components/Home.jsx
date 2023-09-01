import React, { useEffect, useState, useReducer } from 'react'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';


import Modal from '@mui/material/Modal';

// import itemData from '../ItemData';
import ImageCard from "./ImageCard";
import axios from 'axios';
import ImageUpload from './UploadImage';

function HomePage() {
  
  // PendingActions  + Backend merged version for data


  // Initial Import of Images (needs to be sent into a React Context)
  const [images,setImages] = useState([])
  var accessMetaData = {}


  // Created a Modal for opening to image to setup Actions
  const [open, setOpen] = useState(false);
  const [selectedImage,setSelectedImage] = useState();
  const [timeoutId, settimeoutID] = useState();

  const [PendingActions,setPendingActions] = useState([]);
  

  function addAction(action) {
    setPendingActions([action,...PendingActions])
  }

  useEffect(() => {
    console.log(PendingActions)
  }, [PendingActions])
  

  // General Debounce code for any functional usecase 
  const debounce = (func, delay) => {
    return (...args) => {
      clearTimeout(timeoutId);

      var timooutID = setTimeout(() => {
        func(...args);
      }, delay);

      settimeoutID(timooutID)
    };
  };

  // Send PendingActions to the backend using the debounced function
  const debouncedSyncToBackend = debounce(() => {
    if (PendingActions.length > 0) {
      axios.post('localhost:5000/api/sync', { actions: PendingActions })
        .then((response) => {
          // Handle response and update client-side state if needed
          console.log('Actions synced:', response.data);
        })
        .catch((error) => {
          console.error('Error syncing actions:', error);
        })
        .finally(() => {
            setPendingActions([])
          ([]); // Clear pending actions
        });
    }
  }, 30000); // Debounce delay of 30 seconds

  
  // Declare an API Call to sync the data from client-side to server-side

  
  const handleOpen = (evt) => {
    setSelectedImage(accessMetaData[evt.target.alt])
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }
  
  useEffect(() => {

    fetch("http://localhost:5000/api/images")
      .then((res) => {
        
        res.json().then((images) => {
          console.log("res = " + JSON.parse(JSON.stringify(images)))
          setImages(JSON.parse(JSON.stringify(images)))
        });
        
      })
    // useContext React 

    // Call an API from backend to access images and set it to images variable
    // After that replace all itemData variable name with images variable name
    // use the setImages function to set Image

    /*
    [
      {
        img: pixel render data
        metadata1:
        metadata2:
        . . . . . . 

      },
      . . . . . . .
    ]
    
    */
    // Setting up an easier way to access elements based on id one-time loading
    // This could be lazy loaded as well
    // Also get the data in a paginated way 
    images.forEach(item => {
      var itemChanged = PendingActions.find((a) => a["id"] === item["id"])
      if(itemChanged) {
        accessMetaData[item["id"]] = itemChanged
      }
      else {
        accessMetaData[item["id"]] = item;
      }
    })

    // When starting to implement search
    // Create another debouncing algorrithm to make search every 500ms
    // of Input change to backend instead of search on frontend 
    // (This'll be a more secure and faster way with pagination)


  }, [])

  


  return (
  <div>
    <ImageUpload /> 
    <ImageList sx={{ width: "100%", height: "100%" }}  cols={3} rowHeight={400}>
      {images.map((item, i) => (
        <ImageListItem key={i}>
          <img
            src={"./img.jpg"}
            alt={item.id}
            loading="lazy"
            onClick={handleOpen}
          />
        </ImageListItem>
      ))}
    </ImageList>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ImageCard selectedImage={selectedImage} addAction={addAction} handleClose={handleClose}></ImageCard>
      
      
      </Modal>
      

  </div>
  )
}

export default HomePage;
