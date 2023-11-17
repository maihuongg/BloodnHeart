import React from "react";
export default function footer() {
    return (
        <footer className="footer">
        <div className="d-sm-flex justify-content-center justify-content-sm-between">
            <span className="text-muted text-center text-sm-left d-block d-sm-inline-block">
                {/* Centering the text horizontally */}
                Copyright © 2023. 
                By BloodnHeart Team
            </span>
            <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">
                <i className="ti-heart text-danger ml-1" />
            </span>
        </div>
    </footer>

    )
}