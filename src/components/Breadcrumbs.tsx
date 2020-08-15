import React from "react";
import {Link} from "react-router-dom";
import "./Breadcrumbs.css"
interface OwnProps {
    author: string;
}

const Breadcrumbs: React.FC<OwnProps> = ({author}) => {
    return <div className={"breadcrumbs"}>
        <Link to={"/song"}>All songs</Link>
        {author && <span> / <Link to={author}>{author}</Link></span>}
    </div>
}

export default Breadcrumbs;

