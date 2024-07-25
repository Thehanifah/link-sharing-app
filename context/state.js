"use client"
import {createContext, useState, useEffect} from 'react';

export const StateContext = createContext();




export default function State ({children}){
    const [name, setName] = useState ("");
    const [Lname, setLName] = useState ("");
    const [emailad, setEmailad] = useState ("");
    const [selectedPlatform, setSelectedPlatform] = useState([]);
    const [socialCards, setSocialCards] = useState([]);


    useEffect(() => {
      console.log('State: socialCards updated', socialCards);
  }, [socialCards]);


    const addSocialCard = () => {
      console.log('addSocialCard called');
        setSocialCards(prevCards => {
            const newCard = { id: Date.now(), platform: '', link: '' };
            const updatedCards = [...prevCards, newCard];
            console.log('Updated socialCards:', updatedCards);
            return updatedCards; });

  };

  const updateSocialCard = (id, platform, link) => {
    setSocialCards(prevCards => 
        prevCards.map(card => 
            card.id === id ? { ...card, platform, link } : card
        )
    );
};


    const addPlatform = (platform, link) => {
      setSelectedPlatform((prevPlatforms) => {
          if (!prevPlatforms.some(p => p.platform === platform)) {
              return [...prevPlatforms, { platform, link }];
          }
          return prevPlatforms;
      });
  };

  const removeSocialCard = (id) => {
    setSocialCards(prevCards => prevCards.filter(card => card.id !== id));
  };


    const context = {
      name, 
      setName, 
      Lname, 
      setLName, 
      emailad, 
      setEmailad, 
      selectedPlatform, 
      setSelectedPlatform, 
      addPlatform,
      socialCards,
      addSocialCard,
      updateSocialCard,
      removeSocialCard} 
   

    return <StateContext.Provider value ={context} >
        {children}
    </StateContext.Provider>
}