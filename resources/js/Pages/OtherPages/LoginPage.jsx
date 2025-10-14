import React from 'react'
import {NavBar,Footer} from '../LandingPage'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import{
Button,ButtonGroup
} from "@heroui/button";
import Input from "@/components/ui/input"
export default function LoginPage(){
    return(
        <div className="w-full flex flex-col min-h-screen ">
                <div className='border-b-2 border-b-gray-200 pb-2 '>
                <NavBar/>
                </div>
                <div className="w-full">
                    <div className="rounded-none flex justify-center mt-[3%] mb-[3%]">
                    
                    <Card className="w-[40%] rounded-none">
                        <img src ="/StaticImages/Placeholder.png"></img>
                    </Card>
                    <Card className="w-[40%] rounded-none">
                        <div className="flex-col text-center">
                            <h1 className="text-4xl font-extrabold">Login</h1>
                            <div className="mt-[10%]">   
                                <form action="/login" method="POST" enctype="multipart/form-data">
                                <div className="flex flex-col w-[80%] mr-auto ml-auto text-left gap-5">
                                    
                                    <div className="Inter-200 ml-[10px]"><div>Email: </div>
                                    <Input type="email" placeholder="Enter your Email" id="email">
                                    </Input>
                                    </div>
                                    <div className="Inter-200 ml-[10px]"><div>Password:</div> 
                                    <Input type="password" placeholder="Enter your Password" id="Password">
                                    </Input>
                                    </div>
                                    <div></div><div></div><div></div>
                                    <div className="ml-[10px]">
                                        <Button color='primary' className="w-full rounded"> 
                                        Login
                                    </Button>

                                    </div>
                                    
                                    <div className="flex flex-row">
                                        <div className="mr-auto text-muted-foreground Inter-200 text-sm ml-[10px]">
                                            <a href="/forgot">Forgot your password?</a>
                                        </div>
                                        <div className="ml-auto text-muted-foreground Inter-200 text-sm">
                                            <a href="/register">Register Here</a>
                                        </div>

                                    </div>
                                    
                                </div>
                                </form>


                            </div>

                        </div>
                    </Card>
                 
                    </div>
                </div>
                <Footer/>
                </div>
    )


}