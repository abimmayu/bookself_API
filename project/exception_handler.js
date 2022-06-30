const { nanoid } = require('nanoid');
const notes = require('./notes');

const NotesHandler = (request, h) => {
  const { title, tags, body } = request.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNotes = {
    title, tags, body, id, createdAt, updatedAt,
  };

  notes.push(newNotes);

  
  
  const isSucces = notes.filter((note) => note.id === id).length > 0;

  if (isSucces) {
    const response = h.response({
      status: 'Succes',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  }



  const response = h.response({
    status: 'Fail',
    message: 'Catatan gagal ditambahkan',
  });
  response.code(500);
  return response;
};
const viewAllNotesHandler = () => ({
  status: 'Succes',
  data: {
    notes,
  },
});



const viewNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const note = notes.filter((n) => n.id === id)[0];

  if (note !== undefined) {
    return {
      status: 'Succes',
      data: {
        note,
      },
    };
  }



  const response = h.response({
    status: 'Fail',
    message: 'Catatan tidak ditemukan',
  });
  response.code(404);
  return response;
};



const editNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  const { title, tags, body } = request.payload;
  const updatedAt = new Date().toISOString();
  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };

    const response = h.response({
      status: 'Succes',
      message: 'Catatan berhasil diperbarui',
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'Fail',
    message: 'gagal memperbarui catatan, id tidak ditemukan',
  });
  response.code(404);
  return response;
};



const deleteNoteByHandler = (request, h) => {
  const { id } = request.params;
  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: 'Succes',
      message: 'Catata berhasil dihapus',
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'Fail',
    message: 'gagal menghapus catatan, id tidak ditemukan',
  });
  response.code(404);
  return response;
};



module.exports = {
  NotesHandler,
  viewAllNotesHandler,
  viewNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByHandler,
};
