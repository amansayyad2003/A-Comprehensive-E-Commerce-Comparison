import React, { useContext, useEffect, useState } from 'react'
import productContext from '../../context/products/Productcontext'
export default function Sort_products() {
    const context = useContext(productContext)
  const [sorting_val,setSorting_val] = useState("lowest")
    const {products,setProducts} = context
  
  const sorting = ()=>{

    console.log("Inside sorting")

    let userSortValue = document.getElementById("sort")
    let sort_value = userSortValue.options[userSortValue.selectedIndex].value;
    console.log(sort_value)

    setSorting_val(sort_value)

    // console.log("About to print sort val")

    // console.log(sorting_val)

    let temp_data = [...products];

    console.log("Printing products before if statement")

    console.log(temp_data)

    if (sort_value === "a-z"){

      console.log("Inside a-z")

      temp_data = temp_data.sort((a, b) =>
        a.title.localeCompare(b.title)
      );

      console.log("About to print temp data")

      console.log(temp_data)

      setProducts(temp_data)
    }

    else if (sort_value === "z-a"){

      console.log("Inside z-a")

      temp_data = temp_data.sort((a, b) =>
        b.title.localeCompare(a.title)
      );

      console.log("About to print temp data")

      console.log(temp_data)

      setProducts(temp_data)
    }


    else if (sort_value === "lowest"){

      console.log("Inside lowest")

      temp_data = temp_data.sort((a, b) =>
        a.price - b.price
      );

      console.log("About to print temp data")

      console.log(temp_data)

      setProducts(temp_data)
    }
    

    else if (sort_value === "highest"){

      console.log("Inside highest")

      temp_data = temp_data.sort((a, b) =>
      b.price - a.price
      );

      console.log("About to print temp data")

      console.log(temp_data)

      setProducts(temp_data)
    }



  }
  return (
    <div>
      <div className="sort-selection">

<form action="#">

  <label htmlFor="sort"></label>

  {/* <select name="sort" id="sort" className='sort-selection --style' onClick={sorting}> */}

    {/* <option value="lowest">Price(lowest)</option>
   <option value="#" disabled></option>
    <option value="highest">Price(highest)</option>
   <option value="#" disabled></option>
    <option value="a-z">Price(a-z)</option>
   <option value="#" disabled></option>
    <option value="z-a">Price(z-a)</option>
   <option value="#" disabled></option> */}
  {/* </select> */}
</form>
</div>
    </div>
  )
}
