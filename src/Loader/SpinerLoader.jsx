import {SyncLoader} from "react-spinners";
import Theme from "../components/Theme/Theme";

const SpinnerLoader = () => {

    return(
        <SyncLoader size={18} color={Theme.palette.primary.main} />
    )
}


export default SpinnerLoader;