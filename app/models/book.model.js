module.exports = (sequelize, Sequelize) => {
	const Book = sequelize.define('book', {
	  id_book: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
	  },
	  titulo: {
		type: Sequelize.STRING
	  },
	  autor: {
		type: Sequelize.STRING
	  },
	  isbn: {
		type: Sequelize.STRING
	  },
	  editorial: {
		type: Sequelize.STRING
	  },
	  anio_publicacion: {
		type: Sequelize.INTEGER
	  },
	  categoria: {
		type: Sequelize.STRING
	  },
	  cantidad_disponible: {
		type: Sequelize.INTEGER
	  },
	  ubicacion: {
		type: Sequelize.STRING
	  }
	});
  
	return Book;
  };
  