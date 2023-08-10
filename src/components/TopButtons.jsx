import React from 'react'

function TopButtons({ setQuery }) {
    const cities = [{
        id:1,
        title:"London"
    },{
        id:2,
        title:"Paris"
    },{
        id:3,
        title:"Washington"
    },{
        id:4,
        title:"Sydney"
    },{
        id:5,
        title:"Delhi"
    }]
    return <div className="flex items-center justify-around my-6">
        {cities.map((city) => (
            <button key={city.id} className="text-white text-lg font-medium transition ease-out hover:scale-125 hover:text-black" onClick={()=> setQuery({q: city.title} ) }>
                {city.title}
            </button>
        ))}
    </div>;
}

export default TopButtons