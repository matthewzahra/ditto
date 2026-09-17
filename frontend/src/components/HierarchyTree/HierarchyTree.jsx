import PersonCard from "../PersonCard/PersonCard"

import defaultUserPicture from "../../assets/defaultUserPicture.svg"
import CEO1 from "../../assets/CEO1.jpeg"
import CTO from "../../assets/CTO.jpg"
import BACKEND from "../../assets/BACKEND.jpg"
import FINGER from "../../assets/FINGER.webp"


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
                        picture={defaultUserPicture}
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
                        picture={defaultUserPicture}
                    />

                    <PersonCard
                        name="Matthew Zahra"
                        role="CTO"
                        picture={CTO}
                    />

                    <PersonCard
                        name="Nicholas Zahra"
                        role="Chief Vibe-Coder (CVC)"
                        picture={defaultUserPicture}
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
                        picture={defaultUserPicture}
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

        </div>

    )
}

export default HierarchyTree