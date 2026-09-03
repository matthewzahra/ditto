import PersonCard from "../PersonCard/PersonCard"

import defaultUserPicture from "../../assets/defaultUserPicture.svg"

import "./HierarchyTree.css"

function HierarchyTree() {

    return (

        <div className="hierarchy-tree">

            {/* Founders */}

            <div className="hierarchy-container">

                <h2>Founders</h2>

                <div className="hierarchy-level founders-level">

                    <PersonCard
                        name="Founder One"
                        role="Co-Founder"
                        picture={defaultUserPicture}
                    />

                    <PersonCard
                        name="Founder Two"
                        role="Co-Founder"
                        picture={defaultUserPicture}
                    />

                </div>

            </div>


            {/* Second layer */}

            <div className="hierarchy-container">

                <h2>Leadership</h2>

                <div className="hierarchy-level">

                    <PersonCard
                        name="Project Lead"
                        role="Leadership"
                        picture={defaultUserPicture}
                    />

                    <PersonCard
                        name="Technical Lead"
                        role="Development"
                        picture={defaultUserPicture}
                    />

                    <PersonCard
                        name="Design Lead"
                        role="Creative"
                        picture={defaultUserPicture}
                    />

                </div>

            </div>


            {/* Third layer */}

            <div className="hierarchy-container">

                <h2>Team</h2>

                <div className="hierarchy-level">

                    <PersonCard
                        name="Frontend"
                        role="Development"
                        picture={defaultUserPicture}
                    />

                    <PersonCard
                        name="Backend"
                        role="Development"
                        picture={defaultUserPicture}
                    />

                    <PersonCard
                        name="Design"
                        role="Creative"
                        picture={defaultUserPicture}
                    />

                    <PersonCard
                        name="Testing"
                        role="Quality Assurance"
                        picture={defaultUserPicture}
                    />

                </div>

            </div>

        </div>

    )
}

export default HierarchyTree