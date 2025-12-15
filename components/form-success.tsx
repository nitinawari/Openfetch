import   {CheckCircledIcon} from "@radix-ui/react-icons"

interface formSuccessProps{
    message?:string
}


export const FormSuccess = ({message} : formSuccessProps ) => {
    if(!message) return null
    return(
        <div className="bg-emerald-500/15 text-emerald-500 flex items-center gap-x-2 p-3 rounded-md ">
            <CheckCircledIcon className="h-5 w-5" />
            <p>{message}</p>

        </div>
    )
    
}