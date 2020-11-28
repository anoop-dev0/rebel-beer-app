import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Beer from './beer';
import Pagination from './pagination';
import Search from './search';
import Table from 'react-bootstrap/Table';


export default () => {
    const [beers, setBeers] = useState([]);
    const [images, setImages] = useState([]);
    const [filteredBeer, setFilteredBeer] = useState([]);
    //const [filteredBeerList, setfilteredBeerList] = useState([]);
    const [imgCount, setImgCount] = useState(0);
    const itemsPerPage = 20;
    const [currentPage, setcurrentPage] = useState(1);
    useEffect(() => {
        axios
            .get("https://s3-ap-southeast-1.amazonaws.com/he-public-data/beercraft5bac38c.json")
            .then(response => {
                setBeers(response.data);
                setFilteredBeer(response.data.slice(0, itemsPerPage));
            }).catch(err => {
                console.log(err);
            })

        axios
            .get("https://s3-ap-southeast-1.amazonaws.com/he-public-data/beerimages7e0480d.json")
            .then(response => {
                setImages(response.data);
                setImgCount(response.data.length);
            }).catch(err => {
                console.log(err);
            })
    }, [])

    const updatePageNumber = (event) => {
        if (event && event.target && event.target.innerHTML) {
            try {
                let num = parseInt(event.target.innerHTML);
                setcurrentPage(num);
                setFilteredBeer(beers.slice((num - 1) * itemsPerPage, (num) * itemsPerPage));
            }
            catch{
                
            }
        }
    }
    const onFilter = (event) => {
        if (event && event.target)
        {
            let currentBeerList=beers.slice((currentPage - 1) * itemsPerPage, (currentPage) * itemsPerPage);
            let searchTerm = event.target.value;
            if(searchTerm)
            {    const filteredList = currentBeerList.filter(beerObj=>{
                    if(beerObj.name.toString().toLowerCase().includes(searchTerm.toLowerCase()))
                    {
                        return beerObj
                    }
                    // if(Object.values(beerObj).find(beerValue=>{beerValue.toString().toLowerCase().includes(searchTerm.toLowerCase())})){
                    //     return beerObj;
                    // }
                })
                setFilteredBeer(filteredList);
            }
            else{
                setFilteredBeer(currentBeerList);
            }
        }
    }
    return (
        <>
            <Search filterList={onFilter} />
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Style</th>
                        <th>Alcohol by volume</th>
                        <th>International Bitterness Units</th>
                        <th>Ounces</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredBeer.map((beerData, index) => {
                            return <Beer key={index} details={beerData} imageSrc={images[(imgCount + index) % imgCount]} />
                        })
                    }
                </tbody>
            </Table>
            <Pagination count={20} beerCount={beers.length} active={currentPage} changePage={updatePageNumber} />
        </>
    )
}
