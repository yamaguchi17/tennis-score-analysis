import { RuleSettings } from "../components/RuleSettings"
import { PointContents } from "./PointContents";
import { PointDisplay } from "./PointDisplay";

export const Record = () => {

    return (
        <>
            {/* <DisplayResultDialog selectedValue={selectedValue} open={open} onClose={dialogClose} finishesFinalSet={finishesFinalSet} /> */}
            {/* <RuleSettings /> */}
            <PointContents />
            <PointDisplay />
            {/* {console.log("レンダリングRecord JSX")} */}
        </>
    );
}