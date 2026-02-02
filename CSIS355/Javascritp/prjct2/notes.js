const books = [
    {
        id: 1,
        title: "good book",
        year: 3205,
        published: true,
        price: 100
    },
    {
        id: 2,
        title: "good book 2",
        year: 3206,
        published: false,
        price: 150
    },
    {
        id: 3,
        title: "good book 3",
        year: 3206,
        published: false,
        price: 150
    },
    {
        id: 4,
        title: "good book 4",
        year: 3206,
        published: false,
        price: 150
    },
    {
        id: 5,
        title: "good book the prequale",
        year: 3205,
        published: true,
        price: 150
    }
]

for(let book of books){
    console.log(book.title)
}

books.push(
    {
        id: 6
    }
)

for(let book of books){
    console.log(book.title)
}

let booktitlearray = books.map(
    (book) => {
        return book.title
    }
)

console.log(booktitlearray)

const pubbooks = books.filter(
    (book) => {
        return book.published === true
    }
)

console.log(pubbooks)

const pubbookstitles = books.filter((book)=>book.published).map((book) => book.title)

console.log(pubbookstitles)