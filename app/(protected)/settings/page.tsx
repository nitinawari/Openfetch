import { auth } from "@/auth"
import { Navbar } from "@/components/Navbar";
import { redirect } from "next/navigation";

const SettingsPage =async  () =>{

    const session = await auth();
    
    if(!session) (
        redirect("/login")
    )

    return(
        <div>
            <Navbar />
            {JSON.stringify(session)}
        </div>
    )
}

export default SettingsPage;