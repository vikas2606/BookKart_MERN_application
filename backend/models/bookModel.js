const mongoose=require("mongoose")

const bookSchema=mongoose.Schema(
{
    bookID:{
        type:Number,
        required:true,
        unique:true
        
    },
    title:{
        type:String,
        required:true
    },
    authors:{
        type:String,
        required:true
    },
    average_rating:{
        type:Number,
        required:true,
        default:0.00
    },
    isbn:{
        type:Number,
        required:true,
        default:"0"
    },
    isbn13:{
        type:Number,
        required:true,
        default:0
    },
    language_code:{
        type:String,
        required:true,
        default:"eng"
    },
    num_pages:{
        type:Number,
        required:true,
        default:0
    },
    ratings_count:{
        type:Number,
        required:true,
        default:0
    },
    text_reviews_count:{
        type:Number,
        required:true,
        default:0
    },
    publication_date:{
        type:Date,
        required:true
    },
    publisher:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
        default:0
    }
}
) 

const Book=mongoose.model("books",bookSchema)

async function findHighestBookID() {
    try {
        const highestBook = await Book.findOne({}, {}, { sort: { 'bookID': -1 } });
        return highestBook ? highestBook.bookID : 0;
    } catch (error) {
        console.error("Error finding highest bookID:", error);
        return 0;
    }
}

module.exports={Book,findHighestBookID}