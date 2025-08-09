import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import RateLimitedUI from '../components/RateLimitedUI.jsx'
import NoteCard from '../components/NoteCard.jsx'
import NotesNotFound from '../components/NotesNotFound.jsx'

import api from '../lib/axios.js'
import toast from 'react-hot-toast'

const HomePage = ({ toggleTheme, theme, user, setUser }) => {
  const [isRateLimited, setIsRateLimited] = useState(false)
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNotes = async () => {
      // Only fetch notes if user is logged in
      if (!user) {
        setLoading(false);
        return;
      }
      
      try {
        const res = await api.get('/notes')
        console.log(res.data) 
        setNotes(res.data)
        setIsRateLimited(false) 
      } catch (error) {
        console.log('Error fetching notes:', error);
        if (error.response?.status === 429) {
          setIsRateLimited(true) // Set rate limit status if 429 error
          }else if (error.response?.status === 401) {
          toast.error("Please log in to view your notes")
        } else {
          toast.error("Failed to load notes") 
        }
      } finally {
        setLoading(false) // Set loading to false after fetching 
      } 
      };
      fetchNotes();
      }, [user]);
  
      // Show login prompt if user is not authenticated
  if (!user) {
    return (
      <div className="min-h-screen">
        <Navbar user={user} setUser={setUser} toggleTheme={toggleTheme} theme={theme} />
        <div className='max-w-7xl mx-auto p-4 mt-6 text-center'>
          <h2 className='text-2xl font-bold mb-4'>Welcome to Notes App</h2>
          <p className='text-gray-600 mb-6'>Please log in to view and create your notes.</p>
        </div>
      </div>
    );
  }
  
  return (
  <div className="min-h-screen">
    <Navbar user={user} setUser={setUser} toggleTheme={toggleTheme} theme={theme} />

    {isRateLimited && <RateLimitedUI />} 

    <div className='max-w-7xl mx-auto p-4 mt-6'>
      {loading && <div className='text-center text-primary py-10'>Loading notes...</div>}

      {notes.length === 0 && !isRateLimited && <NotesNotFound />}

      {notes.length > 0 && !isRateLimited && (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {notes.map((note) => (
            <NoteCard key={note._id} note={note} setNotes={setNotes} />
          ))}
        </div>
      )}
    </div>
  </div>
);

}

export default HomePage
