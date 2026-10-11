import HomeGridItem from "@/components/HomeGridItem/HomeGridItem"

import evenlopePurple from "@/assets/envelopePurple.svg"
import dumbell from "@/assets/dumbell.svg"
import utensils from "@/assets/utensils.svg"
import quote from "@/assets/quote.svg"

import "./Home.css"

function Home() {
    return (
        <div className="home-page">
            <div className="home-page-grid">
                <HomeGridItem name="Inbox" image={evenlopePurple} to={"/inbox"} />
                <HomeGridItem name="Quote" image={quote} to={"/quote"} />
                <HomeGridItem name="Restaurants" image={utensils} to={"/restaurant-tracker"} />
                <HomeGridItem name="Workouts" image={dumbell} to={"/workout-tracker"} />
            </div>
        </div>
    )
}

export default Home