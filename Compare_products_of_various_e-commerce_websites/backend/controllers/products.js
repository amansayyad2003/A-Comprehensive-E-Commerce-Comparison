const Product = require("../models/Product")

const getAllProducts = async(req,res)=>{

    console.log("Inside get all products")

    const {price,title,sort,select} = req.query;

    const queryObject = {};

    if (price){

        queryObject.price = price
    }

  

    if (title){


        queryObject.title = {$regex:title,$options:"i"}
    }

     let page = Number(req.query.page) || 1
    console.log("Printing page")
    console.log(page)
    let pageSize = Number(req.query.pageSize) || 5

    let skip = (page-1)*pageSize


    let apiData =  Product.find(queryObject)


    if (sort){

        let sortFix = sort.split(",").join(" ")

        apiData = apiData.sort(sortFix)
    }

    if (select){

        let selectFix = select.split(",").join(" ")

        apiData = apiData.select(selectFix)


    }

    const totalResults = await Product.countDocuments(queryObject);

    

    apiData = apiData.skip(skip).limit(pageSize)



    const mydata = await apiData


    // console.log(mydata)

    res.status(200).json({mydata,totalResults})

}



module.exports = {getAllProducts}


