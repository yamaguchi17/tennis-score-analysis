import { useState } from "react";
import { RuleSettings } from "../components/RuleSettings"
import { PointContents } from "../components/Record/PointContents";
import { PointDisplay } from "../components/Record/PointDisplay";

export const Record = () => {

    //現在のpointのindexを扱うstate
    const [currentPointID, setPointID] = useState(0);

    return (
        <>
            {/* <RuleSettings /> */}
            <PointContents currentPointID={currentPointID}/>
            <PointDisplay currentPointID={currentPointID} setPointID={setPointID}/>
            {/* {console.log("レンダリングRecord JSX")} */}
        </>
    );
}