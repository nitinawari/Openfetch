import { auth , signOut } from "@/auth"
import { Button } from "@/components/ui/Button";
import { redirect } from "next/navigation";
import { CategoryList } from "@/app/(protected)/dashboard/category-list";


 const DashbaordPage =  async () => {

    const session = await auth()

    if(!session) {
        redirect("/login")
    }
    return(
        <div className="flex h-full space-x-3"> 
            <CategoryList />
            <div>
                 {JSON.stringify(session)};
            
                <Button
                className="p-3 hover:cursor-pointer  border m-3"
                onClick={async ()=>{
                    "use server"
                    await signOut({ redirectTo: "/login" })
                }
                }
                >
                Signout 
            </Button>
            </div>
           
        </div>
    )
}   

 export default DashbaordPage;