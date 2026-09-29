import HierarchyTree from "@/features/about/components/HierarchyTree/HierarchyTree"

import "./About.css"

function About() {
    return (
        <div className="about-page">
            <h3 className="about-text">Ditto was created as a platform to host a variety of tools that solve everyday problems. It is currently in active development by our <strong>incredibly talented</strong> team below!</h3>
            <HierarchyTree />
        </div>
    )
}

export default About