import React, { useContext, useState } from 'react'
import productContext from './Productcontext'
export default function Productstate(props) {

    const [products,setProducts] = useState(
        [
            {
              "title": "SleekX Pro",
              "description": "Introducing the SleekX Pro, where style meets innovation. With its stunning design and cutting-edge features, this smartphone is engineered to exceed your expectations. Experience seamless performance, vibrant display, and unrivaled camera capabilities. Elevate your mobile experience with SleekX Pro."
            },
            {
              "title": "TechNova Ultra",
              "description": "Meet the TechNova Ultra, the epitome of technological excellence. Packed with powerful hardware and intelligent software, this device is designed to keep up with your fast-paced lifestyle. Immerse yourself in a world of crystal-clear visuals, lightning-fast performance, and unparalleled connectivity. Discover the next level of mobile innovation with TechNova Ultra."
            },
            {
              "title": "EcoTech Harmony",
              "description": "The EcoTech Harmony is more than just a smartphone, it's a commitment to sustainability. Crafted with eco-friendly materials and energy-efficient technology, this device brings harmony to both you and the environment. Enjoy a seamless user experience, long-lasting battery life, and a suite of eco-conscious features. Join the movement towards a greener future with EcoTech Harmony."
            },
            {
              "title": "GigaMax Fusion",
              "description": "Unleash the power of possibilities with the GigaMax Fusion. This revolutionary smartphone combines advanced performance with unmatched versatility. From gaming to productivity, photography to entertainment, experience it all on a breathtaking display with lightning-fast speeds. Get ready to redefine your mobile experience with GigaMax Fusion."
            },
            {
              "title": "Zenith Plus Pro",
              "description": "Elevate your expectations with the Zenith Plus Pro. Designed for those who demand excellence, this flagship smartphone offers unparalleled performance and sophistication. Dive into a world of immersive visuals, powerful productivity, and unparalleled security. Experience the pinnacle of mobile technology with Zenith Plus Pro."
            }
          ]
          
    )

  return (
    <div>
        {/* If you wrap productContext tag around any element then props.Children would appear there automatically */}
        <productContext.Provider value={{products,setProducts}}>
            {props.children} 
        </productContext.Provider>
    </div>
  )
}
