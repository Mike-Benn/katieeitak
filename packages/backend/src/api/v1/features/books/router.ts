import { Router } from 'express';
import { BookRepository } from '@/api/v1/features/books/repository.js';
import { BookController } from '@/api/v1/features/books/controller.js';
import { BookService } from '@/api/v1/features/books/service.js';
import { pool } from '@/db/db.js';

const bookRepository = new BookRepository(pool);
const bookService = new BookService(bookRepository);
const bookController = new BookController(bookService);
const bookRouter = Router();

bookRouter.get('/search', bookController.searchBooksByQueryString);
bookRouter.get('/:key', bookController.getBookByKey);

export { bookRouter };
