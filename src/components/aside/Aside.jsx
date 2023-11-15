import React from 'react';
import "./Aside.scss"
import { AiOutlineAppstore } from 'react-icons/ai';
import { Link, NavLink } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';
const Aside = ({categoryData}) => {
  const langCode=useSelector(state=>state?.lang.langCode)
  return (
    <div className='side'>
    <div className="side__header"><AiOutlineAppstore/><p>{langCode=='uz'?"Категориялар":"Категории"}</p></div>
    <ul className='categoryMain__menu'>
        {
          langCode=='ru'?  categoryData?.mainCategory_ru?.map((x,i)=>
                    <li key={uuidv4()}><NavLink className="main__link" to={`/maincategory/${x}`}>{x}<FiChevronRight/></NavLink>
                    <div className='sub__category'>
                        {
                            langCode=="uz"?
                            categoryData?.productSubCategories_uz[i]?.map(x=>
                                   x? <Link key={uuidv4()} to={`/subcategory/${x}`}>{x}</Link> : <React.Fragment key={uuidv4()}></React.Fragment>
                                )
                                :
                                categoryData?.productSubCategories_ru[i]?.map(x=>
                                    x? <Link key={uuidv4()} to={`/subcategory/${x}`}>{x}</Link> : <React.Fragment key={uuidv4()}></React.Fragment>
                                 )
                        }
                    </div>
                    </li>
                )
           :
           categoryData?.mainCategory_uz?.map((x,i)=>
                    <li key={uuidv4()}><NavLink className="main__link" to={`/maincategory/${x}`}>{x}<FiChevronRight/></NavLink>
                    <div className='sub__category'>
                        {
                            categoryData?.productSubCategories_uz[i]?.map(x=>
                                   x? <Link key={uuidv4()} to={`/subcategory/${x}`}>{x}</Link> : <React.Fragment key={uuidv4()}></React.Fragment>
                                )
                        }
                    </div>
                    </li>
                )

        }
    </ul>
</div>
  )
}

export default Aside