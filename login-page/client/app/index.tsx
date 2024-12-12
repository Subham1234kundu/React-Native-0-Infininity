
import { Redirect } from "expo-router";

export default function index() {
    const path: any = "/(routes)/login";
    return <Redirect href={path}/>
}

