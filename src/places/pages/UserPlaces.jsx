import React from 'react'
import { useParams } from 'react-router-dom'

import PlaceList from '../components/PlaceList'

const DUMMY_PLACES = [
    { 
      id: 'p1' ,
     title: 'Empire State Building' ,
     description: 'One of the most iconic sky scrapers in the world!',
     imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/266px-Empire_State_Building_%28aerial_view%29.jpg',
     address: '20 W 34th St, New York, NY 10001',
     location: {
        lat: 40.7484405,
        lng: -73.9878584,
     },
     creator: 'u1'
    },
    {
        id: 'p2' ,
        title: 'Empire State Building' ,
        description: 'One of the most iconic sky scrapers in the world!',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/266px-Empire_State_Building_%28aerial_view%29.jpg',
        address: '20 W 34th St, New York, NY 10001',
        location: {
           lat: 40.7484405,
           lng: -73.9878584,
        },
        creator: 'u2'
    } 
   
] 

const UserPlaces = () => {
   const { userId } = useParams(); // Получаем userId из параметров
   const user = { id: userId }; // Создаем объект user с userId 
 const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId)
  return <PlaceList items={loadedPlaces} />
}

export default UserPlaces