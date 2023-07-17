import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { removeUser } from '@/redux/features/user/userSlice';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';


export default function Navbar() {
  const { email } = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()
  const handleLogout = () => {
    dispatch(removeUser())
  }
  return (
    <div className="w-full px-8 h-16  backdrop-blur-lg">
      <div className="h-full w-full bg-white/60">
        <div className="flex items-center justify-between w-full md:max-w-7xl h-full mx-auto ">
          <div className='sm:text-xl text-base font-bold'>
            <Link to='/'>Book Worm</Link>
          </div>
          <div className='block md:hidden'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Menu</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">

                <DropdownMenuItem>
                  <Button variant="link" asChild>
                    <Link className='font-bold sm:text-xl text-base' to="/">Home</Link>
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Button variant="link" asChild>
                    <Link className='font-bold sm:text-xl text-base' to="/allBooks">All Books</Link>
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Button variant="link" asChild>
                    <Link className='font-bold sm:text-xl text-base' to="/">Home</Link>
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Button variant="link" asChild>
                    <Link className='font-bold sm:text-xl text-base' to="/">Home</Link>
                  </Button>
                </DropdownMenuItem>



                {
                  !email && <>
                    <DropdownMenuItem>
                      <Button variant="link" asChild>
                        <Link className='font-bold sm:text-xl text-base' to="/signup">SignUp</Link>
                      </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Button variant="link" asChild>
                        <Link className='font-bold sm:text-xl text-base' to="/signin">SignIn</Link>
                      </Button>
                    </DropdownMenuItem>

                  </>
                }
                {email && <>
                  <DropdownMenuItem>
                    <Button variant="link" asChild>
                      <Link className='font-bold sm:text-xl text-base' to="/wishlist">Wishlist</Link>
                    </Button>
                  </DropdownMenuItem>
                </>}
                {email && <>
                  <DropdownMenuItem>
                    <Button onClick={() => handleLogout()}>
                      LogOut
                    </Button>
                  </DropdownMenuItem>
                </>}

              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className='hidden sm:hidden md:block'>
            <ul className="flex items-center ">
              <li>
                <Button variant="link" asChild>
                  <Link className='font-bold sm:text-xl text-base' to="/">Home</Link>
                </Button>
              </li>

              <li>
                <Button variant="link" asChild>
                  <Link className='font-bold sm:text-xl text-base' to="/allBooks">All Books</Link>
                </Button>
              </li>
              {
                !email && <>
                  <li>
                    <Button variant="link" asChild>
                      <Link className='font-bold sm:text-xl text-base' to="/signup">SignUp</Link>
                    </Button>
                  </li>
                  <li>
                    <Button variant="link" asChild>
                      <Link className='font-bold sm:text-xl text-base' to="/signin">SignIn</Link>
                    </Button>
                  </li>
                </>
              }
              {email && <><li>
                <Button variant="link" asChild>
                  <Link className='font-bold sm:text-xl text-base' to="/wishlist">Wishlist</Link>
                </Button>
              </li></>}
              {email && <><li>
                <Button onClick={() => handleLogout()}>
                  LogOut
                </Button>
              </li></>}
            </ul>
          </div>
        </div>
      </div>
    </div >
  )
}
