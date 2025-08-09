import express from 'express';
import { createNote, deleteNote, getAllNotes, updateNote, getNoteById } from '../controllers/notesControllers.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(protect);

router.get('/', getAllNotes);
router.get('/:id', getNoteById);
router.post('/', createNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);


export default router;