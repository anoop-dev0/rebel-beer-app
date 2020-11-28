import React,{useState} from 'react'
import Pagination from 'react-bootstrap/Pagination';

export default (props) => {

    const [pageNumbers,setPageNumbers]=useState(0);

    const updatePageNumber = (num) =>{
        if(num<0 && pageNumbers > 0){
            setPageNumbers(pageNumbers+num)
        }
        else if(num > 0 && pageNumbers < props.beerCount){
            setPageNumbers(pageNumbers+num);
        }
    }
    return (
        <Pagination>
            <Pagination.First onClick={()=>{updatePageNumber(-20)}}/>
            {Array.from(Array(props.count).keys()).map(number => {
                let beersShown = (pageNumbers * props.count)+(number*props.count);
                if(beersShown < props.beerCount)
                {
                    return (
                        <Pagination.Item key={number+1} active={number+1 === props.active} onClick={props.changePage}>
                            {number+1+pageNumbers}
                        </Pagination.Item>
                        )
                }
            })}
            <Pagination.Last onClick={()=>{updatePageNumber(+20)}}/>
        </Pagination>
    )
}
