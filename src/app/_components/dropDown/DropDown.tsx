import userImage from '../../../assets/images/user.webp'
import { Button } from "@/components/ui/button"
import  Link  from 'next/link';
import {

  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from 'next/image';


export function DropdownMenuBasic({logout}:{logout:()=>void}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Image alt='user' width={30} height={30} src={userImage}/>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href={'/profile'}>profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span className="cursor-pointer" onClick={logout}>log out</span>

          </DropdownMenuItem>

        </DropdownMenuGroup>
        
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
