export const SelectTravelsList = [
  {
    id: 1,
    title: "Just Me",
    desc: "A Solo travel in exploration",
    icon: "👤",
    people: "1",
  },
  {
    id: 2,
    title: "A Couple",
    desc: "Two Travels in tendem",
    icon: "🍻",
    people: "2",
  },
  {
    id: 3,
    title: "Family",
    desc: "A group of loving adv",
    icon: "🛖",
    people: "3 to 5 peoples",
  },
  {
    id: 1,
    title: "Friends",
    desc: "A bunch of thrills-seeks",
    icon: "🚤",
    people: "5-10 peoples",
  },
];

export const SelectBudgetOptions = [
  
  { id: 1, 
    title: "Cheap",
     desc: "Stay concious of costs", 
     icon: "💴" },
  {
    id: 2,
    title: "Moderate",
    desc: "Keep cost on the average side",
    icon: "💰",
  },
  { id: 3, 
    title: "Luxury",
     desc: "Dont worry about cost", 
     icon: "💸" },
];

export const AI_Prompt = 'Generate travel plan for Location: {location}, for {totalDays} Days for {members} with a  budget {budget},  Give me a Hotels options list with Hotel Name, Hotel address, Price, hotel image url, geo coordinate, ratings, descriptions and suggest itineary with placename, place details, place image url, Geo Coordinates, ticket pricing, rating, time travel each of location for 5 days with each day plan with best time to visit in JSON format.' ;