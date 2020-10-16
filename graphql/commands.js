// const AuthorType = new GraphQLObjectType({
//     name: 'Author',
//     description: 'List of all author',
//     fields: () => ({
//         id: { type: GraphQLNonNull(GraphQLInt) },
//         name: { type: GraphQLNonNull(GraphQLString) },
//         books: { 
//             type: GraphQLList(BookType),
//             description: 'List of the Book',
//             resolve: (author) => {
//                 return db.books.filter(b => b.authorId === author.id);
//             }
//         }
//     })
// })

// const BookType = new GraphQLObjectType({
//     name: 'Book',
//     description: 'This represent the book writen by',
//     fields: () => ({
//         id: { type: GraphQLNonNull(GraphQLInt) },
//         name: { type: GraphQLNonNull(GraphQLString) },
//         authorId: { type: GraphQLNonNull(GraphQLInt) },
//         author: { 
//             type: AuthorType,
//             description: 'Author name',
//             resolve: (book) => {
//                 return db.authors.find(author => author.id === book.authorId)
//             }
//         }
//     })
// })

// const RootQueryType = new GraphQLObjectType({
//     name: 'query',
//     description: 'Root Query',
//     fields: () => ({
//         book: {
//             type: BookType,
//             description: 'Single Book',
//             args: {
//                 id: { type: GraphQLInt }
//             },
//             resolve: (parent, args) => db.books.find(book => book.id === args.id) 
//         },
//         books: {
//             type: new GraphQLList(BookType),
//             description: 'List of books',
//             resolve: () => db.books
//         },
//         authors: {
//             type: new GraphQLList(AuthorType),
//             description: 'List of the Authors',
//             resolve: () => db.authors
//         }
//     })
// })