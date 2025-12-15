import Link from "next/link"

interface BackButtonProps {
label:string
href:string 
hrefLabel:string
}

export const BackButton = ({label , href , hrefLabel} : BackButtonProps) =>{
  return(
    <div className=" flex items-center mt-4">
        <p className="">{label}</p>
        <Link
        className="text-sm font-medium"
        href={href}
        >
            {hrefLabel}
        </Link>
    </div>
  )
}