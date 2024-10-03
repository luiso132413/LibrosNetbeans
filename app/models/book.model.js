
module.exports = (sequelize, Sequelize) => {
	const Book = sequelize.define('book', {	
	  id_book: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
    },
	  bookname: {
			type: Sequelize.STRING
	  },
	  description: {
			type: Sequelize.STRING
  	},
	  pages: {
			type: Sequelize.STRING
	  },
	  author: {
			type: Sequelize.INTEGER
    },
    copyrightby: {
      type: Sequelize.STRING,
      defaultValue: 'UMG Antigua'
    }
	});
	
	return Book;
}