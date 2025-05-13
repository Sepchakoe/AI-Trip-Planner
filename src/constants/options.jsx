export const SelectTravelesList=[
    {
        id:1,
        title:'Just Me',
        desc:'Traveling solo and embracing the journey alone.',
        // icon:'✈️',
        icon:'🚶‍♂️',
        people:'1'
    },
    {
        id:2,
        title:'A Couple',
        desc:'Exploring the world together as a duo.',
        // icon:'🥂',
        icon:'👫',
        people:'2 People'
    },
    {
        id:3,
        title:'Family',
        desc:'Sharing fun and adventure with your family.',
        // icon:'🏡',
        icon:'👪',
        people:'3 to 5 People'
    },
    {
        id:4,
        title:'Friends',
        desc:'Adventuring with a group of fun-loving friends.',
        // icon:'⛵',
        icon:'🤩',
        people:'5 to 10 People'
    },
]


export const SelectBudgetOptions=[
    {
        id:1,
        title:'Cheap',
        desc:'Travel on a tight budget while maximizing value.',
        icon:'🪙',
    },
    {
        id:2,
        title:'Moderate',
        desc:'Maintain a balanced budget with smart spending.',
        icon:'💵',
    },
    {
        id:3,
        title:'Luxury',
        desc:'Enjoy a premium travel experience without limits.',
        icon:'💰',
    },
]


export const AI_PROMPT='Generate Travel Plan for Location : {location}, for {totalDays} Days for {traveler} with a {budget} budget, give me Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and  suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates,Place address, ticket Pricing, Time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format.'