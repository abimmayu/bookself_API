const { 
    NotesHandler, 
    viewAllNotesHandler, 
    viewNoteByIdHandler, 
    editNoteByIdHandler,
    deleteNoteByHandler,
  } = require('./handler');
  
  const routes = [
    {
      method: 'POST',
      path: '/notes',
      handler: NotesHandler,
    },
    {
      method: 'GET',
      path: '/notes',
      handler: viewAllNotesHandler,
    },
    {
      method: 'GET',
      path: '/notes/{id}',
      handler: viewNoteByIdHandler,
    },
    {
      method: 'PUT',
      path: '/notes/{id}',
      handler: editNoteByIdHandler,
    },
    {
      method: 'DELETE',
      path: '/notes/{id}',
      handler: deleteNoteByHandler,
    },
  ];
  
  module.exports = routes;