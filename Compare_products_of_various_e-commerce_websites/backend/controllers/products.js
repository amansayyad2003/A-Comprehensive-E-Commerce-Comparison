const Product = require("../models/Product")

/*
product_details = {"title": title, "price": price, "image_url_url": img_url, 'website_url': website_url}
*/

const getAllProducts = async(req,res)=>{

    console.log("Inside get all products")

    const {price,title,sort,select,image_url,website_url} = req.query;

    const queryObject = {};

    if (title){


        queryObject.title = {$regex:title,$options:"i"}
    }

    if (price){

        queryObject.price = price
    }

    if (image_url){

        queryObject.image_url = image_url
    }

    if (website_url){

        queryObject.website_url = website_url
    }

  

    

     let page = Number(req.query.page) || 1
    console.log("Printing page")
    console.log(page)
    let pageSize = Number(req.query.pageSize) || 21

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


