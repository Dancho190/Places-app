import React, { useEffect, useState, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import Input from '../../shared/components/FormElements/Input'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import Button from '../../shared/components/FormElements/Button'
import Card from '../../shared/components/UIElements/Card'
import { useForm } from '../../shared/hooks/form-hook'
import { useHttpClient } from '../../shared/hooks/http-hook'
import { AuthContext} from '../../shared/context/auth-context'
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/util/validators'
import './PlaceForm.css'


const UpdatePlace = () => {
  const auth = useContext(AuthContext)
  const {isLoading, error,sendRequest, clearError } = useHttpClient()
  const [loadedPlace, setLoadedPlace] = useState()
  const placeId = useParams().placeId
  const navigate = useNavigate()

 const[formState, inputHandler, setFormData] = useForm(
  {
    title: {
      value: '',
      isValid: false
    },
    description:{
      value: '',
      isValid: false
    }
  }, 
  false
)

useEffect(() => {
  const fetchPlace = async () => {
    try{
    const responceData = await sendRequest(
      `http://localhost:5000/api/places/${placeId}`
      )
      setLoadedPlace(responceData.place)
      setFormData(
        {
        title: {
          value: responceData.place.title,
          isValid: true
        },
        description: {
          value: responceData.place.description,
          isValid: true
        }
      },
      true
    )
    } catch(err) {}
  }
  fetchPlace()
},
[sendRequest, placeId, setFormData])



const placeUpdateSubmitHandler = async event => {
  event.preventDefault()
  try {
  await sendRequest(
    `http://localhost:5000/api/places/${placeId}`,
    'PATCH',
    JSON.stringify ({
      title: formState.inputs.title.value,
      description: formState.inputs.description.value
    }),
    {
      'Content-Type':'application/json',
      Authorization: 'Bearer ' + auth.token
    }
  )
  navigate('/' + auth.userId + "/places")
} catch(err) {}
}

if (isLoading) {
  return (
    <div className="center">
     <LoadingSpinner />
    </div>
  )
}

  if(!loadedPlace && !error){
  return (
   <div className="center">
    <Card>
    <h2>Could not find the place</h2>
    </Card>
   </div>
  )
}

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
 {!isLoading && loadedPlace && (
  <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
    <Input 
    id="title" 
    element="input" 
    type="text" 
    label="Title" 
    validators={[VALIDATOR_REQUIRE()]}
    errorText="Please enter the valid title."
    onInput={inputHandler}
    initialValue={loadedPlace.title}
    initialValid={true}
    />
       <Input 
    id="description" 
    element="input" 
    type="textarea" 
    label="Description" 
    validators={[VALIDATOR_MINLENGTH(5)]}
    errorText="Please enter the valid description.(at least 5 charecters)."
    onInput={inputHandler}
    initialValue={loadedPlace.description}
    initialValid={true}
    />
    <Button type="submit" disabled={!formState.isValid}>
        UPDATE PLACE
    </Button>
  </form>
  )}
  </React.Fragment>
  )
}

export default UpdatePlace