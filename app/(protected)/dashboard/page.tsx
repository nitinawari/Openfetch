import { auth , signOut } from "@/auth"
import { redirect } from "next/navigation";


 const DashbaordPage =  async () => {

    const session = await auth()

    if(!session) {
        redirect("/login")
    }
    return(
        <div>
            {JSON.stringify(session)};
            
            <button
            className="bg-blue-800 p-3 hover:cursor-pointer  border m-3 "
            onClick={async ()=>{
                "use server"
                await signOut({ redirectTo: "/login" })
            }
            }
            >
                Signout 
            </button>
        </div>
    )
}   

 export default DashbaordPage;