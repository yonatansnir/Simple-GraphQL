const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } = require("graphql");
const db = require('./db');

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    description: 'represent the author',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        books: {
            type: GraphQLList(BookType),
            description: 'List of the Book',
            resolve: (author) => db.books.filter(b => b.authorId === author.id)
        }
    })
})

const BookType = new GraphQLObjectType({
    name: 'Book',
    description: 'represent the book',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        authorId: { type: GraphQLInt },
        author: {
            type: AuthorType,
            description: 'Author name',
            resolve: (book) => {
                return db.authors.find(author => author.id === book.authorId)
            }
        }
    })
})

const RootMutation = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Root Mutation',
    fields: () => ({
        addBook: {
            type: BookType,
            description: 'Add a Book',
            args: {
                name: { type: GraphQLString },
                authorId: { type: GraphQLInt },
            },
            resolve: (parent, args) => {
                const book = { id: db.books.length + 1, name: args.name, authorId: args.authorId };
                db.books.push(book);
                return book;
            }
        }
    })
})

const RootsQueryType = new GraphQLObjectType({
    name: 'query',
    description: 'Root Query',
    fields: () => ({
        book: {
            type: BookType,
            description: 'One Book',
            args: {
                id: { type: GraphQLInt }
            },
            resolve: (parent, args) => db.books.find(book => book.id === args.id)
        },
        books: {
            type: new GraphQLList(BookType),
            description: 'List of books',
            resolve: () => db.books
        },
        author: {
            type: new GraphQLList(AuthorType),
            description: 'List of the Authors',
            resolve: () => db.authors
        }
    })
})

module.exports = {
    RootMutation,
    RootsQueryType
};