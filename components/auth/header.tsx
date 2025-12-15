import { Poppins } from "next/font/google";
import clsx from "clsx";

const font = Poppins({
         subsets:["latin"],
         weight:["600"]
       })


interface HeaderProps{
    label:string
}


export const Header = ( {label} : HeaderProps) =>{
  return(
        <div className="w-full flex flex-col items-center justify-center gap-y-4">
            <h1 className={clsx(
                  "text-3xl font-semibold",
                   font.className
            )}>Openfetch</h1>
            <p className="text-sm text-gray-500 ">
                {label}
            </p>
        </div>
  )
}