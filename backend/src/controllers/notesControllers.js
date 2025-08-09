import Note from "../models/Note.js";

// Get all notes for the authenticated user
export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id }).sort({ createdAt: -1 }); // Sort by createdAt in descending order
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getAllNotes controller", error);
    res.status(500).json({message: "Internal server error"});
    
  }
};

// Get a specific note (only if it belongs to the user)
export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user._id });
    if (!note) return res.status(404).json({message: "Note not found"});
    res.json(note); 
    
  } catch (error) {
    console.error("Error in getNoteById controller", error);
    res.status(500).json({message: "Internal server error"});
    
  }
};

// Create a new note for the authenticated user
export const createNote = async (req, res) => {
  try {
    const {title, content} = req.body;
    const note = await Note.create({
      title,
      content,
      user: req.user._id,
    });
    res.status(201).json(note);
  } catch (error) {
    console.error("Error in createNote controller", error);
    res.status(500).json({message: "Internal server error"});
    
  }
};

// Update a note (only if it belongs to the user)
export const updateNote = async (req, res) => {
  try {
    const {title, content} = req.body;
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { title, content },
      { new: true, runValidators: true }
    );
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    
    res.status(200).json(note);
  } catch (error) {
    console.error("Error in updateNote controller", error);
    res.status(500).json({message: "Internal server error"});
    
  }
};

// Delete a note (only if it belongs to the user)
export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    
    res.status(200).json({message: "delete successfully"});
  } catch (error) {
    console.error("Error in deleteNote controller", error);
    res.status(500).json({message: "Internal server error"});
    
  }
};