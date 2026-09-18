import PersonCard from "../PersonCard/PersonCard"

import defaultUserPicture from "../../assets/defaultUserPicture.svg"

// Founders
import CEO1 from "../../assets/CEO1.jpeg"
import CEO2 from "../../assets/CEO2.jpg"

// Leadership
import CTO from "../../assets/CTO.jpg"
import CFO from "../../assets/CFO.jpg"
import CVC from "../../assets/CVC.jpeg"

// Team
import BACKEND from "../../assets/BACKEND.jpg"
import FRONTEND from "../../assets/FRONTEND.jpeg"
import FINGER from "../../assets/FINGER.webp"

//Honourable mentions
import Lebron from "../../assets/Lebron.png"
import Wailord from "../../assets/Wailord.png"
import Accountant from "../../assets/Accountant.jpg"


import "./HierarchyTree.css"

function HierarchyTree() {

    return (

        <div className="hierarchy-tree">

            {/* Founders */}

            <div className="hierarchy-container">

                <h2>Founders</h2>

                <div className="hierarchy-level founders-level">

                    <PersonCard
                        name="Matthew Zahra"
                        role="CEO"
                        picture={CEO1}
                    />

                    <PersonCard
                        name="Nicholas Zahra"
                        role="CEO"
                        picture={CEO2}
                    />

                </div>

            </div>


            {/* Second layer */}

            <div className="hierarchy-container">

                <h2>Leadership</h2>

                <div className="hierarchy-level">

                    <PersonCard
                        name="Nicholas Zahra"
                        role="CFO"
                        picture={CFO}
                    />

                    <PersonCard
                        name="Matthew Zahra"
                        role="CTO"
                        picture={CTO}
                    />

                    <PersonCard
                        name="Nicholas Zahra"
                        role="Chief Vibe-Coder (CVC)"
                        picture={CVC}
                    />

                </div>

            </div>


            {/* Third layer */}

            <div className="hierarchy-container">

                <h2>Team</h2>

                <div className="hierarchy-level">

                    <PersonCard
                        name="Matthew Zahra"
                        role="Backend"
                        picture={BACKEND}
                    />

                    <PersonCard
                        name="Nicholas Zahra"
                        role="Frontend"
                        picture={FRONTEND}
                    />

                    <PersonCard
                        name="You"
                        role="Funding"
                        picture={FINGER}
                    />

                    <PersonCard
                        name="n/a"
                        role="Testing"
                        picture={defaultUserPicture}
                    />

                </div>

            </div>

            {/* Fourth layer */}

            <div className="hierarchy-container">

                <h2>Honorable mentions</h2>

                <div className="hierarchy-level">

                    <PersonCard
                        name="Lebron James"
                        role="GOAT"
                        picture={Lebron}
                    />

                    <PersonCard
                        name="Wailord"
                        role="Defense"
                        picture={Wailord}
                    />

                    <PersonCard
                        name="Christian Wolff"
                        role="Accounting"
                        picture={Accountant}
                    />

                    <PersonCard
                        name="n/a"
                        role="Testing"
                        picture={defaultUserPicture}
                    />
                    <PersonCard
                        name="n/a"
                        role="Testing"
                        picture={defaultUserPicture}
                    />
                    

                </div>

            </div>

        </div>

    )
}

export default HierarchyTree