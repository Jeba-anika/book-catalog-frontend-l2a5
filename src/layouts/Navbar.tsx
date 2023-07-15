import React from 'react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { removeUser, setUser } from '@/redux/features/user/userSlice';


export default function Navbar() {
  const { email } = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()
  const handleLogout = () => {
    console.log('logout')
    dispatch(removeUser())
  }
  return (
    <div className="w-full h-16  backdrop-blur-lg">
      {/* <div className="w-full h-16 fixed top backdrop-blur-lg z-10 "> */}
      <div className="h-full w-full bg-white/60">
        <div className="flex items-center justify-between w-full md:max-w-7xl h-full mx-auto ">
          <div>
            {/* <img className="h-8" src={logo} alt="log" /> */}
          </div>
          <div>
            <ul className="flex items-center ">
              <li>
                <Button variant="link" asChild>
                  <Link className='font-bold text-xl' to="/">Home</Link>
                </Button>
              </li>

              <li>
                <Button variant="link" asChild>
                  <Link to="/allBooks">All Books</Link>
                </Button>
              </li>
              {
                !email && <>
                  <li>
                    <Button variant="link" asChild>
                      <Link to="/signup">SignUp</Link>
                    </Button>
                  </li>
                  <li>
                    <Button variant="link" asChild>
                      <Link to="/signin">SignIn</Link>
                    </Button>
                  </li>
                </>
              }
              {email && <><li>
                <Button onClick={() => handleLogout()}>
                  LogOut
                </Button>
              </li></>}
              {/* <li>
                <Button variant="ghost">
                  <HiOutlineSearch size="25" />
                </Button>
              </li>
              <li>
                <Cart />
              </li> */}
              <li className="ml-5">
                <DropdownMenu>
                  <DropdownMenuTrigger className="outline-none">
                    {/* <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar> */}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer">
                      Profile
                    </DropdownMenuItem>
                    {/* {!user.email && (
                      <>
                        <Link to="/login">
                          <DropdownMenuItem className="cursor-pointer">
                            Login
                          </DropdownMenuItem>
                        </Link>
                        <Link to="/signup">
                          <DropdownMenuItem className="cursor-pointer">
                            Sign up
                          </DropdownMenuItem>
                        </Link>
                      </>
                    )}
                     */}
                    {email && (
                      <DropdownMenuItem
                        onClick={handleLogout}
                        className="cursor-pointer"
                      >
                        Logout
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
