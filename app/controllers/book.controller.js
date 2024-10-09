

const db = require('../config/db.config.js');
const Book = db.Book;

exports.create = (req, res) => {
    console.log(req.body); // Imprimir el cuerpo de la solicitud para depurar

    let book = {};

    try {
        // Creando objeto Book a partir de los datos de la solicitud
        book.titulo = req.body.titulo;  // Asegúrate de que estás usando 'titulo'
        book.autor = req.body.autor;      // Asegúrate de que estás usando 'autor'
        book.isbn = req.body.isbn;        // Asegúrate de que estás usando 'isbn'
        book.editorial = req.body.editorial;  // Asegúrate de que estás usando 'editorial'
        book.anio_publicacion = req.body.anio_publicacion;  // Asegúrate de que estás usando 'anio_publicacion'
        book.categoria = req.body.categoria;  // Asegúrate de que estás usando 'categoria'
        book.cantidad_disponible = req.body.cantidad_disponible;  // Asegúrate de que estás usando 'cantidad_disponible'
        book.ubicacion = req.body.ubicacion;  // Asegúrate de que estás usando 'ubicacion'

        // Guardar en la base de datos MySQL
        Book.create(book).then(result => {
            res.status(200).json({
                message: "Libro creado exitosamente con id = " + result.id_book,
                book: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear el libro",
            error: error.message
        });
    }
}

exports.retrieveAllBooks = (req, res) => {
    // Recuperar todos los libros
    Book.findAll()
        .then(books => {
            res.status(200).json({
                message: "Libros recuperados exitosamente",
                books: books
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error al recuperar los libros",
                error: error
            });
        });
}

exports.getBookById = (req, res) => {
    let bookId = req.params.id;

    Book.findByPk(bookId)
        .then(book => {
            if (!book) {
                res.status(404).json({
                    message: "Libro no encontrado con id = " + bookId,
                });
            } else {
                res.status(200).json({
                    message: "Libro recuperado exitosamente con id = " + bookId,
                    book: book
                });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error al recuperar el libro con id = " + bookId,
                error: error
            });
        });
}

exports.updateById = async (req, res) => {
    try {
        let bookId = req.params.id;
        let book = await Book.findByPk(bookId);

        if (!book) {
            res.status(404).json({
                message: "Libro no encontrado para actualizar con id = " + bookId,
            });
        } else {
            let updatedObject = {
                titulo: req.body.titulo,
                autor: req.body.autor,
                isbn: req.body.isbn,
                editorial: req.body.editorial,
                anio_publicacion: req.body.anio_publicacion,
                categoria: req.body.categoria,
                cantidad_disponible: req.body.cantidad_disponible,
                ubicacion: req.body.ubicacion
            }

            let result = await Book.update(updatedObject, { returning: true, where: { id_book: bookId } });

            if (!result) {
                res.status(500).json({
                    message: "Error al actualizar el libro con id = " + req.params.id,
                    error: "No se pudo actualizar",
                });
            }

            res.status(200).json({
                message: "Libro actualizado exitosamente con id = " + bookId,
                book: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar el libro con id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try {
        let bookId = req.params.id;
        let book = await Book.findByPk(bookId);

        if (!book) {
            res.status(404).json({
                message: "No existe un libro con id = " + bookId,
                error: "404",
            });
        } else {
            await book.destroy();
            res.status(200).json({
                message: "Libro eliminado exitosamente con id = " + bookId,
                book: book,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar el libro con id = " + req.params.id,
            error: error.message,
        });
    }
}
